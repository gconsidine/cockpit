(function () {
  'use strict';

  angular.module('cockpit').controller('UserController', UserController);

  function UserController() {
    this.greeting = 'Hello from User';
  }
}());
