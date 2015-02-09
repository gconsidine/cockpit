'use strict';

describe('user.service', function () {
  var User;

  beforeEach(module('cockpit'));

  beforeEach(function () {
    inject(function(_User_) {
      User = _User_;
    });
  });

  describe('getUsers()', function () {
    it('should return an array of user objects');
  });

  describe('addUser()', function () {
    it('should make a http request to create a user and callback the success');
  });
});

