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
    it('should call toggleAction with "view list" default', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleAction').and.returnValue(true); 

      user.init();

      expect(user.toggleAction).toHaveBeenCalled();
    });
  });

  describe('toggleAction()', function () {
    it('should load the appropriate state based on state name and user', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'getUserList').and.returnValue(true); 
      spyOn(user, 'confirmAdd').and.returnValue(true); 
      spyOn(user, 'getEditList').and.returnValue(true); 
      spyOn(user, 'confirmEdit').and.returnValue(true); 
      spyOn(user, 'getRemoveList').and.returnValue(true); 
      spyOn(user, 'confirmRemove').and.returnValue(true); 

      user.init();

      user.toggleAction('view');
      expect(user.getUserList).toHaveBeenCalled();

      user.toggleAction('add');
      expect(typeof user.state.current === 'object').toBe(true);
      expect(user.state.name === 'add').toBe(true);
      expect(user.state.style === 'success').toBe(true);

      user.toggleAction('confirm-add');
      expect(user.confirmAdd).toHaveBeenCalled();

      user.toggleAction('edit');
      expect(user.getEditList).toHaveBeenCalled();

      user.toggleAction('confirm-edit');
      expect(user.confirmEdit).toHaveBeenCalled();

      user.toggleAction('remove');
      expect(user.getRemoveList).toHaveBeenCalled();

      user.toggleAction('confirm-remove');
      expect(user.confirmRemove).toHaveBeenCalled();
    });
  });

  describe('getDisplayTitle()', function () {
    it('should return title based on action appropriate for the panel header', function () {
      var user = $controller('UserController'); 
      
      user.state.name = 'view';
      expect(user.getDisplayTitle()).toBe('View Users');

      user.state.name = 'confirm-edit';
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
      expect(user.state.name).toBe('view');

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(User.get).toHaveBeenCalled();
    });
  });

  describe('getEditList()', function () {
    it('should fetch a list of users and load the edit state', function () {
      var user = $controller('UserController'); 

      user.setUserList = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'get').and.returnValue(true); 

      user.getEditList();

      expect(user.state.style).toBe('warning');
      expect(user.state.name).toBe('edit');

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(User.get).toHaveBeenCalled();
    });
  });

  describe('getRemoveList()', function () {
    it('should fetch a list of users and load the remove state', function () {
      var user = $controller('UserController'); 

      user.setUserList = {
        bind: function () { return 'mock bind'; }
      };

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'get').and.returnValue(true); 

      user.getRemoveList();

      expect(user.state.style).toBe('danger');
      expect(user.state.name).toBe('remove');

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

  describe('confirmAdd()', function () {
    it('should set state values to mainpulate view for add confirmation', function () {
      var user = $controller('UserController'); 

      user.state.current.name = 'Brand';
      user.state.current.email = 'Brand@amberites.com';
      user.state.current.role = 'amberite';

      user.confirmAdd();

      expect(user.state.name).toBe('confirm-add');
      expect(user.state.style).toBe('success');
    });

    it('should keep current state if current user is invalid', function () {
      var user = $controller('UserController'); 

      user.state.current.name = '!!!';
      user.state.current.email = 'julian-strikes-again';
      user.state.current.role = 'amberite';

      user.confirmAdd();

      expect(user.state.name).not.toBe('confirm-add');
      expect(user.state.style).not.toBe('success');
    });

  });

  describe('confirmEdit()', function () {
    it('should set state values to mainpulate view for edit confirmation', function () {
      var user = $controller('UserController'); 
      
      var userObject = {
        name: 'Bleys',
        email: 'bleys@amber.com'
      };

      user.confirmEdit(userObject);

      expect(user.state.current.name).toBe('Bleys');
      expect(user.state.name).toBe('confirm-edit');
      expect(user.state.style).toBe('warning');
    });
  });

  describe('confirmRemove()', function () {
    it('should set state values to mainpulate view for remove confirmation', function () {
      var user = $controller('UserController'); 
      
      var userObject = {
        name: 'Bleys',
        email: 'bleys@amber.com'
      };

      user.confirmRemove(userObject);

      expect(user.state.current.name).toBe('Bleys');
      expect(user.state.name).toBe('confirm-remove');
      expect(user.state.style).toBe('danger');
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

