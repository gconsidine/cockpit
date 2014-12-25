module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'chai'],

    files: [
      'vendor/js/angular.js',
      'vendor/js/angular-route.js',
      'vendor/js/angular-animate.js',
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

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
