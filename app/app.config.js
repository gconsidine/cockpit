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
      admin: {
        get: {
          user: '/cockpit-api/user',
          activate: '/cockpit-api/user/activate',
          reset: '/cockpit-api/user/reset'
        },
        post: {
          user: '/cockpit-api/user'
        },
        put: {
          user: '/cockpit-api/user',
          activate: '/cockpit-api/user/activate',
          resendActivation: '/cockpit-api/user/resend-activation',
          resetRequest: '/cockpit-api/user/reset-request',
          reset: '/cockpit-api/user/reset',
          login: '/cockpit-api/user/login',
          logout: '/cockpit-api/user/logout'
        },
        delete: {
          user: '/cockpit-api/user'
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
