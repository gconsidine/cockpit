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
  });

  describe('getPendingActivation()', function () {
    var call;

    beforeEach(function (){
      call = Property.getApi('admin', 'get', 'activate') + 
             '?email=name@domain.com' +
             '&tempAuth=fake';
    });

    it('should get a user if there\'s a match for email and status', function () {
      $httpBackend.expectGET(call)
                  .respond(200, {ok: true, message: 'success', data: [
                    {
                      name: 'fake name',
                      email: 'name@domain.tld',
                      status: 'activation-pending',
                      createdAt: Date.now(),
                      role: 'user'
                    }
                  ]});

      var request = {
        user: { 
          email: 'name@domain.com',
          tempAuth: 'fake'
        }
      };

      User.getPendingActivation(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectGET(call).respond(500, {ok: false, message: '', data: null });

      var request = { 
        user: { 
          email: 'name@domain.com',
          tempAuth: 'fake'
        }
      };

      User.getPendingActivation(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });
  });

  describe('activate()', function () {
    it('should activate an existing user', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'activate'))
                  .respond(200, {ok: true, message: 'success', data: {updatedExisting: true, n:1}});

      var request = {
        user: {
          email: 'name@domain.com',
          tempAuth: 'temp',
          password: {
            new: 'fakeandweak',
            confirm: 'fakeandweak' 
          }
        }
      };

      User.activate(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.data.updatedExisting).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'activate'))
                  .respond(500, {ok: false, message: '', data: null });

      var request = {};

      User.activate(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });
  });

  describe('reset()', function () {
    it('should reset an existing user\'s password', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'reset'))
                  .respond(200, {ok: true, message: 'success', data: {updatedExisting: true, n:1}});

      var request = {
        user: {
          email: 'name@domain.com',
          tempAuth: 'temp',
          password: {
            new: 'fakeandweak',
            confirm: 'fakeandweak' 
          }
        }
      };

      User.reset(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.data.updatedExisting).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'reset'))
                  .respond(500, {ok: false, message: '', data: null });

      var request = {};

      User.reset(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });
  });

  describe('getPendingReset()', function () {
    var call;

    beforeEach(function (){
      call = Property.getApi('admin', 'get', 'reset') + 
             '?email=name@domain.com' +
             '&tempAuth=fake';
    });

    it('should get a user if there\'s a match for email and status', function () {
      $httpBackend.expectGET(call)
                  .respond(200, {ok: true, message: 'success', data: [
                    {
                      name: 'fake name',
                      email: 'name@domain.tld',
                      status: 'reset-pending',
                      createdAt: Date.now(),
                      role: 'user'
                    }
                  ]});

      var request = {
        user: { 
          email: 'name@domain.com',
          tempAuth: 'fake'
        }
      };

      User.getPendingReset(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectGET(call).respond(500, {ok: false, message: '', data: null });

      var request = { 
        user: { 
          email: 'name@domain.com',
          tempAuth: 'fake'
        }
      };

      User.getPendingReset(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });
  });

  describe('resendActivation()', function () {
    it('should make a request to resend a user\'s activation email', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'resendActivation'))
                  .respond(200, {ok: true, message: 'success', data: {updatedExisting: true, n:1}});

      var request = {
        user: {
          criteria: { email: 'name@domain.com' }
        }
      };

      User.resendActivation(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'resendActivation'))
                  .respond(500, {ok: false, message: '', data: null });

      var request = {};

      User.resendActivation(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });
  });

  describe('login()', function () {
    it('should make a request to login a user', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'login'))
                  .respond(200, {ok: true, message: 'success', data: {updatedExisting: true, n:1}});

      var request = {
        user: {
          email: 'name@domain.com',
          password: 'fakepassword'
        }
      };

      User.login(request, function (error, request, response) { 
        expect(error).toBe(false);
        expect(response.data).toBeTruthy();
      });

      $httpBackend.flush();
    });

    it('should show a JSON error response on server error', function () {
      $httpBackend.expectPUT(Property.getApi('admin', 'put', 'login'))
                  .respond(500, {ok: false, message: '', data: null });

      var request = {};

      User.login(request, function (error, request, response) { 
        expect(error).toBe(true);
        expect(response.ok).toBe(false);
      });

      $httpBackend.flush();
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});

