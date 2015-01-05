(function () {
  'use strict';

  angular.module('cockpit').controller('LoginController', LoginController);
  LoginController.$inject = ['State', 'User', '$location']; 

  function LoginController(State, User, $location) {
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
        State.alert('danger', 'fail', true);
        return;
      }

      User.login(this.email.value, this.password.value);
      $location.path('/').replace();
    };
  }
}());
