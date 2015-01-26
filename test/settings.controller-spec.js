'use strict';

//TODO: Placeholder test file
describe('settings.controller', function () {
  var $controller,
      $rootScope;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('default-state', function () {
    it('should initialize with proper defaults', function () {
      var settings = $controller('SettingsController'); 
      expect(typeof settings === 'object').toBe(true);
    });
  });

});
