$(document).ready(function() {
    $("#blog").apPagination({
        selctor: {
            target: 'aside',
            targetWrap: '',
            paginationWrap: '.ap-pagination'
        },
        animation: {
            enabled: true,
            animationIn: 'zoomIn'
        },
        button: {
            btnWrap: 'li',
            btnClass: 'page-btn',
            prevClass: 'prev', // Class name without . (dot)
            nextClass: 'next', // Class name without . (dot)
            activeClass: 'active', // Class name without . (dot)
            nextText: 'Next > ',
            prevText: ' < Prev'
        },
        perPage: '3',
        mixiTupState: false
    });
});