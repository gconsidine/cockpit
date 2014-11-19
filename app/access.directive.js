(function () {
  'use strict';

  angular.module('cockpit').directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: 'app/access.navigation.partial.html'
    };
  }
}());
