module.exports = function (grunt) {
  'use strict';
  
  var _js = {
    app: ['app/**/*.js'],
    vendor: ['vendor/js/*'],
    test: ['test/*Spec.js'],
    process: ['gruntfile.js']
  };

  _js.all = _js.app.concat(_js.app, _js.test, _js.process);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      all: _js.all
    },

    less: {
      dev: {
        options: {
        },
        files: {
          'dist/css/instrument-panel.css': 'style/instrument-panel.less'
        }
      }
    },

    shell: {
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
        command: 'grunt',
        options: {
          execOptions: {
            cwd: 'bower_components/angular-latest/'
          }
        }
      },
      buildAngularUi: {
        command: 'npm install && grunt build',
        options: {
          execOptions: {
            cwd: 'bower_components/angular-ui-bootstrap/'
          }
        }
      },
      copyAngularUi: {
        command: 'cp dist/*tpls*[!][min].js ../../vendor/js/ui-bootstrap-tpls.js',
        options: {
          execOptions: {
            cwd: 'bower_components/angular-ui-bootstrap/'
          }
        }
      },
      copyAngular: {
        command: [
          'cp build/angular.js ../../vendor/js',
          'cp build/angular-route.js ../../vendor/js'
        ].join('&&'),
        options: {
          execOptions: {
            cwd: 'bower_components/angular-latest'
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
      }
    },

    watch: {
      all: {
        files: _js.all,
        tasks: ['jshint']
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
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'shell:clean',
    'shell:makeStructure',
    'shell:buildAngular',
    'shell:copyAngular',
    'shell:buildAngularUi',
    'shell:copyAngularUi',
    'shell:copyBootstrap',
    'less'
  ]);

};
