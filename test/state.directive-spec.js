'use strict';

// TODO: Test more meaningful template interactions with State and User
describe('state.directive', function () {
  var $compile,
      $rootScope;

  beforeEach(module('cockpit'));
  beforeEach(module('templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('navigation()', function () {

    it('should load the navigation partial', function() {
      var element = $compile('<navigation></navigation>')($rootScope);

      $rootScope.$digest();
      
      expect(element.html()).toContain('<nav class="navbar navbar-default" role="navigation">');
    });
  });

  describe('footer()', function () {
    it('should load the footer partial', function() {
      var element = $compile('<footer></footer>')($rootScope);

      $rootScope.$digest();

      expect(element.html()).toContain('caprahorn.com');
    });
  });

  describe('userAlert()', function () {
    it('should load the user-alert partial', function() {
      var element = $compile('<user-alert></user-alert>')($rootScope);

      $rootScope.$digest();

      expect(element.html()).toContain('<!-- ngIf: state.alert.active -->');
    });
  });
});
