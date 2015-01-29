(function () {
  'use strict';

  angular.module('cockpit').service('Validate', Validate);

  // Loose client-side validation
  function Validate() {
    
    function isName(input) {
      return /^[a-z. -]+$/i.test(input);
    }

    function isEmail(input) {
      return /^.+@.+$/i.test(input);
    }

    function isRole(input) {
      return /^[a-z0-9 _-]+$/i.test(input);
    }

    return {
      isName: isName,
      isEmail: isEmail,
      isRole: isRole
    };
  }
}());
