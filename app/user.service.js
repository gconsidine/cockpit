(function () {
  'use strict';

  angular.module('cockpit').service('User', User);
  User.$inject = ['$http', '$rootScope', '$location', 'Property'];

  function User($http, $rootScope, $location, Property) {

    this.get = function(request, callback) {
      $http.get(Property.getApi('admin', 'get', 'user'))
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.create = function(request, callback) {
      $http.post(Property.getApi('admin', 'post', 'user'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.edit = function(request, callback) {
      $http.put(Property.getApi('admin', 'put', 'user'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.remove = function(request, callback) {
      var options = {
        params: {
          email: request.user.email,
        }
      };

      $http.delete(Property.getApi('admin', 'delete', 'user'), options)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.getPendingActivation = function(request, callback) {
      var options = {
        params: {
          email: request.user.email,
          tempAuth: request.user.tempAuth
        }
      };

      $http.get(Property.getApi('admin', 'get', 'activate'), options)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.activate = function(request, callback) {
      $http.put(Property.getApi('admin', 'put', 'activate'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
       });
    };

    this.getPendingReset = function(request, callback) {
      var options = {
        params: {
          email: request.user.email,
          tempAuth: request.user.tempAuth
        }
      };

      $http.get(Property.getApi('admin', 'get', 'reset'), options)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.resetRequest = function(request, callback) {
      $http.put(Property.getApi('admin', 'put', 'resetRequest'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.reset = function(request, callback) {
      $http.put(Property.getApi('admin', 'put', 'reset'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.resendActivation = function(request, callback) {
      $http.put(Property.getApi('admin', 'put', 'resendActivation'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };

    this.login = function (request, callback) {
      $http.put(Property.getApi('admin', 'put', 'login'), request)
        .success(function (response) {
          callback(false, request, response);
        })
        .error(function (response) {
          callback(true, request, response);
        });
    };
  }
}());

