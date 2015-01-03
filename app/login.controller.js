(function () {
  'use strict';

  angular.module('cockpit').controller('LoginController', LoginController);

  function LoginController() {
    this.email = {
      value: '',
      valid: false
    };

    this.password = {
      value: '',
      valid: false
    };
  }
}());
