'use strict';

describe('state.service', function () {
  beforeEach(module('cockpit'));

  describe('verifyRoute()', function () {
    it('should verify a route based on explicit access property', inject(function(State) {
      var next = {};
      expect(State.verifyRoute(next)).toBe(false);

      next.access = {};
      expect(State.verifyRoute(next)).toBe(true);
    }));
  });

  describe('updateTitle()', function () {
    it('should change page title based on path', inject(function(State, $rootScope) {
      State.updateTitle('/test');

      expect($rootScope.state).toBeDefined();
      expect($rootScope.state.title).toBeDefined();
      expect($rootScope.state.title).toBe('Test ');

      State.updateTitle('/test-with-hyphens');
      expect($rootScope.state).toBeDefined();
      expect($rootScope.state.title).toBeDefined();
      expect($rootScope.state.title).toBe('Test With Hyphens ');
    }));
  });

  describe('verifyLogin()', function () {
    var mockUser = {},
        next = {},
        state;

    it('should return true for a logged in user', function () {
      mockUser.get = function () {
        return {
          loggedIn: true
        };
      };
      
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State) {
        state = State;  
      });

      next.access = {};
      expect(state.verifyLogin(next)).toBe(true);

      next.access.requiresLogin = true;
      expect(state.verifyLogin(next)).toBe(true);
    });

    it('should return false for a non-logged in user', function () {
      mockUser.get = function () {
        return {
          loggedIn: false
        };
      };
      
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State) {
        state = State;  
      });

      next.access = {};
      expect(state.verifyLogin(next)).toBe(true);

      next.access.requiresLogin = true;
      expect(state.verifyLogin(next)).toBe(false);
    });
  });

  describe('authorizeRoute()', function () {
    var mockUser = {},
        next = {},
        state;

    it('should return true for an authorized role', function () {
      mockUser.get = function () {
        return {
          role: 'user'
        };
      };
      
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State) {
        state = State;  
      });

      next.access = {
        allowedRoles: ['user']
      };

      expect(state.authorizeRoute(next)).toBe(true);
    });

    it('should return false for an unauthorized role', function () {
      mockUser.get = function () {
        return {
          role: 'peasant'
        };
      };
      
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State) {
        state = State;  
      });

      next.access = {
        allowedRoles: ['user']
      };

      expect(state.authorizeRoute(next)).toBe(false);
    });

  });
});
