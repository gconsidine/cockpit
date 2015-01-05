(function () {
  'use strict';

  angular.module('cockpit').service('User', User);

  angular.$inject = ['Property'];

  function User(Property) {
    this.current = {
      loggedIn: false,
      email: '',
      role: ''
    };

    this.flush = function () {
      this.current = {
        loggedIn: false,
        email: '',
        role: ''
      };
    };

    this.login = function(email, password) {
      // TODO: connect with API, validate etc., return user object
      if(email && password) {
        var user = {
          role: 'user',
          email: email
        };

        user.loggedIn = true;
        
        this.current = user;
        return true;
      }

      return false;
    };

    this.getAccess = function () {
      var permissions = {},
          accessList = Property.getAccess();

      for(var area in accessList) {
        if(accessList[area].indexOf(this.current.role) === -1) {
          permissions[area] = false;
        } else {
          permissions[area] = true;
        }
      }

      return permissions;
    };
  }
}());

