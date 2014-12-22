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
					sourceMapURL: '/css/ffs.css.map',
					sourceMapRootpath: '/'
				}
			}
		},
		concat : {
			options: {
				separator: grunt.util.linefeed + ';' + grunt.util.linefeed
			},
			js: {
				src: [
					'bower_components/jquery/dist/jquery.js',
					'bower_components/angularjs/angular.js',
					'bower_components/angular-animate/angular-animate.js',
					'bower_components/angular-route/angular-route.js',
					'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
					'bower_components/velocity/velocity.js',
					'bower_components/velicty/velocity.ui.js',
					'public/scripts/ffs-web-app.js',
					'public/scripts/controllers/*.js',
					'public/scripts/directives/*.js',
					'public/scripts/services/*.js'
				],
				dest: 'public/scripts/ffs.js',
     			nonull: false
			}
		},
		comments: {
			js : {
				options: {
					singleline: true,
					multiline: false
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
		// copy: {
		// 	api: {
		// 		src : '/config/api/v1.js',
		// 		dest : '/public/scripts/config/api/v1.js'
		// 	}
		// },
		watch: {
			styles: {
				files: [
					'public/less/*.less',
					'public/less/ffs/*.less'],
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
	grunt.registerTask('build', ['sprite', 'less', 'concat','comments','uglify']);
};