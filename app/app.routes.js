(function () {
  'use strict';

  angular.module('cockpit').config(routes);
  
  routes.$inject = ['$routeProvider', 'CONFIG'];

  function routes($routeProvider, CONFIG) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/home.view.html',
        controller: 'HomeController as home',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.home
        }
      }).
      when('/login', {
        templateUrl: 'app/login.view.html',
        controller: 'LoginController as login',
        access: {
          requiresLogin: false
        }
      }).
      when('/logout', {
        templateUrl: 'app/login.view.html',
        controller: 'LoginController as login',
        access: {
          requiresLogin: false
        }
      }).
      when('/settings', {
        templateUrl: 'app/settings.view.html',
        controller: 'SettingsController as settings',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.settings
        }
      }).
      when('/user', {
        templateUrl: 'app/user.view.html',
        controller: 'UserController as user',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.user
        }
      }).
      when('/media', {
        templateUrl: 'app/media.view.html',
        controller: 'MediaController as media',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.media
        }
      }).
      when('/page', {
        templateUrl: 'app/page.view.html',
        controller: 'PageController as page',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.page
        }
      }).
      when('/post', {
        templateUrl: 'app/post.view.html',
        controller: 'PostController as post',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.post
        }
      }).
      when('/report', {
        templateUrl: 'app/report.view.html',
        controller: 'ReportController as report',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.report
        }
      }).
      when('/page-not-found', {
        templateUrl: 'app/report.view.html',
        controller: 'ReportController as report',
        access: {
          requiresLogin: false
        }
      }).
      when('/forbidden', {
        templateUrl: 'app/report.view.html',
        controller: 'ReportController as report',
        access: {
          requiresLogin: false
        }
      }).
      when('/unauthorized', {
        templateUrl: 'app/report.view.html',
        controller: 'ReportController as report',
        access: {
          requiresLogin: true
        }
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
}());
