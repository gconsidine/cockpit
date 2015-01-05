(function () {
  'use strict';

  angular.module('cockpit').constant('CONFIG', {
    access: {
      home: ['user'], 
      settings: ['user'], 
      user: ['user'], 
      page: ['user'], 
      post: ['user'], 
      media: ['user'],
      report: ['user'],
      shop: ['user']
    },
    api: {
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
    },
    property: {
      logo: 'http://fillmurray/100/100',
      name: 'Company Name',
    }
  });
}());
