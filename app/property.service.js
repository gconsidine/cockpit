(function () {
  'use strict';

  angular.module('cockpit').service('Property', Property);
  
  Property.$inject = ['CONFIG'];

  function Property(CONFIG) {
    function logo() {
      return CONFIG.property.logo;  
    }

    function name() {
      return CONFIG.property.name;
    }

    function getAllowedRoles(area) {
      return CONFIG.access[area];
    }

    return {
      logo: logo,
      name: name,
      getAllowedRoles: getAllowedRoles
    };
  }

}());
