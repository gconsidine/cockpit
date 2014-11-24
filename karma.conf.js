// Karma configuration
// Generated on Sun Nov 16 2014 16:55:52 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'vendor/js/angular.js',
      'vendor/js/angular-route.js',
      'vendor/js/angular-animate.js',
      'vendor/js/angular-strap.js',
      'vendor/js/angular-strap.tpl.js',
      'app/app.module.js',
      'app/*.js',
      'test/*.spec.js'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/*.*.js': ['coverage']
    },

    coverageReporter: {
      dir: '.',
      reporters: [
        {
          type : 'lcovonly',
          subdir: '.',
          file: 'coverage.lcov'
        }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
