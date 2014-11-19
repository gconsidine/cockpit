(function () {
  'use strict';

  angular.module('cockpit').run(runBlock);

  runBlock.$inject = ['$rootScope', 'AccessService'];

  function runBlock($rootScope, AccessService) {
    $rootScope.state = {
      title: 'Login'
    };

    AccessService.authorizeUser();
  }
}());
