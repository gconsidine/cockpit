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

}());
