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
                        //'<%= bootstrap %>/js/alert.js',
                        '<%= bootstrap %>/js/button.js',
                        //'<%= bootstrap %>/js/carousel.js',
                        '<%= bootstrap %>/js/collapse.js',
                        '<%= bootstrap %>/js/dropdown.js',
                        //'<%= bootstrap %>/js/modal.js',
                        '<%= bootstrap %>/js/tooltip.js',
                        //'<%= bootstrap %>/js/popover.js',
                        //'<%= bootstrap %>/js/scrollspy.js',
                        '<%= bootstrap %>/js/tab.js'
                                //'<%= bootstrap %>/js/affix.js',
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
                    sourceMap: true,
                    cleancss: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: '<%= vendor %>/font-awesome', src: ['./fonts/*.*'], dest: '<%= site.assets %>/fonts/fontawesome'},
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
        }
    });

    // Load tasks
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'copy',
        'less',
        'uglify',
        'assemble'
    ]);
    grunt.registerTask('dev', [
        'watch'
    ]);

};
