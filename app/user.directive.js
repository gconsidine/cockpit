(function () {
  'use strict';

  angular.module('cockpit').directive('logout', logout);
  logout.$inject = ['State', 'User'];
  
  function logout(State, User) {

    function link(scope, element) {
      element.on('mousedown', function() {
        scope.$apply(function () {
          State.flush();
          User.flush();
        });
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }

  angular.module('cockpit').directive('cLogin', cLogin);
  // TODO: Include Validate service and Alert service
  cLogin.$inject = ['User'];
  
  function cLogin(User) {

    function link(scope, element) {
      element.on('mousedown', function() {
        scope.$apply(function () {
          // Email is undefined until validated
          User.login(scope.login.email.value, scope.login.password.value);
        });
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }

}());
