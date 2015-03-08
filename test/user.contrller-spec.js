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
      var user = $controller('UserController'); 
      
      expect(typeof user.state).toBe('object');
      expect(typeof user.table).toBe('object');
      expect(user.roleList instanceof Array).toBe(true);
    });
  });

  describe('init()', function () {
    it('should startActionWatch and update action to view', function () {
      var user = $controller('UserController'); 
      user.updateAction = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(State, 'startActionWatch').and.returnValue(true); 
      spyOn(user, 'updateAction').and.returnValue(true); 

      user.init();

      expect(State.startActionWatch).toHaveBeenCalled();
      expect(State.startActionWatch.calls.argsFor(0)[0]).toBe('mock bind');
      expect(user.updateAction).toHaveBeenCalled();
      expect(user.updateAction.calls.argsFor(0)[0].action).toBe('view');
    });
  });

  describe('toggleAction()', function () {
    it('should toggle State\'s action if validation passes', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'validateAction').and.returnValue(true); 
      spyOn(State, 'toggleAction').and.returnValue(true); 

      user.toggleAction();
      expect(user.validateAction).toHaveBeenCalled();
      expect(State.toggleAction).toHaveBeenCalled();
    });
  });

  describe('getDisplayTitle()', function () {
    it('should return title based on action appropriate for the panel header', function () {
      var user = $controller('UserController'); 
      
      user.state.action = 'confirm-edit';
      expect(user.getDisplayTitle()).toBe('Confirm Edit ');
    });
  });

  describe('getUserList()', function () {
    it('should fetch a list of users and load the view state', function () {
      var user = $controller('UserController'); 

      user.setUserList = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'get').and.returnValue(true); 

      user.getUserList();

      expect(user.state.style).toBe('primary');
      expect(user.state.action).toBe('view');

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(User.get).toHaveBeenCalled();
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

    it('should set state based on results of successful submit action'); 
  });

  describe('setUserList()', function () {
    it('should set a list of users and toggle loading off');
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

