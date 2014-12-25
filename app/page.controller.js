(function () {
  'use strict';

  angular.module('cockpit').controller('PageController', PageController);

  function PageController() {
    this.greeting = 'Hello from page';
  }
}());
