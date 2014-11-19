(function () {
  'use strict';

  angular.module('cockpit').controller('AccessController', AccessController);

  function AccessController() {
    this.greeting = 'Hello from Access';
  }
}());
