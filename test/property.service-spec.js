'use strict';

describe('property.service', function () {
  var config, Property;

  beforeEach(module('cockpit'));

  beforeEach(function () {
    inject(function(CONFIG, _Property_) {
      config = CONFIG;
      Property = _Property_;
    });
  });

  describe('getName()', function () {
    it('should get the property\'s name set in the config', function () {
      expect(Property.getName()).toBe('Cockpit');
    });
  });

  describe('getAccess()', function () {
    it('should get the property\'s access privileges', function() {
      var access = Property.getAccess();

      expect(access.home.indexOf('user')).not.toBe(-1);
      expect(access.settings.indexOf('user')).not.toBe(-1);
    });
  });

  describe('getEnvironment()', function () {
    it('should return the environment variable set', function() {
      expect(Property.getEnvironment()).toBe('development');
    });
  });

  describe('getApi()', function () {
    it('should return a URL for a given call', function() {
      expect(Property.getApi('admin', 'get', 'user')).toBe('/cockpit-api/admin');
    });
  });

  describe('getRoles()', function () {
    it('should return the array of roles set', function() {
      var roles = Property.getRoles();
      expect(roles[0]).toBe('user');
      expect(roles[1]).toBe('peasant');
      expect(roles[2]).toBe('sellsword');
    });
  });

});
