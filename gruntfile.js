module.exports = function (grunt) {
  'use strict';
  
  var _js = {
    app: ['app/*.js'],
    vendor: ['vendor/js/*'],
    test: ['test/*.spec.js'],
    process: ['gruntfile.js']
  };

  var _less = ['style/*'];

  var _html = ['app/**/*.html'];

  _js.all = _js.app.concat(_js.app, _js.test, _js.process);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
        logLevel: 'INFO'
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
          'cp angular-animate/angular-animate.js ../vendor/js'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components'
          }
        }
      },
      copyAngularStrap: {
        command: [
          'cp dist/angular-strap.tpl.js ../../vendor/js/angular-strap.tpl.js',
          'cp dist/angular-strap.js ../../vendor/js/angular-strap.js'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components/angular-strap/'
          }
        }
      },
      copyBootstrap: {
        command: [
          'cp -R less/* ../../vendor/less',
          'cp dist/fonts/* ../../dist/fonts'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components/bootstrap'
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
        tasks: ['less', 'jshint', 'karma']
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', [
    'jshint',
    'grunt:karma'
  ]);

  grunt.registerTask('build', [
    'shell:clean',
    'shell:bowerInstall',
    'shell:makeStructure',
    'shell:buildAngular',
    'shell:copyAngular',
    'shell:copyAngularStrap',
    'shell:copyBootstrap',
    'imagemin',
    'less',
    'jshint',
    'karma'
  ]);

  grunt.registerTask('travis-ci', [
    'build',
    'coveralls'
  ]);
};
