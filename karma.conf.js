module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'vendor/js/angular.js',
      'vendor/js/angular-route.js',
      'vendor/js/angular-animate.js',
      'vendor/js/angular-mocks.js',
      'app/app.module.js',
      'app/*.js',
      'app/**/*.html',
      'test/*-spec.js'
    ],

    reporters: ['mocha', 'coverage'],

    preprocessors: {
      'app/*.*.js': ['coverage'],
      'app/partials/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      prependPrefix: '/'
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

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor'
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
