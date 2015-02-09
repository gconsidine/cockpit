(function () {
  'use strict';

  angular.module('cockpit').service('User', User);
  User.$inject = ['$http'];

  function User($http) {
    this.getUsers = function(request, callback) {
      $http.get('/cockpit-api/user')
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.addUser = function(request, callback) {
      $http.post('/cockpit-api/user', request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };
  }
}());

