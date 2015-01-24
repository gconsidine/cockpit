(function () {
  'use strict';

  angular.module('cockpit').service('User', User);

  angular.$inject = ['Property', '$timeout'];

  function User(Property, $timeout) {
    // TODO: temp return without API
    this.getUserList = function(limit, callback) {
      var users = [];

      if(!limit) {
        for(var i = 0; i < 10; i++) {
          users[i] = {
            id: i,
            name: 'First Last' + i,
            email: 'name' + i + '@domain.com',
            createdAt: Date.now(),
            role: 'user',
            status: 'activated'
          };
        }
      }

      $timeout(function () {
        callback(users);
      }, 1000);
    };

    // TODO: temp return without API
    this.addUser = function(userObj, callback) {
      $timeout(function () {
        callback(false, {}, {});
      }, 1000);
    };
  }
}());

