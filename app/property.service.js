(function () {
  'use strict';

  angular.module('cockpit').service('Property', Property);

  Property.$inject = ['CONFIG'];
  
  function Property(CONFIG) {
    
    function getName() {
      return CONFIG.property.name;
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

    function getApi(component, verb, call) {
      return CONFIG.api[component][verb][call];
    }

    return {
      getName: getName,
      getAccess: getAccess,
      getEnvironment: getEnvironment,
      getRoles: getRoles,
      getApi: getApi
    };
  }

}());
