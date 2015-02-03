(function () {
  'use strict';

  angular.module('cockpit').service('User', User);
  User.$inject = ['$http'];

  function User($http) {
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

    this.addUser = function(user, callback) {
      $http.post('/cockpit-api/user', user)
        .success(function (response) {
          callback(false, user, response);
        })
        .error(function (response) {
          callback(true, user, response);
        });
    };
  }
}());

