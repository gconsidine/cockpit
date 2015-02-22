'use strict';

describe('login.controller', function () {
  var $controller,
      $location,
      $rootScope,
      User,
      State;

  beforeEach(module('cockpit'));

  var mockUser = {};
  mockUser.login = null;

  module(function($provide) {
    $provide.value('User', mockUser);
  });

  beforeEach(inject(function(_$controller_, _$location_, _$rootScope_, _User_, _State_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    $controller = _$controller_;
    User = _User_;
    State = _State_;
  }));

  describe('submit()', function () {
    it('should initialize with empty email and password values', function() {
      var login = $controller('LoginController'); 

      expect(login.email.value).toBe('');
      expect(login.password.value).toBe('');
    });

    it('should alert on invalid login form submission', function() {
      var login = $controller('LoginController'); 

      login.email.value = '';
      login.password.value = 'password';

      login.submit();

      expect($rootScope.state.alert.active).toBe(true);
      expect($rootScope.state.alert.type).toBe('danger');
      expect($rootScope.state.alert.type).not.toBe('');
    });

    it('should handle a valid login form submission');
  });
});

