(function () {
  'use strict';

  angular.module('cockpit').directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/navigation.html'
    };
  }

  angular.module('cockpit').directive('footer', footer);

  function footer() {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/footer.html'
    };
  }

}());
