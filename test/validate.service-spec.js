'use strict';

describe('validate.service', function () {
  var Validate;

  beforeEach(module('cockpit'));

  beforeEach(function () {
    inject(function(_Validate_) {
      Validate = _Validate_;
    });
  });

  describe('isName', function () {
    it('should loosely validate a name and return true', function () {
      var name = 'FitzChivalry Farseer';
      expect(Validate.isName(name)).toBe(true);
    });

    it('should return false for invalid name types', function () {
      var name = '!!!@@@';
      expect(Validate.isName(name)).toBe(false);
    });

    it('should return false for undefined input', function () {
      var name;
      expect(Validate.isName(name)).toBe(false);
    });
  });

  describe('isEmail', function () {
    it('should loosely validate an email and return true', function () {
      var email = 'chade@buckkeep.sd';
      expect(Validate.isEmail(email)).toBe(true);
    });

    it('should return false for undefined input', function () {
      var role;
      expect(Validate.isEmail(role)).toBe(false);
    });

    it('should return false for invalid email types', function () {
      var email = 'uhhhhhh...';
      expect(Validate.isEmail(email)).toBe(false);
    });
  });

  describe('isRole', function () {
    it('should loosely validate a role and return true', function () {
      var role = 'skillmistress';
      expect(Validate.isRole(role)).toBe(true);
    });

    it('should return false for undefined input', function () {
      var role;
      expect(Validate.isRole(role)).toBe(false);
    });

    it('should return false for invalid roles', function () {
      var role = '++++++++';
      expect(Validate.isRole(role)).toBe(false);
    });
  });

  describe('isHash', function () {
    it('should validate sha256 hash format', function () {
      var hash = '00000000aaaaaaaa33333333dddddddd00000000aaaaaaaa33333333dddddddd';
      expect(Validate.isHash('sha256', hash)).toBe(true);
    });

    it('should return false for undefined input', function () {
      var hash;
      expect(Validate.isHash('sha256', hash)).toBe(false);
    });

    it('should fail on unsupported hash type', function () {
      var hash = '00000000aaaaaaaa33333333dddddddd';
      expect(Validate.isHash('md5', hash)).toBe(false);
    });
  });

  describe('isComplex', function () {
    it('should return false for undefined input', function () {
      var password;
      expect(Validate.isComplex(password)).toBe(false);
    });

    it('should return false for non-complex passwords', function () {
      var password = 'password';
      expect(Validate.isComplex(password)).toBe(false);
    });

    it('should return true for complex passwords', function () {
      var password = 'Terr4p1nStATI0n!';
      expect(Validate.isComplex(password)).toBe(true);
    });
  });

  describe('isMatch', function () {
    it('should return false for undefined input', function () {
      var a, b;
      expect(Validate.isMatch(a, b)).toBe(false);
    });

    it('should return false for non-match', function () {
      var a = 'hello',
          b = 'hi';
      expect(Validate.isMatch(a, b)).toBe(false);
    });

    it('should return false for strict non-match', function () {
      var a = 10,
          b = '10';
      expect(Validate.isMatch(a, b)).toBe(false);
    });

    it('should return true for strict match', function () {
      var a = 'matching',
          b = 'matching';
      expect(Validate.isMatch(a, b)).toBe(true);
    });
  });
});

