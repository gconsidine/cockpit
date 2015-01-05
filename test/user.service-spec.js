'use strict';

describe('user.service', function () {
  beforeEach(module('cockpit'));

  describe('current', function () {
    it('should return a default user template prior to login', inject(function(User) {
      expect(User.current.loggedIn).toBeDefined();
      expect(User.current.loggedIn).toBe(false);

      expect(User.current.email).toBeDefined();
      expect(User.current.email).toBe('');

      expect(User.current.role).toBeDefined();
      expect(User.current.role).toBe('');
    }));

    it('should return the current user after login', inject(function(User) {

      // Mock login() function to test current property in isolation
      User.login = function (email) {
        User.current = {};
        User.current.email = email;
        User.current.role = 'peasant';
        User.current.loggedIn = true;
      };

      User.login('name@example.com', 'password');

      expect(User.current.loggedIn).toBeDefined();
      expect(User.current.loggedIn).toBe(true);

      expect(User.current.email).toBeDefined();
      expect(User.current.email).toBe('name@example.com');

      expect(User.current.role).toBeDefined();
      expect(User.current.role).toBe('peasant');
    }));
  });

  describe('flush()', function () {
    it('should revert current user to a default empty template', inject(function(User) {

      // Mock login() function to test flush() in isolation
      User.login = function (email) {
        User.current = {};
        User.current.email = email;
        User.current.role = 'peasant';
        User.current.loggedIn = true;
      };

      User.login('name@example.com', 'password');

      expect(User.current.loggedIn).toBeDefined();
      expect(User.current.loggedIn).toBe(true);

      expect(User.current.email).toBeDefined();
      expect(User.current.email).toBe('name@example.com');

      expect(User.current.role).toBeDefined();
      expect(User.current.role).toBe('peasant');

      User.flush();

      expect(User.current.loggedIn).toBeDefined();
      expect(User.current.loggedIn).toBe(false);

      expect(User.current.email).toBeDefined();
      expect(User.current.email).toBe('');

      expect(User.current.role).toBeDefined();
      expect(User.current.role).toBe('');
    }));
  });

  describe('login()', function () {
    it('should set current user assuming user/password is correct', inject(function(User) {
      expect(User.current.loggedIn).toBe(false);
      expect(User.current.email).toBe('');
      expect(User.current.role).toBe('');

      //TODO: Temporary authorization.  Mock $http request to login user
      var email = 'name@example.com',
          password = 'password';

      User.login(email, password);

      expect(User.current.loggedIn).toBe(true);
      expect(User.current.email).toBe(email);
      expect(User.current.role).toBe('user');
    }));
  });

});

