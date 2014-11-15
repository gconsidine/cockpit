var app = angular.module('instrumentPanel', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'app/login/login-view.html',
      controller: 'LoginController'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
