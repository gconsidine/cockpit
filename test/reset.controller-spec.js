'use strict';

describe('reset.controller', function () {
  var $controller,
      $location,
      $routeParams,
      $timeout,
      Admin,
      Validate,
      State;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$routeParams_, _$location_, _$timeout_, _Admin_, 
                             _State_, _Validate_) {
    $routeParams = _$routeParams_;
    $location = _$location_;
    $controller = _$controller_;
    $timeout = _$timeout_;
    Admin = _Admin_;
    Validate = _Validate_;
    State = _State_;
  }));
  
  describe('default-state', function () {
    it('should load with a default state', function () {
      var reset = $controller('ResetController');
      
      for(var input in reset.input) {
        expect(reset.input[input]).toBe('');
      }

      for(var property in reset.state) {
        expect(reset.state[property]).toBe(false);
      }
    });
  });

  describe('init()', function () {
    it('should set inputs if present in route params', function () {
      var reset = $controller('ResetController');
      $routeParams.email = 'aphex@twin.com';
      $routeParams.tempAuth = 'aaaaaaaaffffffff';

      spyOn(reset, 'getPending').and.returnValue(true);

      reset.init();

      expect(reset.getPending).toHaveBeenCalled();
      expect(reset.input.email).toBe('aphex@twin.com');
      expect(reset.input.tempAuth).toBe('aaaaaaaaffffffff');
    });

    it('should set state if no route params are present', function () {
      var reset = $controller('ResetController');
      $routeParams.email = undefined;
      $routeParams.tempAuth = undefined;

      reset.init();

      expect(reset.state.request).toBe(true);
    });
  });

  describe('request()', function () {
    it('should alert if email is invalid', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.input.email = 'fake';

      reset.request();

      expect(State.alert).toHaveBeenCalled();
    });

    it('should call out to resetRequest if email is valid', function () {
      var reset = $controller('ResetController');
      reset.input.email = 'amun@dragoon.com';

      spyOn(Admin, 'resetRequest').and.returnValue(true);
      reset.requestComplete.bind = function mockBind () {}; 

      reset.request();

      expect(Admin.resetRequest).toHaveBeenCalled();
    });
  });

  describe('requestComplete()', function () {
    it('should alert if request errors out', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.requestComplete(true);
      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert if response indicates invalid parameters given', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.requestComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set input properties if route params are valid', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.requestComplete(false, {}, {ok: true});
      expect(State.alert).toHaveBeenCalled();
      expect(reset.state.sent).toBe(true);
    });
  });

  describe('getPending()', function () {
    it('should set state, validate, and request pending reset', function () {
      var reset = $controller('ResetController');
      reset.input.email = 'fake';

      spyOn(State, 'alert').and.returnValue(true);

      reset.getPending();

      expect(State.alert).toHaveBeenCalled();
    });

    it('get pending reset if parameters are valid', function () {
      var reset = $controller('ResetController');
      reset.input.email = 'topaz@gang.com';
      reset.input.tempAuth = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      
      spyOn(Admin, 'getPendingReset').and.returnValue(true);
      reset.getPendingComplete.bind = function mockBind () {}; 

      reset.getPending();

      expect(Admin.getPendingReset).toHaveBeenCalled();
    });
  });

  describe('getPendingComplete()', function () {
    it('should alert if request errors out', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.getPendingComplete(true);
      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert if response indicates invalid parameters given', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.getPendingComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set state process to true if response is a success', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.getPendingComplete(false, {}, {ok: true});
      expect(reset.state.process).toBe(true);
    });
  });

  describe('submit()', function () {
    it('should alert if parameters are invalid upon submission', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);
      spyOn(reset, 'validateInput').and.returnValue({error: true});

      reset.submit();

      expect(State.alert).toHaveBeenCalled();
    });

    it('should call Admin\'s reset() method', function () {
      var reset = $controller('ResetController');
      spyOn(reset, 'validateInput').and.returnValue({error: false});

      reset.submitComplete.bind = function mockBind () {}; 

      spyOn(Admin, 'reset').and.returnValue(true);

      reset.submit();

      expect(Admin.reset).toHaveBeenCalled();
    });
  });

  describe('submitComplete()', function () {
    it('should alert if request errors out', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.submitComplete(true);
      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert if response indicates invalid parameters given', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.submitComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set input properties if route params are valid', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.submitComplete(false, {}, {ok: true});
      expect(State.alert).toHaveBeenCalled();
      $timeout.flush();
    });
  });

  describe('validateInput()', function () {
    it('should test validation failure of input', function () {
      var reset = $controller('ResetController');
      reset.input.email = 'fake';
      reset.input.passwordNew = 'fake';
      reset.input.passwordConfirm = 'notamatch';

      var result = reset.validateInput();

      expect(result.error).toBe(true);
      expect(typeof result.message).toBe('string');
    });

    it('should alert if response indicates invalid parameters given', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.submitComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set input properties if route params are valid', function () {
      var reset = $controller('ResetController');
      spyOn(State, 'alert').and.returnValue(true);

      reset.submitComplete(false, {}, {ok: true});
      expect(State.alert).toHaveBeenCalled();
      $timeout.flush();
    });
  });

});

