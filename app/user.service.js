(function () {
  'use strict';

  angular.module('cockpit').service('User', User);

  function User() {
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

      callback(users);
    };

    // TODO: temp return without API
    this.addUser = function(userObj, callback) {
      var response = {};
      callback(false, userObj, response);
    };
  }
}());

