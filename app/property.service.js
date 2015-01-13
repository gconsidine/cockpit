(function () {
  'use strict';

  angular.module('cockpit').service('Property', Property);

  Property.$inject = ['CONFIG'];
  
  function Property(CONFIG) {
    
    function getName() {
      return CONFIG.property.name;
    }
    
    function getLogo() {
      return CONFIG.property.logo;
    }

    function getAccess() {
      return CONFIG.access;
    }
    
    function getEnvironment() {
      return CONFIG.environment;
    }

    return {
      getName: getName,
      getLogo: getLogo,
      getAccess: getAccess,
      getEnvironment: getEnvironment
    };
  }

}());
