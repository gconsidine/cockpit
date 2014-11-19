(function () {
  'use strict';

  angular.module('cockpit').config(routes);
  
  routes.$inject = ['$routeProvider'];

  function routes($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/login.view.html',
        controller: 'LoginController as login'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
}());
