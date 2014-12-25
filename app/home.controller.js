(function () {
  'use strict';

  angular.module('cockpit').controller('HomeController', HomeController);

  function HomeController() {
    this.greeting = 'Hello from home';
  }
}());
