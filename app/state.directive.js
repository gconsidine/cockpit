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

  angular.module('cockpit').directive('userAlert', userAlert);

  function userAlert() {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/user-alert.html'
    };
  }

  angular.module('cockpit').directive('logout', logout);
  logout.$inject = ['State'];
  
  function logout(State) {

    function link(scope, element) {
      element.on('mousedown', function() {
        scope.$apply(function () {
          State.logout();
        });
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }

}());
