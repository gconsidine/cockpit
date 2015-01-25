'use strict';

// TODO: Test more meaningful template interactions with State
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

  describe('logout()', function () {
    var $compile,
        $rootScope,
        State,
        User;

    beforeEach(inject(function(_$compile_, _$rootScope_, _State_, _User_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      State = _State_;
      User = _User_;
    }));

    it('should logout a user on mousedown of an element', function() {
      var element = $compile('<a logout></a>')($rootScope);

      $rootScope.$digest();
      
      spyOn(State, 'logout');

      element.triggerHandler('mousedown');

      expect(State.logout).toHaveBeenCalled();
    });
  });

  describe('sortTable()', function () {
    var $compile,
        $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should do things', function() {
      var td = $compile('<td sort-table="id" order=""></td>')($rootScope);

      $rootScope.$digest();
      td.triggerHandler('click');
    });
  });

});
