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
      when('/login/email/:email', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginController as login',
        access: {
          requiresLogin: false
        }
      }).
      when('/activate/email/:email/temp-auth/:tempAuth', {
        templateUrl: '/app/views/activate.html',
        controller: 'ActivateController as activate',
        access: {
          requiresLogin: false
        }
      }).
      when('/reset', {
        templateUrl: '/app/views/reset.html',
        controller: 'ResetController as reset',
        access: {
          requiresLogin: false
        }
      }).
      when('/reset/email/:email/temp-auth/:tempAuth', {
        templateUrl: '/app/views/reset.html',
        controller: 'ResetController as reset',
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
      when('/admin', {
        templateUrl: '/app/views/admin.html',
        controller: 'AdminController as admin',
        reloadOnSearch: false,
        access: {
          requiresLogin: true,
          allowedRoles: CONFIG.access.admin
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
      otherwise({
        redirectTo: '/'
      });
  }
}());
