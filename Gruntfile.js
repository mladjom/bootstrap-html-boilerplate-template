module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        // Project metadata
        pkg: grunt.file.readJSON('package.json'),
        site: grunt.file.readYAML('_config.yml'),
        vendor: grunt.file.readJSON('.bowerrc').directory,
        // Convenience
        bootstrap: '<%= vendor %>/bootstrap',
        assemble: {
            options: {
                flatten: true,
                assets: '<%= site.assets %>',
                data: '<%= site.data %>/*.{json,yml}',
                // Metadata
                site: '<%= site %>',
                // Templates
                partials: '<%= site.includes %>',
                layoutdir: '<%= site.layouts %>',
                layout: '<%= site.layout %>',
            },
            site: {
                src: ['src/*.hbs'],
                dest: '<%= site.dest %>/'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            plugins: {
                files: {
                    '<%= site.assets %>/js/plugins.min.js': [
                        '<%= bootstrap %>/js/transition.js',
                        '<%= bootstrap %>/js/alert.js',
                        '<%= bootstrap %>/js/button.js',
                        '<%= bootstrap %>/js/carousel.js',
                        '<%= bootstrap %>/js/collapse.js',
                        '<%= bootstrap %>/js/dropdown.js',
                        '<%= bootstrap %>/js/modal.js',
                        '<%= bootstrap %>/js/tooltip.js',
                        '<%= bootstrap %>/js/popover.js',
                        '<%= bootstrap %>/js/scrollspy.js',
                        '<%= bootstrap %>/js/tab.js',
                        '<%= bootstrap %>/js/affix.js'
                    ]
                }
            }
        },
        less: {
            main: {
                files: {
                    '<%= site.assets %>/css/site.min.css': [
                        '<%= site.theme %>/site.less'
                    ]
                },
                options: {
                    compress: true,
                    sourceMap: false,
                    cleancss: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            main: {
                options: {
                    map: false
                },
                src: '<%= site.assets %>/css/site.min.css'
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: '<%= vendor %>/font-awesome', src: ['./fonts/*.*'], dest: '<%= site.assets %>'},
                    {expand: true, cwd: '<%= vendor %>/font-awesome/css', src: ['font-awesome.min.css'], dest: '<%= site.assets %>/css'},
                    {expand: true, cwd: '<%= vendor %>/jquery/dist', src: ['jquery.min.js'], dest: '<%= site.assets %>/js'}

                ]
            }
        },
        watch: {
            less: {
                files: [
                    '<%= site.theme %>/*.less'
                ],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= site.assets %>/css/site.min.css',
                    '<%= site.assets %>/js/*.js'
                ]
            }
        },
        clean: {
            dist: [
                '<%= site.assets %>/css/site.min.css',
                '<%= site.assets %>/js/plugins.min.js'
            ]
        },
        imagemin: {// Task
            dynamic: {
                files: [{
                        expand: true, // Enable dynamic expansion
                        cwd: 'src/theme/img/', // Src matches are relative to this path
                        src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                        dest: 'dist/assets/img/' // Destination path prefix
                    }]
            }
        }
    });
    // Load tasks
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'copy',
        'less',
        'uglify',
        'assemble',
        'autoprefixer',
        'imagemin'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};
