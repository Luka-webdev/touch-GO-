module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            dist: {
                src: 'css/style.css',
                dest: 'css/styleprefixer.css'
            },
        },
        cssmin: {
            target: {
                files: {
                    'css/styleprefixer.min.css': ['css/styleprefixer.css']
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'js/tracks.min.js': [],
                    'js/main.min.js': ['js/main.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};