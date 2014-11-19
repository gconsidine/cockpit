(function () {
  'use strict';

  angular.module('cockpit').controller('LoginController', LoginController);

  function LoginController() {
    this.greeting = 'Hello from login';
  }
}());
