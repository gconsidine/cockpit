(function () {
  'use strict';

  angular.module('cockpit').service('Validate', Validate);

  // Loose client-side validation
  function Validate() {
    
    function isName(input) {
      if(!input) {
        return false;
      }

      return /^[a-z. -]+$/i.test(input);
    }

    function isEmail(input) {
      if(!input) {
        return false;
      }
      
      return /^.+@.+$/i.test(input);
    }

    function isRole(input) {
      if(!input) {
        return false;
      }

      return /^[a-z0-9 _-]+$/i.test(input);
    }

    function isHash(type, input) {
      if(!input) {
        return false;
      }

      var sha256 = /^[a-fA-F0-9]{64}$/;

      switch(type) {
        case 'sha256':
          return sha256.test(input);
        default:
          return false;
      }
    }
    
    function isComplex(password) {
      if(!password) {
        return false;
      }

      var hasUpperCase = /[A-Z]/g,
          hasLowerCase = /[a-z]/g,
          hasNumber = /[0-9]/g,
          hasSpecialCharacter = /[`~!@#$%^&*()_\-+={}[\]\|:;"'<>,.?\/]/g;
      
      if(hasUpperCase.test(password) && hasLowerCase.test(password) &&
         (hasNumber.test(password) || hasSpecialCharacter.test(password)) &&
         password.length >= 8) {
        
        return true;
      } else {
        return false;
      }
    }

    function isMatch(a, b) {
      if(!a || !b) {
        return false;
      }

      return a === b ? true : false;
    }

    return {
      isName: isName,
      isEmail: isEmail,
      isRole: isRole,
      isHash: isHash,
      isMatch: isMatch,
      isComplex: isComplex
    };
  }
}());
