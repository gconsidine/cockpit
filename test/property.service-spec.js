'use strict';

describe('property.service', function () {
  beforeEach(module('cockpit'));

  describe('getName()', function () {
    it('should get the property\'s name set in the config', inject(function(Property, CONFIG) {
      CONFIG.property = {
        name: 'Tigana'
      };

      expect(Property.getName()).toBe('Tigana');
    }));
  });

  describe('getLogo()', function () {
    it('should get the property\'s logo asset location', inject(function(Property, CONFIG) {
      CONFIG.property = {
        logo: 'dist/img/logo.png'
      };

      expect(Property.getLogo()).toBe('dist/img/logo.png');
    }));
  });

  describe('getAccess()', function () {
    it('should get the property\'s access privileges', inject(function(Property, CONFIG) {
      CONFIG.access = {
        stormwind: ['alliance'],
        undercity: ['horde']
      };
      
      var access = Property.getAccess();

      expect(access.stormwind.indexOf('alliance')).not.toBe(-1);
      expect(access.undercity.indexOf('horde')).not.toBe(-1);
    }));
  });

});
