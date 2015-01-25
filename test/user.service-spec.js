'use strict';

describe('user.service', function () {
  var User;

  beforeEach(module('cockpit'));

  beforeEach(function () {
    inject(function(_User_) {
      User = _User_;
    });
  });

  describe('getUserList()', function () {
    it('should return an array of user objects', function(done) {
      User.getUserList(undefined, function (users) {
        expect(users instanceof Array).toBe(true);
        done();
      });
    });
  });

  describe('addUser()', function () {
    it('should make a http request to create a user and callback the success', function (done) {
      User.addUser({}, function (error, request, response) {
        expect(error).toBe(false);
        expect(typeof request).toBe('object');
        expect(typeof response).toBe('object');
        done();
      });
    });
  });
});

