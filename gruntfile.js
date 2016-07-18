module.exports = function(grunt) {
	//load all grunt tasks
	//require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	//grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.initConfig ({
		/* Using SASS WATCHER to compile SASS upon save
			sass: {
					dev: {
							options: {
									style: "compressed",
									sourcemap : true,
							},
							files : {
									"dist/assets/css/main.css": "src/assets/css/main.sass"
							}
					}
			},
		*/
		cssmin: {
			target: {
				files: {
					"dist/assets/css/main.css" : ["src/assets/css/main.css"],
					},
					options: {
						keepSpecialComments: 0
						}
			}
		},
		uglify: {
			dist: {
				files: {
					"dist/assets/js/script.js" : ["src/assets/js/script.js"]
				},
				options: {
					mangle: false
				}
			}
		},
		/*
		htmlmin: {
				dist: {
					options: {
						removeComments: true,
				collapseWhitespace: true
					},
					files: {
						'dist/index.html': ["src/index.html"]
					},
				},
			},
			*/
			qunit: {
				all: ['src/test/qunit-runner.html']
			}
		}
	);
	grunt.registerTask("build", ["uglify", "cssmin"]);
	grunt.registerTask("test", ["qunit"]);
};
