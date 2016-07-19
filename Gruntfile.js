module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        files: grunt.file.readJSON("files.json"),
        watch: {
            main: {
                options: {
                    livereload: true
                },
                files: "app/assets/sass/**/*.scss",
                tasks: ['sass']
            }
        },
        sass: {
            main: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "app/assets/css/app.css": "app/assets/sass/app.scss"
                }
            }
        },
        concat: {
            css: {
                src: ['<%= files.css %>'],
                dest: "app/assets/css/app.css"
            },
            js: {
                src: ['<%= files.js %>'],
                dest: "app/assets/js/app.js"
            }
        },
        cssmin: {
            main: {
                files: {
                    "app/assets/css/app.min.css": ['<%= files.css %>']
                }
            }
        },
        uglify: {
            main: {
                files: {
                    "app/assets/js/app.min.js": ['<%= files.js %>']
                }
            }
        },
        clean: {
            dev: ['build/development'],
            pro: ['build/production']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**', '!**/sass/**'],
                    dest: 'build/development'
                }]
            },
            pro: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**', '!**/sass/**', '!**/libs/**'],
                    dest: 'build/production'
                }]
            }
        },
        useminPrepare: {
            html: 'app/*.html',
            options: {
                dest: 'build/production'
            }
        },
        usemin: {
            html: ['build/production/*.html']
        },
        express: {
            server: {
                options: {
                    port: 9000,
                    bases: ['app'],
                    livereload: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:9000'
            }
        }
    });

    /*====================
    	Load Npm Tasks
    ====================*/
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');


    /*====================
    	Register Tasks
    ====================*/
    /*--Default Task ==> Command:: grunt
    --------------------------*/
    grunt.registerTask('default', ['watch']);

    /*--Project test ==> Command:: grunt test
    --------------------------*/
    grunt.registerTask('test', ['express', 'open', 'watch']);

    /*--Project Build for development ==> Command:: grunt dev
    --------------------------*/
    grunt.registerTask('dev', ['clean:dev', 'copy:dev']);


    /*--Project Build for Production ==> Command:: grunt build
    --------------------------*/
    grunt.registerTask('build', [
        'concat',
        'cssmin',
        'uglify',
        'clean:pro',
        'copy:pro',
        'usemin'
    ]);

};