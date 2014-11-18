(function () {
  'use strict';

  angular.module('ip').directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: 'access.navigation.html'
    };
  }
}());
