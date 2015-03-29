(function () {
  'use strict';

  angular.module('cockpit').constant('CONFIG', {

    access: {
      home: ['user'], 
      settings: ['user'], 
      admin: ['user'], 
      page: ['user'], 
      post: ['user'], 
      media: ['user'],
      report: ['user'],
      shop: ['user']
    },

    api: {
      admin: {
        get: {
          user: '/cockpit-api/admin',
          activate: '/cockpit-api/admin/activate',
          reset: '/cockpit-api/admin/reset'
        },
        post: {
          user: '/cockpit-api/admin'
        },
        put: {
          user: '/cockpit-api/admin',
          activate: '/cockpit-api/admin/activate',
          resendActivation: '/cockpit-api/admin/resend-activation',
          resetRequest: '/cockpit-api/admin/reset-request',
          reset: '/cockpit-api/admin/reset',
          login: '/cockpit-api/admin/login',
          logout: '/cockpit-api/admin/logout'
        },
        delete: {
          user: '/cockpit-api/admin'
        }
      }
    },

    property: {
      name: 'Cockpit',
      environment: 'development',
      roles: ['user', 'peasant', 'sellsword', 'merchant']
    }
  });
}());
