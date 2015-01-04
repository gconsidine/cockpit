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

  angular.module('cockpit').directive('login', login);
  login.$inject = ['State', 'User', '$location'];
  
  function login(State, User, $location) {
    
    function link(scope, element) {
      element.on('mousedown', function() {

        //TODO: Include Validate service check
        if(!scope.login.email.value || !scope.login.password.value) {
          scope.$apply(function () {
            State.alert('danger', 'fail', true);
          });

          return;
        }

        scope.$apply(function () {
          User.login(scope.login.email.value, scope.login.password.value);
          $location.path('/').replace();
        });
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }

}());
