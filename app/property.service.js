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
      return CONFIG.property.environment;
    }

    function getRoles() {
      return CONFIG.property.roles;
    }

    return {
      getName: getName,
      getLogo: getLogo,
      getAccess: getAccess,
      getEnvironment: getEnvironment,
      getRoles: getRoles
    };
  }

}());
