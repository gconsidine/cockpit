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

  describe('getEnvironment()', function () {
    it('should return the environment variable set', inject(function(Property, CONFIG) {
      CONFIG.property = {
        environment: 'test'
      };

      expect(Property.getEnvironment()).toBe('test');
    }));
  });

  describe('getApi()', function () {
    it('should return a URL for a given call', inject(function(Property, CONFIG) {
      CONFIG.api = {
        admin: {
          get: {
            user: '/path-to-user-api'
          }
        }
      };

      expect(Property.getApi('admin', 'get', 'user')).toBe('/path-to-user-api');
    }));
  });

  describe('getRoles()', function () {
    it('should return the array of roles set', inject(function(Property, CONFIG) {
      CONFIG.property = {
        roles: ['goat', 'demon', 'goat-demon']
      };
      
      var roles = Property.getRoles();
      expect(roles[0]).toBe('goat');
      expect(roles[1]).toBe('demon');
      expect(roles[2]).toBe('goat-demon');
    }));
  });

});
