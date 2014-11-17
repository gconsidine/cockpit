(function () {
  'use strict';

  angular.module('ip').config(routes);
  
  routes.$inect = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/login.html',
        controller: 'Login'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }

}());
