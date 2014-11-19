(function () {
  'use strict';

  angular.module('cockpit').constant('AREAS', [
    'login', 
    'logout', 
    'user', 
    'report', 
    'admin', 
    'page', 
    'post'
  ]);

  angular.module('cockpit').constant('API', {
    get: {
      login: '/plz-api/v1/login',
      logout: '/plz-api/v1/logout',
      report: '/plz-api/v1/report',
      user: '/plz-api/v1/user',
      post: '/plz-api/v1/post',
      page: '/plz-api/v1/page'
    },
    post: {
      user: '/plz-api/v1/user',
      post: '/plz-api/v1/post',
      page: '/plz-api/v1/page'
    },
    put: {
      user: '/plz-api/v1/user',
      post: '/plz-api/v1/post',
      page: '/plz-api/v1/page'
    },
    delete: {
      user: '/plz-api/v1/user',
      post: '/plz-api/v1/post',
      page: '/plz-api/v1/page'
    }
  });
}());
