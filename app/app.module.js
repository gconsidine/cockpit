(function () {
  'use strict';

  angular.module('ip', ['ngRoute']);

  angular.module('ip').run(function($rootScope, AccessService) {
    $rootScope.state = {
      title: 'Login'
    };

    AccessService.authorizeUser();
  });
}());
