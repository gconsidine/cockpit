(function () {
  'use strict';

  angular.module('cockpit').controller('LoginController', LoginController);
  LoginController.$inject = ['State', '$location']; 

  function LoginController(State, $location) {
    this.email = {
      value: '',
      valid: false
    };

    this.password = {
      value: '',
      valid: false
    };

    this.submit = function () {
      if(!this.email.value || !this.password.value) {
        State.alert(true, 'danger', 'Invalid login credentials');
        return;
      }

      State.login(this.email.value, this.password.value);
      $location.path('/').replace();
    };
  }
}());
