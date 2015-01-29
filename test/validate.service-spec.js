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
  });

  describe('isEmail', function () {
    it('should loosely validate an email and return true', function () {
      var email = 'chade@buckkeep.sd';
      expect(Validate.isEmail(email)).toBe(true);
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

    it('should return false for invalid roles', function () {
      var role = '++++++++';
      expect(Validate.isRole(role)).toBe(false);
    });
  });
});

