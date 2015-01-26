'use strict';

//TODO: Placeholder test file
describe('media.controller', function () {
  var $controller,
      $rootScope;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('default-state', function () {
    it('should initialize with proper defaults', function () {
      var media = $controller('MediaController'); 
      expect(typeof media === 'object').toBe(true);
    });
  });

});
