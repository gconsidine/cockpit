'use strict';

describe('user.controller', function () {
  var $controller,
      $rootScope,
      User,
      Property,
      Utility,
      State,
      Validate;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _Property_, _Utility_, _User_, _State_,
                             _Validate_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    Utility = _Utility_;
    User = _User_;
    Property = _Property_;
    State = _State_;
    Validate = _Validate_;

    Property.getRoles = function () {
      return ['merchant', 'blacksmith', 'alchemist'];
    };
  }));

  describe('default-state', function () {
    it('should initialize with proper defaults', function () {
      var vm = $controller('UserController'); 
      
      expect(typeof vm.state).toBe('object');
      expect(typeof vm.table).toBe('object');
      expect(typeof vm.context).toBe('object');
      expect(vm.roleList instanceof Array).toBe(true);
      expect(vm.userList instanceof Array).toBe(true);
    });
  });

  describe('init()', function () {
    it('should startActionWatch and update action to view', function () {
      var vm = $controller('UserController'); 
      vm.updateAction = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(State, 'startActionWatch').and.returnValue(true); 
      spyOn(vm, 'updateAction').and.returnValue(true); 

      vm.init();

      expect(State.startActionWatch).toHaveBeenCalled();
      expect(State.startActionWatch.calls.argsFor(0)[0]).toBe('mock bind');
      expect(vm.updateAction).toHaveBeenCalled();
      expect(vm.updateAction.calls.argsFor(0)[0].action).toBe('view');
    });
  });

  describe('toggleAction()', function () {
    it('should toggle State\'s action if validation passes', function () {
      var vm = $controller('UserController'); 

      spyOn(vm, 'validateAction').and.returnValue(true); 
      spyOn(State, 'toggleAction').and.returnValue(true); 

      vm.toggleAction();
      expect(vm.validateAction).toHaveBeenCalled();
      expect(State.toggleAction).toHaveBeenCalled();
    });
  });

  describe('validateAction()', function () {
    it('should validate an action based on its name', function () {
      var vm = $controller('UserController'); 

      spyOn(vm, 'validateCurrentUser').and.returnValue(true); 
      vm.validateAction('confirm-add');
      expect(vm.validateCurrentUser).toHaveBeenCalled();
    });

    it('should return true if no validation is necessary on an action state', function () {
      var vm = $controller('UserController'); 

      spyOn(vm, 'validateCurrentUser').and.returnValue(true); 
      expect(vm.validateAction()).toBe(true);
    });
  });

  describe('updateAction()', function () {
    it('should call methods to update action state where applicable', function () {
      var vm = $controller('UserController'); 

      spyOn(vm, 'getUserList').and.returnValue(true); 
      vm.updateAction({action: 'view'});
      expect(vm.getUserList).toHaveBeenCalled();

      vm.updateAction({action: 'add'});
      expect(JSON.stringify(vm.state.current)).toBe('{}');

      vm.userList = [{name: 'merlin'}];
      vm.updateAction({action: 'confirm-edit', userIndex: 0});
      expect(vm.state.current.name).toBe('merlin');

      vm.updateAction({action: 'confirm-add'});
    });

    it('should default to the view action if no other case is matched', function () {
      var vm = $controller('UserController'); 

      spyOn(vm, 'getUserList').and.returnValue(true); 
      spyOn(vm, 'updateAction').and.callThrough(); 

      vm.updateAction({action: 'fake'});

      expect(vm.updateAction.calls.count()).toBe(2);
      expect(vm.updateAction.calls.argsFor(0)[0].action).toBe('fake');
      expect(vm.updateAction.calls.argsFor(1)[0].action).toBe('view');
    });
  });

  describe('resendActivation()', function () {
    it('should toggle the view to a loading state', function () {
      var vm = $controller('UserController'); 

      vm.resendActivationComplete = {
        bind: function () { return 'mock-bind';}
      };

      spyOn(User, 'resendActivation').and.returnValue(true); 
      spyOn(vm, 'toggleSubmitLoading').and.returnValue(true); 

      vm.resendActivation();
      expect(vm.toggleSubmitLoading).toHaveBeenCalled();
      expect(User.resendActivation).toHaveBeenCalled();
    });
  });

  describe('resendActivationComplete()', function () {
    it('should alert an error when call fails', function () {
      var vm = $controller('UserController'); 

      spyOn(State, 'alert').and.returnValue(true);

      vm.resendActivationComplete(true);
      expect(State.alert.calls.argsFor(0)[0]).toBe(true);
    });

    it('should alret an error if response is not ok', function () {
      var vm = $controller('UserController'); 

      spyOn(State, 'alert').and.returnValue(true);

      vm.resendActivationComplete(false, {}, {ok: false, message: 'mock-response'});
      expect(State.alert.calls.argsFor(0)[0]).toBe(true);
      expect(State.alert.calls.argsFor(0)[2]).toBe('mock-response');
    });

    it('should toggle off loading state and alert success', function () {
      var vm = $controller('UserController'); 

      spyOn(State, 'alert').and.returnValue(true);
      spyOn(vm, 'toggleSubmitLoading').and.returnValue(true); 

      vm.resendActivationComplete(false, {}, {ok: true, message: 'mock-response'});

      expect(vm.toggleSubmitLoading).toHaveBeenCalled();
      expect(State.alert.calls.argsFor(0)[0]).toBe(true);
      expect(State.alert.calls.argsFor(0)[1]).toBe('success');
    });
  });

  describe('getDisplayTitle()', function () {
    it('should return title based on action appropriate for the panel header', function () {
      var vm = $controller('UserController'); 
      
      vm.state.action = 'confirm-edit';
      expect(vm.getDisplayTitle()).toBe('Confirm Edit ');
    });
  });

  describe('getUserList()', function () {
    it('should fetch a list of users and load the view state', function () {
      var vm = $controller('UserController'); 

      vm.setUserList = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'get').and.returnValue(true); 

      vm.getUserList();

      expect(vm.state.style).toBe('primary');
      expect(vm.state.action).toBe('view');

      expect(vm.toggleActionLoading).toHaveBeenCalled();
      expect(User.get).toHaveBeenCalled();
    });
  });

  describe('setUserList()', function () {
    it('should toggle loading state off and set logged-in user', function () {
      var vm = $controller('UserController'); 
      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(State, 'getLoggedInUser').and.returnValue(true); 

      vm.setUserList(true);

      expect(State.getLoggedInUser).toHaveBeenCalled();
      expect(vm.toggleActionLoading).toHaveBeenCalled();
    });

    it('should alert error if error is present', function () {
      var vm = $controller('UserController'); 
      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(State, 'getLoggedInUser').and.returnValue(true); 
      spyOn(State, 'alert').and.returnValue(true);

      vm.setUserList(true);

      expect(State.alert).toHaveBeenCalled();
    });

    it('should loop through user list and remove the logged-in user', function () {
      var vm = $controller('UserController'); 
      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(State, 'getLoggedInUser').and.returnValue({email: 'brand@amber.com'}); 

      vm.setUserList(false, {}, { ok: true, message: '', data: [
        {email: 'brand@amber.com'},
        {email: 'gerard@amber.com'},
        {email: 'corwin@amber.com'}
      ]});
      
      expect(vm.userList.length).toBe(2);
    });
  });

  describe('setSubmitResult()', function () {
    it('should alert if call errors out', function () {
      var vm = $controller('UserController'); 
      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(State, 'alert').and.returnValue(true);

      vm.setSubmitResult(true, {type: 'add'});

      expect(State.alert).toHaveBeenCalled();
    });

    it('should alert if response indicates an unsuccessful attempt', function () {
      var vm = $controller('UserController'); 
      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(State, 'getLoggedInUser').and.returnValue(true); 
      spyOn(State, 'alert').and.returnValue(true);

      vm.setSubmitResult(true, {}, {ok: false});

      expect(State.alert).toHaveBeenCalled();
    });

    it('should clear the current user and toggle the request type\'s action', function () {
      var vm = $controller('UserController'); 
      spyOn(vm, 'toggleActionLoading').and.returnValue(true); 
      spyOn(vm, 'toggleAction').and.returnValue(true); 
      spyOn(State, 'getLoggedInUser').and.returnValue(true); 
      spyOn(State, 'alert').and.returnValue(true);

      vm.setSubmitResult(false, {type: 'add'}, {ok: true});

      expect(vm.toggleAction).toHaveBeenCalled();
      expect(State.alert).toHaveBeenCalled();
    });

  });

  describe('submitAddUser()', function () {
    it('should add a user and callback the success of the operation', function () {
      var user = $controller('UserController'); 

      user.setSubmitResult = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(user, 'toggleSubmitLoading').and.returnValue(true); 
      spyOn(User, 'create').and.returnValue(true); 
      
      user.submitAddUser();

      expect(user.toggleSubmitLoading).toHaveBeenCalled();
      expect(User.create).toHaveBeenCalled();
    });
  });

  describe('submitEditUser()', function () {
    it('should edit a valid user and callback the success of the operation', function () {
      var user = $controller('UserController'); 

      user.state.current.name = 'corwin';
      user.state.current.email = 'corwin@amberites.com';
      user.state.current.role = 'Amberite';

      user.setSubmitResult = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(user, 'toggleSubmitLoading').and.returnValue(true); 
      spyOn(User, 'edit').and.returnValue(true); 
      
      user.submitEditUser();

      expect(user.toggleSubmitLoading).toHaveBeenCalled();
      expect(User.edit).toHaveBeenCalled();
    });

    it('should not edit an invalid current and set an alert', function () {
      var user = $controller('UserController'); 

      user.state.current.name = 'julian';
      user.state.current.email = 'i-have-a-steel-pony-thing';
      user.state.current.role = 'Amberite';

      user.submitEditUser();

      expect(user.validateCurrentUser()).toBe(false);

    });
  });

  describe('submitRemoveUser()', function () {
    it('should remove a user and callback the success of the operation', function () {
      var user = $controller('UserController'); 

      user.setSubmitResult = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(user, 'toggleSubmitLoading').and.returnValue(true); 
      spyOn(User, 'remove').and.returnValue(true); 
      
      user.submitRemoveUser();

      expect(user.toggleSubmitLoading).toHaveBeenCalled();
      expect(User.remove).toHaveBeenCalled();
    });
  });

  describe('setSubmitResult()', function () {
    it('should set state based on results of failed submit action', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleSubmitLoading').and.returnValue(true); 
      spyOn(State, 'alert').and.returnValue(true); 
      
      user.setSubmitResult(true, {type: 'add'}, {ok: true});
      expect(user.toggleSubmitLoading).toHaveBeenCalled();
      expect(State.alert.calls.allArgs()[0][0]).toBe(true);
      expect(State.alert.calls.allArgs()[0][1]).toBe('danger');
      expect(State.alert.calls.allArgs()[0][2]).toMatch(/add/);

      user.setSubmitResult(true, {type: 'edit'},  {ok: true});
      expect(user.toggleSubmitLoading).toHaveBeenCalled();
      expect(State.alert.calls.allArgs()[1][0]).toBe(true);
      expect(State.alert.calls.allArgs()[1][1]).toBe('danger');
      expect(State.alert.calls.allArgs()[1][2]).toMatch(/edit/);

      user.setSubmitResult(true, {type: 'remove'}, {ok: true});
      expect(user.toggleSubmitLoading).toHaveBeenCalled();
      expect(State.alert.calls.allArgs()[2][0]).toBe(true);
      expect(State.alert.calls.allArgs()[2][1]).toBe('danger');
      expect(State.alert.calls.allArgs()[2][2]).toMatch(/remove/);
    });
  });

  describe('toggleSubmitLoading()', function () {
    it('should toggle the boolean flag representing a submit loading state', function () {
      var user = $controller('UserController'); 
      
      expect(user.state.submitLoading).toBe(false);
      user.toggleSubmitLoading();
      expect(user.state.submitLoading).toBe(true);
    });
  });

  describe('toggleActionLoading()', function () {
    it('should toggle the boolean flag representing an action loading state', function () {
      var user = $controller('UserController'); 
      
      expect(user.state.actionLoading).toBe(false);
      user.toggleActionLoading();
      expect(user.state.actionLoading).toBe(true);
    });
  });

  describe('sortTable()', function () {
    it('should call Utility\'s sortTable()', function () {
      var user = $controller('UserController'); 
      
      spyOn(Utility, 'sortTable').and.returnValue(true);

      user.sortTable();

      expect(Utility.sortTable).toHaveBeenCalled();
    });
  });

  describe('validateCurrentUser()', function () {
    it('should loosely validate a good email, name, and role', function () {
      var user = $controller('UserController'); 

      user.state.current.name = 'Brand';
      user.state.current.email = 'Brand@amberites.com';
      user.state.current.role = 'amberite';
      
      spyOn(Validate, 'isEmail').and.returnValue(true); 
      spyOn(Validate, 'isName').and.returnValue(true); 
      spyOn(Validate, 'isRole').and.returnValue(true); 

      expect(user.validateCurrentUser()).toBe(true);
    });

    it('should reject a bad email, name, or role and set an alert', function () {
      var user = $controller('UserController'); 

      user.state.current.name = 'Julian';
      user.state.current.email = '';
      user.state.current.role = '';
      
      spyOn(Validate, 'isEmail').and.returnValue(true); 
      spyOn(Validate, 'isName').and.returnValue(false); 
      spyOn(Validate, 'isRole').and.returnValue(false); 

      spyOn(State, 'alert').and.returnValue(true); 

      expect(user.validateCurrentUser()).toBe(false);
      expect(State.alert).toHaveBeenCalled();
    });

  });

});

