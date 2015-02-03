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
        report: '/cockpit-api/report',
        user: '/cockpit-api/user',
        post: '/cockpit-api/post',
        page: '/cockpit-api/page'
      },
      post: {
        login: '/cockpit-api/login',
        logout: '/cockpit-api/logout',
        user: '/cockpit-api/user',
        post: '/cockpit-api/post',
        page: '/cockpit-api/page'
      },
      put: {
        user: '/cockpit-api/user',
        post: '/cockpit-api/post',
        page: '/cockpit-api/page'
      },
      delete: {
        user: '/cockpit-api/user',
        post: '/cockpit-api/post',
        page: '/cockpit-api/page'
      }
    },
    property: {
      logo: 'http://fillmurray/100/100',
      name: 'Company Name',
      environment: 'test',
      roles: ['user', 'peasant', 'sellsword', 'merchant']
    }
  });
}());
