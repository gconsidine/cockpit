'use strict';

describe('state.service', function () {
  beforeEach(module('cockpit'));

  describe('default-state', function () {
    it('should have a default state object prior to login', inject(function(State, $rootScope) {
      expect($rootScope.state.user.loggedIn).toBeDefined();
      expect($rootScope.state.user.loggedIn).toBe(false);

      expect($rootScope.state.user.email).toBeDefined();
      expect($rootScope.state.user.email).toBe('');

      expect($rootScope.state.user.role).toBeDefined();
      expect($rootScope.state.user.role).toBe('');

      expect($rootScope.state.user.access).toBeDefined();
    }));
  });

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
      mockUser.current = {
        loggedIn: false
      };

      mockUser.getAccess = function () { return []; };
     
      module(function($provide) {
        $provide.value('User', mockUser);
      });

      inject(function(State, $rootScope, $location) {
        state = State;
        rootScope = $rootScope;
        location = $location;
      });
    });

    it('should redirect to / if route does not exist', function () {
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('/');
    });

    it('should redirect to /login if user is not logged in', function () {
      next.access = { requiresLogin: true };
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('/login');
    });

    it('should redirect to / if user is not authorized for the route', function () {
      next.access = { allowedRoles: ['lords', 'ladies'] };
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('/');
    });

    it('should update state if user and route are authorized', function () {
      delete next.access.allowedRoles;
      rootScope.$broadcast('$routeChangeStart', next);
      expect(location.url()).toBe('');
    });
  });

  describe('startActionWatch()', function () {
    var rootScope,
        location,
        state;

    beforeEach(function () {
      inject(function(State, $rootScope, $location) {
        state = State;
        rootScope = $rootScope;
        location = $location;
      });
    });

    it('should listen for query string changes on a URL', function (done) {
      state.startActionWatch(function (params) {
        expect(params).toBe('test');
        done();
      });

      rootScope.$broadcast('$routeUpdate', {params: 'test'});
    });
  });

  describe('getLoggedInUser()', function () {
    var rootScope,
        state;

    beforeEach(function () {
      inject(function(State, $rootScope) {
        state = State;
        rootScope = $rootScope;
      });
    });

    it('should listen for query string changes on a URL', function () {
      rootScope.state = {
        user: 'name@domain.com'
      };

      expect(state.getLoggedInUser()).toBe('name@domain.com');
    });
  });

  describe('toggleAction()', function () {
    var location,
        state;

    beforeEach(function () {
      inject(function(State, $rootScope, $location) {
        state = State;
        location = $location;
      });
    });

    it('should update the query string by using $location', function () {
      expect(JSON.stringify(location.search())).toBe('{}');
      state.toggleAction({key: 'value'});

      var query = location.search();
      expect(query.key).toBe('value');
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

  describe('verifyLogin()', function () {
    var next = {}, State, $rootScope;

    it('should return true for a logged in user', function () {
      inject(function(_State_, _$rootScope_) {
        State = _State_;  
        $rootScope = _$rootScope_;
      });

      $rootScope.state.user.loggedIn = false;
      next.access = {};
      expect(State.verifyLogin(next)).toBe(true);

      $rootScope.state.user.loggedIn = true;
      next.access.requiresLogin = true;
      expect(State.verifyLogin(next)).toBe(true);
    });

    it('should return false for a non-logged in user', function () {
      inject(function(_State_, _$rootScope_) {
        State = _State_;  
        $rootScope = _$rootScope_;
      });

      $rootScope.state.user.loggedIn = false;
      next.access = {};
      expect(State.verifyLogin(next)).toBe(true);

      next.access.requiresLogin = true;
      expect(State.verifyLogin(next)).toBe(false);
    });
  });

  describe('authorizeRoute()', function () {
    var next = {}, State, $rootScope;

    it('should return true for an authorized role', function () {
      inject(function(_State_, _$rootScope_) {
        State = _State_;  
        $rootScope = _$rootScope_;
      });

      $rootScope.state.user.role = 'sellswords';

      next.access = {
        allowedRoles: ['sellswords']
      };

      expect(State.authorizeRoute(next)).toBe(true);
    });

    it('should return false for an unauthorized role', function () {
      inject(function(_State_, _$rootScope_) {
        State = _State_;  
        $rootScope = _$rootScope_;
      });

      $rootScope.state.user.role = 'sellswords';

      next.access = {
        allowedRoles: ['knights']
      };

      expect(State.authorizeRoute(next)).toBe(false);
    });
  });

  describe('logout()', function () {
    it('should delete a user\'s state/session and redirect to login', function () {
      var State, $rootScope, $location;

      inject(function(_State_, _$rootScope_, _$location_) {
        State = _State_;  
        $rootScope = _$rootScope_;
        $location = _$location_;
      });

      $rootScope.state = {
        title: 'Fake Title',
        user: {
          loggedIn: true,
          access: [],
        },
        alert: {}
      };

      State.logout();
      expect($rootScope.state).toBeUndefined();
      expect($location.path()).toBe('/login');
    });
  });

  describe('alert()', function () {
    it('should set an alert in $rootScope\'s state', function () {
      var state,
          rootScope;

      inject(function(State, $rootScope) {
        state = State;  
        rootScope = $rootScope;
      });

      state.alert(true, 'danger', 'Invalid email address');

      expect(rootScope.state.alert.type).toBe('danger');
      expect(rootScope.state.alert.message).toBe('Invalid email address');
      expect(rootScope.state.alert.active).toBe(true);
    });
  });

  describe('getAccess()', function () {
    it('should return a permissions object based on Property\'s access', function() {
      var mockProperty = {}, State, $rootScope;

      mockProperty.getAccess = function () {
        return {
          home: ['peasant', 'sellsword'], 
          reports: ['sellsword'], 
          media: ['lord']
        };
      };

      module(function($provide) {
        $provide.value('Property', mockProperty);
      });

      inject(function(_State_, _$rootScope_) {
        State = _State_;
        $rootScope = _$rootScope_;
      });

      $rootScope.state.user.role = 'sellsword';

      var permissions = State.getAccess();
      
      expect(permissions.home).toBe(true);
      expect(permissions.reports).toBe(true);
      expect(permissions.media).toBe(false);
    });
  });
});
