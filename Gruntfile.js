module.exports = function(grunt) {
	"use strict";
	require('load-grunt-tasks')(grunt);
	require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		less: {
			main: {
				files: {
					'public/css/ffs.css': [
						'public/less/ffs.less'
					]
				},
				options: {
					compress: true,
					sourceMap: true,
					sourceMapFilename: 'public/css/ffs.css.map',
					sourceMapURL: '/public/css/ffs.css.map',
					sourceMapRootpath: '/'
				}
			}
		},
		concat : {
			options: {
				separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
				stripBanners: {
					block : true
				}
			},
			js: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					// 'bower_components/angularjs/angular.js',
					// 'bower_components/velocity/velocity.js',
					// 'bower_components/velicty/velocity.ui.js',
					// 'public/scripts/controllers/*.js',
					// 'public/scripts/directives/*.js',
					// 'public/scripts/services/*.js',
					// 'public/scripts/ffs-web-app.js'
				],
				dest: 'public/scripts/ffs.js',
     			nonull: false
			}
		},
		comments: {
			js : {
				options: {
					singleline: true,
					multiline: true
				},
				src: ['public/scripts/ffs.js']
			}
		},
		uglify : {
			dist : {
				src : 'public/scripts/ffs.js',
				dest : 'public/scripts/ffs.min.js'
			}
		},
		sprite: {
			all : {
				src: ['public/images/sprite-src/*.png'],
				dest: 'public/images/spritesheet.png',
				destCss: 'public/less/spritesheet.less',
				algorithm: 'binary-tree',
				padding: 2
			}
		},
		watch: {
			styles: {
				files: ['public/less/**/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			spritesheet: {
				files: ['public/images/sprite-src/*.*'],
				task: ['sprite','less'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/scripts/**/*.js'],
				tasks: ['concat','comments','uglify'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('dev', ['sprite', 'less', 'concat','comments','watch']);
	grunt.registerTask('build', ['sprite', 'less', 'concat','comments','uglify','watch']);
};