module.exports = function (grunt) {
  'use strict';
  
  var _js = {
    app: ['app/*.js'],
    vendor: ['vendor/js/*'],
    test: ['test/*-spec.js'],
    process: ['gruntfile.js']
  };

  var _less = ['style/*'];

  var _html = ['index.html', 'app/*.html'];

  _js.all = _js.app.concat(_js.app, _js.test, _js.process);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      strict: {
        src: ['dist/css/*.css']
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: _js.all
    },

    less: {
      dev: {
        options: {
        },
        files: {
          'dist/css/cockpit.css': 'style/cockpit.less'
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        logLevel: 'INFO',
        plugins: [
          'karma-jasmine',
          'karma-coverage',
          'karma-mocha-reporter',
          'karma-phantomjs-launcher'
        ]
      }
    },

    shell: {
      bowerInstall: {
        command: 'bower install --allow-root'
      },
      makeStructure: {
        command: [
          'mkdir -p vendor/js',
          'mkdir -p vendor/css',
          'mkdir -p vendor/less',
          'mkdir -p dist/js',
          'mkdir -p dist/img',
          'mkdir -p dist/fonts'
        ].join('&&')
      },
      buildAngular: {
        command: 'npm install && grunt package',
        options: {
          execOptions: {
            cwd: 'bower_components/angular-latest/'
          }
        }
      },
      copyAngular: {
        command: [
          'cp angular-latest/build/angular.js ../vendor/js',
          'cp angular-latest/build/angular-route.js ../vendor/js',
          'cp angular-latest/build/angular-animate.js ../vendor/js',
          'cp angular-latest/build/angular-mocks.js ../vendor/js'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components'
          }
        }
      },
      copyJquery: {
        command: [
          'cp dist/jquery.js ../../vendor/js/jquery.js',
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components/jquery/'
          }
        }
      },
      copyValidator: {
        command: [
          'cp validator.js ../../vendor/js/validator.js',
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components/validator-js/'
          }
        }
      },
      copyBootstrap: {
        command: [
          'cp -R less/* ../../vendor/less',
          'cp dist/fonts/* ../../dist/fonts',
          'cp dist/js/bootstrap.js ../../vendor/js'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components/bootstrap'
          }
        }
      },
      copyFonts: {
        command: 'cp webfonts/*[!][.css] ../../dist/fonts',
        options: {
          execOptions: {
            cwd: 'bower_components/league-gothic'
          }
        }
      },
      clean: {
        command: 'rm -rf vendor && rm -rf dist'
      },
      start: {
        command: 'npm start'
      },
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['img/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },

    coveralls: {
      options: {
        force: true
      },
      app: {
        src: 'coverage.lcov'
      }
    },

    watch: {
      all: {
        files: _js.all.concat(_html, _less),
        tasks: ['less', 'csslint', 'jshint', 'karma']
      },
    },
  
    bump: {
      options : {
        files: ["package.json", "bower.json"],
        updateConfigs: [],
        commit: false,
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: false
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'shell:clean',
    'shell:bowerInstall',
    'shell:makeStructure',
    'shell:buildAngular',
    'shell:copyAngular',
    'shell:copyJquery',
    'shell:copyBootstrap',
    'shell:copyValidator',
    'shell:copyFonts',
    'imagemin',
    'less',
    'csslint',
    'jshint',
    'karma'
  ]);

  grunt.registerTask('travis-ci', [
    'build',
    'coveralls'
  ]);
};
