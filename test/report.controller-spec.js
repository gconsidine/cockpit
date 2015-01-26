'use strict';

//TODO: Placeholder test file
describe('report.controller', function () {
  var $controller,
      $rootScope;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('default-state', function () {
    it('should initialize with proper defaults', function () {
      var report = $controller('ReportController'); 
      expect(typeof report === 'object').toBe(true);
    });
  });

});
