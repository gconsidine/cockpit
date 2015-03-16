'use strict';

describe('user.service', function () {
  var User, Property, $httpBackend;

  beforeEach(module('cockpit'));

  beforeEach(function () {
    inject(function(_User_, _Property_, _$httpBackend_) {
      User = _User_;
      Property = _Property_;
      $httpBackend = _$httpBackend_;
    });
  });

  describe('get()', function () {
    it('should return an array of user objects on success', function () {
      $httpBackend.expectGET(Property.getApi('admin', 'get', 'user'))
                  .respond(200, {ok: true, message: 'success', data: [
                    {
                      name: 'fake name',
                      email: 'name@domain.tld',
                      status: 'unactivated',
                      createdAt: Date.now(),
                      role: 'user'
                    }
                  ]});

      User.get({}, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.ok).toBe(true);
        expect(response.data[0].name).toBeTruthy();
        expect(response.data[0].email).toBeTruthy();
        expect(response.data[0].status).toBeTruthy();
        expect(response.data[0].createdAt).toBeTruthy();
        expect(response.data[0].role).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should return an error on server error', function () {
      $httpBackend.expectGET(Property.getApi('admin', 'get', 'user'))
                  .respond(500, {ok: false, message: '', data: null });

      User.get({}, function (error) { 
        expect(error).toBe(true);
      });

      $httpBackend.flush();
    });
   
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('create()', function () {
    it('should make a http request to create a user and callback the success', function () {
      $httpBackend.expectPOST(Property.getApi('admin', 'post', 'user'))
                  .respond(200, {ok: true, message: 'success', data: { 
                    accepted: ['name@domain.tld'] }
                  });

      var request = {
        user: {
          name: 'Some Name',
          email: 'name@domain.tld',
          role: 'user'
        },
        type: 'add'
      };

      User.create(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(request.type).toBe('add');
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectPOST(Property.getApi('admin', 'post', 'user'))
                  .respond(500, {ok: false, message: '', data: null });

      var request = {};

      User.create(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('edit()', function () {
    it('should make a request to update a user and callback the success', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'user'))
                  .respond(200, {ok: true, message: 'success', data: {updatedExisting: true, n:1}});
      var request = {
        user: {
          criteria: { email: 'name@domain.com' },
          update: { role: 'some-dude' }
        },
        type: 'edit'
      };

      User.edit(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(request.type).toBe('edit');
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'user'))
                  .respond(500, {ok: false, message: '', data: null });

      var request = {};

      User.edit(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('delete()', function () {
    it('should make a request to update a user and callback the success', function () {
      var call = Property.getApi('admin', 'delete', 'user') + '?email=name@domain.com';
      $httpBackend.expectDELETE(call)
                  .respond(200, {ok: true, message: 'success', data: {updatedExisting: true, n:1}});

      var request = {
        user: { email: 'name@domain.com' },
        type: 'remove'
      };

      User.remove(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(request.type).toBe('remove');
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      var call = Property.getApi('admin', 'delete', 'user') + '?email=name@domain.com';
      $httpBackend.expectDELETE(call).respond(500, {ok: false, message: '', data: null });

      var request = {
        user: { email: 'name@domain.com' }
      };

      User.remove(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

});

