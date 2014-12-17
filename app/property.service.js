(function () {
  'use strict';

  angular.module('cockpit').service('Property', Property);

  Property.$inject = ['CONFIG'];
  
  function Property(CONFIG) {
    console.log(CONFIG);    
  }

}());
