(function () {
  'use strict';

  angular.module('cockpit').service('User', User);
  
  angular.$inject = ['CONFIG'];

  function User(CONFIG) {
    // TODO: Make call to API.  Cache user to avoid duplicate calls.  Authenticate user on the 
    // server with every call.
    function get() {
      return {
        loggedIn: true,
        role: 'user',
        email: 'name@example.com'
      };
    }
    
    function access() {
      var permissions = {},
          user = get();

      for(var area in CONFIG.access) {
        if(CONFIG.access[area].indexOf(user.role) === -1) {
          permissions[area] = false;
        } else {
          permissions[area] = true;
        }
      }

      return permissions;
    }

    return {
      get: get,
      access: access
    };
  }
}());

