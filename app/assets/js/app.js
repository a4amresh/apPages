(function ($) {

	$.fn.apPagination = function (options) {

		var opts = $.extend({}, $.fn.apPagination.defaults, options);

		/*Check mixiTup Define or Not
		-----------------------------------------------------------------*/
		var $_show;
		var $_targets;
		if (opts.mixiTupState === false) {
			$_show = $(opts.target);
			$_targets = $(opts.target);
		} else {
			$_show = opts.mixiTupState.$show;
			$_targets = opts.mixiTupState.$targets;
		}

		/*Private Variable
		-----------------------------------------------------------------*/
		var target = opts.targetWrap + " " + opts.target
			, btnActive = "." + opts.btnClass + "." + opts.activeClass;


		/*================
			No. of Page
		================*/
		var page = Math.ceil($_show.length / opts.perPage);


		/*==================
		Remove Page Attribute
		==================*/
		for (var j = 0; j < $_targets.length; j++) {
			$($_targets[j]).attr("data-page", "");
		}


		/*==============
		Pagination create
		==============*/
		$(opts.paginationWrap).html('');
		if (page !== 1) {
			for (var i = 1; i <= page; i++) {
				switch (i) {
				case 1:
					$(opts.paginationWrap).append('<li class="prev"><i class="glyphicon glyphicon-arrow-left"></i><span>Prev</span></li>');
					$(opts.paginationWrap).append('<li class="page-btn active" data-page="page_' + i + '"><span>' + i + ',</span></li>');
					break;

				case 2:
					$(opts.paginationWrap).append('<li class="page-btn" data-page="page_' + i + '"><span>' + i + ',</span></li>');
					break;
				case 3:
					$(opts.paginationWrap).append('<li class="page-btn" data-page="page_' + i + '"><span>' + i + ',</span></li>');
					break;
						
				case page:
					$(opts.paginationWrap).append('<li class="page-btn last" data-page="page_' + i + '"><span>' + i + '</span></li>');
					$(opts.paginationWrap).append('<li class="next"><i class="glyphicon glyphicon-arrow-right"></i><span>Next<span></li>');
					break;
						
				default:
					$(opts.paginationWrap).append('<li class="page-btn hidden" data-page="page_' + i + '"><span>' + i + ',</span></li>');
					break;

				}
			}
		}

		/*===============
			Per Page element
		===============*/

		var pageElem = []
			, count = 0;
		for (var i = 0; i < page; i++) {
			count = count + 1;
			pageElem.push($_show.splice(0, opts.perPage));
			$(pageElem[i]).attr('data-page', "page_" + count);
			$($_show).not(pageElem[0]).fadeOut();
			$("." + opts.prevClass).addClass(opts.hiddenClass);
		}
		


		/*====================
			On Button Click
		====================*/

		$('.' + opts.btnClass).on('click', function () {
			var data = $(this).attr('data-page');
			
			//$(target).hide(1000);
			$(target).not(target + "[data-page=" + data + "]").fadeOut(1000);
			$(target + "[data-page=" + data + "]").fadeIn(1000);
			
			/*$(target).addClass("animated zoomOutUp").hide(2000);
			$(target + "[data-page=" + data + "]").show(2000).removeClass("animated zoomOutUp");*/
			
			$(opts.paginationWrap + " li").removeClass(opts.activeClass);
			$(this).addClass(opts.activeClass);

			/*==============
				Next and Prev Var
			==============*/

			var prevLength = $(btnActive).next().prev().length
				, prevAll = $(btnActive).prevAll().length
				, nextLength = $(btnActive).next().length
				, nextAll = $(btnActive).nextAll().length;

			/*================
				Next Btn
			================*/
			if (nextLength == 1) {
				$('.' + opts.nextClass).addClass(opts.hiddenClass);
			}
			if (nextAll > 2) {
				$('.' + opts.nextClass).removeClass(opts.hiddenClass);
			}

			/*===============
				Prev Btn
			===============*/
			if (prevLength == 1) {
				$('.' + opts.prevClass).addClass(opts.hiddenClass);
			}
			if (prevAll >= 2) {
				$('.' + opts.prevClass).removeClass(opts.hiddenClass);
			}
		});

		/*====================
			On Next Click
		====================*/

		$("." + opts.nextClass).on('click', function () {
			var data = $(btnActive).attr('data-page')
				, nextData = $(btnActive).next().attr('data-page')
				, next = $(btnActive).next()
				, nextAll = $(btnActive).nextAll().length
				, prevAll = $(btnActive).prevAll().length;
			
			
			
			//$(target).hide(1000);
			//$(target + "[data-page=" + nextData + "]").show(1000);
			
			$(target).not(target + "[data-page=" + nextData + "]").fadeOut(1000);
			$(target + "[data-page=" + nextData + "]").fadeIn(1000);
			
			/*$(target).addClass("animated zoomOutUp").hide(2000);
			$(target + "[data-page=" + nextData + "]").show(2000).removeClass("animated zoomOutUp");*/
			
			$("." + opts.btnClass).removeClass(opts.activeClass);
			$(next).addClass(opts.activeClass);
			if (nextAll == 2) {
				$(this).addClass(opts.hiddenClass);
			}

			if (prevAll >= 1) {
				$("." + opts.prevClass).removeClass(opts.hiddenClass);
			}
			//console.log($(".active").prev());
			if($(next).attr("class") == "page-btn hidden active") {
				$(next).removeClass("hidden");
				
			}

		});

		/*====================
			On Prev Click
		====================*/

		$("." + opts.prevClass).on('click', function () {
			var data = $(btnActive).attr('data-page')
				, prevData = $(btnActive).prev().attr('data-page')
				, prev = $(btnActive).prev()
				, prevAll = $(btnActive).prevAll().length
				, nextAll = $(btnActive).nextAll().length;

			//$(target).hide(1000);
			//$(target + "[data-page=" + prevData + "]").show(1000);
			
			$(target).not(target + "[data-page=" + prevData + "]").fadeOut(1000);
			$(target + "[data-page=" + prevData + "]").fadeIn(1000);
			
			/*$(target).addClass("animated zoomOutUp").hide(2000);
			$(target + "[data-page=" + prevData + "]").show(2000).removeClass("animated zoomOutUp");*/
			
			$("." + opts.btnClass).removeClass(opts.activeClass);
			$(prev).addClass(opts.activeClass);
			if (prevAll == 2) {
				$(this).addClass(opts.hiddenClass);
			}
			if (nextAll >= 1) {
				$("." + opts.nextClass).removeClass(opts.hiddenClass);
			}

		});


	};

	/*=================
		Defaults
	=================*/

	$.fn.apPagination.defaults = {
		target: '.blog-item'
		, targetWrap: '#blogGrid'
		, paginationWrap: '.ap-pagination'
		, perPage: '5'
		, btnClass: 'page-btn' // Class name without . (dot)
		, btnWrap: 'li'
		, dotWrap: 'span'
		, prevClass: 'prev' // Class name without . (dot)
		, nextClass: 'next' // Class name without . (dot)
		, activeClass: 'active'
		, hiddenClass: 'hidden'
		, mixiTupState: false
	};

}(jQuery));