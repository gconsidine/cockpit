(function () {
  'use strict';

  angular.module('cockpit').controller('PostController', PostController);

  function PostController() {
    this.greeting = 'Hello from post';
  }
}());
