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

  describe('startWatch()', function () {
    var rootScope,
        next = {},
        mockUser = {},
        location,
        state;

    beforeEach(function () {
      mockUser.get = function () {
        return {
          loggedIn: false
        };
      };

      mockUser.access = function () { return []; };
     
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State, $rootScope, $location) {
        state = State;
        rootScope = $rootScope;
        location = $location;
      });
    });

    it('should redirect to page-not-found if route does not exist', function () {
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('/page-not-found');
    });

    it('should redirect to forbidden if user is not logged in', function () {
      next.access = { requiresLogin: true };
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('/forbidden');
    });

    it('should redirect to unauthorized if user is not logged in', function () {
      next.access = { allowedRoles: ['lords', 'ladies'] };
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('/unauthorized');
    });

    it('should update state if user and route are authorized', function () {
      delete next.access.allowedRoles;
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('');
    });
  });

  describe('updateTitle()', function () {
    it('should change page title based on path', inject(function(State, $rootScope) {
      State.updateTitle('/test');
      expect($rootScope.state.title).toBe('Test ');

      State.updateTitle('/test-with-hyphens');
      expect($rootScope.state.title).toBe('Test With Hyphens ');

      State.updateTitle('/');
      expect($rootScope.state.title).toBe('Home');
    }));
  });

  describe('updateNavigation()', function () {
    var mockUser = { access: function () { return []; } },
        rootScope,
        state;

    it('should update rootScope state for logged in user', function () {
      mockUser.get = function () {
        return {
          loggedIn: true
        };
      };
      
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State, $rootScope) {
        state = State;  
        rootScope = $rootScope;
      });

      expect(rootScope.state).toBeUndefined();
      state.updateNavigation();

      expect(rootScope.state.loggedIn).toBe(true);
      expect(rootScope.state.access).toBeDefined();
    });

    it('should update rootScope state for a non-logged in user', function () {
      mockUser.get = function () {
        return {
          loggedIn: false
        };
      };
      
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State, $rootScope) {
        state = State;  
        rootScope = $rootScope;
      });

      state.updateNavigation();
      expect(rootScope.state.loggedIn).toBe(false);
    });
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
