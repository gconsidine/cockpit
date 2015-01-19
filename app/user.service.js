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
            email: 'name' + i + '@domain.com',
            role: 'user'
          };
        }
      }

      $timeout(function () {
        callback(users);
      }, 2000);
    };

  }
}());

