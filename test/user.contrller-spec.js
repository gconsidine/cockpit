'use strict';

describe('user.controller', function () {
  var $controller,
      $rootScope,
      mockUser,
      User,
      Property,
      Utility,
      State;

  beforeEach(module('cockpit'));

  module(function($provide) {
    $provide.value('User', mockUser);
  });

  beforeEach(inject(function(_$controller_, _$rootScope_, _Property_, _Utility_, _User_, _State_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    Utility = _Utility_;
    User = _User_;
    Property = _Property_;
    State = _State_;

    Property.getRoles = function () {
      return ['merchant', 'blacksmith', 'alchemist'];
    };
  }));

  describe('default-state', function () {
    it('should initialize with proper defaults', function () {
      var user = $controller('UserController'); 
      
      expect(typeof user.state).toBe('object');
      expect(typeof user.table).toBe('object');
      expect(user.roleList instanceof Array).toBe(true);
    });
  });

  describe('init()', function () {
    it('should call toggleAction with "view list" default', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleAction').and.returnValue(true); 

      user.init();

      expect(user.toggleAction).toHaveBeenCalled();
    });
  });
});

