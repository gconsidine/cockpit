'use strict';

describe('login.controller', function () {
  var $controller,
      $location,
      $rootScope,
      $routeParams,
      User,
      State;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$location_, _$rootScope_, _$routeParams_, _User_, 
                             _State_) {
    $rootScope = _$rootScope_;
    $routeParams = _$routeParams_;
    $location = _$location_;
    $controller = _$controller_;
    User = _User_;
    State = _State_;
  }));
  
  describe('init()', function () {
    it('should set an email value if the parameter exists in the query string', function () {
      var login = $controller('LoginController');

      $routeParams.email = 'name@domain.tld';    
      login.init();
      expect(login.email.value).toBe('name@domain.tld');
    });
  });

  describe('submit()', function () {
    it('should alert user if email is invalid and return', function() {
      var login = $controller('LoginController'); 
      
      login.email.value = 'fake-email';
      spyOn(State, 'alert').and.returnValue(true);
      login.submit();

      expect(State.alert).toHaveBeenCalled();
    });

    it('should call User service\'s login method', function() {
      var login = $controller('LoginController'); 
      
      login.email.value = 'name@domain.tld';
      login.password.value = 'Terr4p1nStATI0n!';
      
      login.complete.bind = function mockBind () {}; 

      spyOn(User, 'login').and.returnValue(true);
      login.submit();

      expect(User.login).toHaveBeenCalled();
    });
  });

  describe('complete()', function () {
    it('should alert user if response error\'d out', function() {
      var login = $controller('LoginController'); 

      spyOn(State, 'alert').and.returnValue(true);

      login.complete(true);
      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert user if request to login was unsuccessful', function() {
      var login = $controller('LoginController'); 

      spyOn(State, 'alert').and.returnValue(true);
      
      login.complete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set state based on response if login was a success', function() {
      var login = $controller('LoginController'); 
      
      spyOn(State, 'alert').and.returnValue(true);
      spyOn(State, 'getAccess').and.returnValue(true);
      
      login.complete(false, {}, {ok: true, message: '', data: [{
        email: 'link@hyrule.com',
        role: 'hero'
      }]});

      expect($rootScope.state.user.email).toBe('link@hyrule.com');
      expect($rootScope.state.user.role).toBe('hero'); 
      expect($rootScope.state.user.loggedIn).toBe(true); 

      expect(State.getAccess).toHaveBeenCalled();
      expect($location.path()).toBe('/');
    });
  });
});

