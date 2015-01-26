'use strict';

//TODO: Placeholder test file
describe('post.controller', function () {
  var $controller,
      $rootScope;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('default-state', function () {
    it('should initialize with proper defaults', function () {
      var post = $controller('PostController'); 
      expect(typeof post === 'object').toBe(true);
    });
  });

});
