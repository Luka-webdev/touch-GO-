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
                    'js/tracks.min.js': ['js/tracks/track1.js', 'js/tracks/track2.js', 'js/tracks/track3.js', 'js/tracks/track4.js', 'js/tracks/track5.js', 'js/tracks/track6.js', 'js/tracks/track7.js', 'js/tracks/track8.js', 'js/tracks/track9.js', 'js/tracks/track10.js', 'js/tracks/track11.js', 'js/tracks/track12.js', 'js/tracks/track13.js', 'js/tracks/track14.js', 'js/tracks/track15.js', ],
                    'js/main.min.js': ['js/main.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};