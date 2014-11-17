(function () {
  'use strict';

  angular.module('ip').controller('Login', Login);

  Login.$inject = ['$scope'];

  function Login($scope) {
    $scope.test = {
      hi: 'hiya world'
    };
  }
}());
