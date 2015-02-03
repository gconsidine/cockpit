(function () {
  'use strict';

  angular.module('cockpit').config(routes);
  
  routes.$inject = ['$routeProvider', 'CONFIG'];

  function routes($routeProvider, CONFIG) {
    $routeProvider.
      when('/', {
        templateUrl: '/app/views/home.html',
        controller: 'HomeController as home',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.home
        }
      }).
      when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginController as login',
        access: {
          requiresLogin: false
        }
      }).
      when('/settings', {
        templateUrl: '/app/views/settings.html',
        controller: 'SettingsController as settings',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.settings
        }
      }).
      when('/user', {
        templateUrl: '/app/views/user.html',
        controller: 'UserController as user',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.user
        }
      }).
      when('/media', {
        templateUrl: '/app/views/media.html',
        controller: 'MediaController as media',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.media
        }
      }).
      when('/page', {
        templateUrl: '/app/views/page.html',
        controller: 'PageController as page',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.page
        }
      }).
      when('/post', {
        templateUrl: '/app/views/post.html',
        controller: 'PostController as post',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.post
        }
      }).
      when('/report', {
        templateUrl: '/app/views/report.html',
        controller: 'ReportController as report',
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.report
        }
      }).
      when('/page-not-found', {
        templateUrl: '/app/views/page-not-found.html',
        access: {
          requiresLogin: false
        }
      }).
      when('/forbidden', {
        templateUrl: '/app/views/forbidden.html',
        access: {
          requiresLogin: false
        }
      }).
      when('/unauthorized', {
        templateUrl: '/app/views/unauthorized.html',
        access: {
          requiresLogin: true
        }
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
}());
