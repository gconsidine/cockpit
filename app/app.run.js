(function () {
  'use strict';

  angular.module('cockpit').run(runBlock);

  runBlock.$inject = ['State'];

  function runBlock(State) {
    State.authorizeRoutes();
  }
}());
