(function () {
  'use strict';

  angular.module('cockpit').service('User', User);
  User.$inject = ['$http', '$rootScope', '$location', 'Property'];

  function User($http, $rootScope, $location, Property) {

    this.get = function(request, callback) {
      $http.get(Property.getApi('user', 'get', 'user'))
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.create = function(request, callback) {
      $http.post(Property.getApi('user', 'post', 'user'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.edit = function(request, callback) {
      $http.put(Property.getApi('user', 'put', 'user'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.remove = function(request, callback) {
      $http.delete(Property.getApi('user', 'delete', 'user'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.getPendingActivation = function(request, callback) {
      $http.get(Property.getApi('user', 'get', 'activate'), request)
        .success(function (response) {
          console.log(response);
          callback(false, response);
        })
        .error(function (response) {
          callback(true, response);
        });
    };

    this.activate = function(request, callback) {
      $http.put(Property.getApi('user', 'put', 'activate'), request)
        .success(function (response) {
          callback(false, response);
        })
        .error(function (response) {
          callback(true, response);
        });
    };

    this.getPendingReset = function(request, callback) {
      $http.get(Property.getApi('user', 'get', 'reset'), request)
        .success(function (response) {
          callback(false, response);
        })
        .error(function (response) {
          callback(true, response);
        });
    };

    this.reset = function(request, callback) {
      $http.put(Property.getApi('user', 'put', 'reset'), request)
        .success(function (response) {
          callback(false, response);
        })
        .error(function (response) {
          callback(true, response);
        });
    };

    this.logout = function () {
      delete $rootScope.state;
      $location.path('/login').replace();            
    };

    this.login = function (request, callback) {
      $http.put(Property.getApi('user', 'put', 'login'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };
  }
}());

