'use strict';

describe('activate.controller', function () {
  var $controller,
      $location,
      $routeParams,
      $timeout,
      User,
      Validate,
      State;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$routeParams_, _$location_, _$timeout_, _User_, 
                             _State_, _Validate_) {
    $routeParams = _$routeParams_;
    $location = _$location_;
    $controller = _$controller_;
    $timeout = _$timeout_;
    User = _User_;
    Validate = _Validate_;
    State = _State_;
  }));
  
  describe('default-state', function () {
    it('should load with a default state', function () {
      var activate = $controller('ActivateController');

      expect(activate.state.submitLoading).toBe(false);
      expect(activate.state.actionLoading).toBe(true);
      
      for(var input in activate.input) {
        expect(activate.input[input]).toBe('');
      }
    });
  });

  describe('init()', function () {
    it('should alert if no email or tempAuth is set on initialization', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.init();

      expect(State.alert).toHaveBeenCalled();
    });

    it('should fetch a pending activation if route params are set', function () {
      var activate = $controller('ActivateController');
      $routeParams.email = 'name@domain.com';
      $routeParams.tempAuth = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

      activate.getPendingActivationComplete.bind = function mockBind () {}; 

      spyOn(User, 'getPendingActivation').and.returnValue(true);

      activate.init();

      expect(User.getPendingActivation).toHaveBeenCalled();
    });
  });

  describe('getPendingActivationComplete()', function () {
    it('should alert if request errors out', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.getPendingActivationComplete(true);
      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert if response indicates invalid parameters given', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.getPendingActivationComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set input properties if route params are valid', function () {
      var activate = $controller('ActivateController');
      $routeParams.email = 'name@domain.com';
      $routeParams.tempAuth = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

      activate.getPendingActivationComplete(false, {}, {ok: true});
      expect(activate.input.email).toBe('name@domain.com');
      expect(activate.input.tempAuth).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    });
  });

  describe('submit()', function () {
    it('should alert if parameters are invalid upon submission', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);
      spyOn(activate, 'validateInput').and.returnValue({error: true});

      activate.submit();

      expect(State.alert).toHaveBeenCalled();
    });

    it('should call User\'s activate() method', function () {
      var activate = $controller('ActivateController');
      spyOn(activate, 'validateInput').and.returnValue({error: false});

      activate.submitComplete.bind = function mockBind () {}; 

      spyOn(User, 'activate').and.returnValue(true);

      activate.submit();

      expect(User.activate).toHaveBeenCalled();
    });
  });

  describe('submitComplete()', function () {
    it('should alert if request errors out', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.submitComplete(true);
      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert if response indicates invalid parameters given', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.submitComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set input properties if route params are valid', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.submitComplete(false, {}, {ok: true});
      expect(State.alert).toHaveBeenCalled();
      $timeout.flush();
    });
  });

  describe('validateInput()', function () {
    it('should test validation failure of input', function () {
      var activate = $controller('ActivateController');
      activate.input.email = 'fake';
      activate.input.passwordNew = 'fake';
      activate.input.passwordConfirm = 'notamatch';

      var result = activate.validateInput();

      expect(result.error).toBe(true);
      expect(typeof result.message).toBe('string');
    });

    it('should alert if response indicates invalid parameters given', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.submitComplete(false, {}, {ok: false});
      expect(State.alert).toHaveBeenCalled();
    });

    it('should set input properties if route params are valid', function () {
      var activate = $controller('ActivateController');
      spyOn(State, 'alert').and.returnValue(true);

      activate.submitComplete(false, {}, {ok: true});
      expect(State.alert).toHaveBeenCalled();
      $timeout.flush();
    });
  });
});
