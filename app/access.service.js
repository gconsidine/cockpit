(function () {
  'use strict';

  angular.module('ip').factory('AccessService', AccessService);

  AccessService.$inject = ['$location', '$rootScope'];
  
  function AccessService($location) {
    var _access;

    function getAccess() {
      return _access;
    }

    function setAccess(access) {
      _access = access;
    }

    function authorizeUser() {
      console.log($location.url());
    } 

    return {
      getAccess: getAccess,
      setAccess: setAccess,
      authorizeUser: authorizeUser
    };
  }

}());
