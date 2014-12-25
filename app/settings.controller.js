(function () {
  'use strict';

  angular.module('cockpit').controller('SettingsController', SettingsController);

  function SettingsController() {
    this.greeting = 'Hello from Settings';
  }
}());
