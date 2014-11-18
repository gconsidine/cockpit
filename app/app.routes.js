(function () {
  'use strict';

  angular.module('ip').config(routes);
  
  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/login.html',
        controller: 'LoginController as login'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }

}());
