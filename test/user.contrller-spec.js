'use strict';

describe('user.controller', function () {
  var $controller,
      $rootScope,
      User,
      Property,
      Utility,
      State;

  beforeEach(module('cockpit'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _Property_, _Utility_, _User_, _State_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    Utility = _Utility_;
    User = _User_;
    Property = _Property_;
    State = _State_;

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
    it('should fetch a list of users and load the view state');
    /*
    it('should fetch a list of users and load the view state', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'getUserList').and.returnValue(true); 

      user.getUserList(user);

      expect(user.state.style).toBe('primary');
      expect(user.state.name).toBe('view');

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(User.getUserList).toHaveBeenCalled();
    });
    */
  });

  describe('getEditList()', function () {
    it('should fetch a list of users and load the edit state');
    /*
    it('should fetch a list of users and load the edit state', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'getUserList').and.returnValue(true); 

      user.getEditList();

      expect(user.state.style).toBe('warning');
      expect(user.state.name).toBe('edit');

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(User.getUserList).toHaveBeenCalled();
    });
    */
  });

  describe('getRemoveList()', function () {
    it('should fetch a list of users and load the remove state');
    /*
    it('should fetch a list of users and load the remove state', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 
      spyOn(User, 'getUserList').and.returnValue(true); 

      user.getRemoveList();

      expect(user.state.style).toBe('danger');
      expect(user.state.name).toBe('remove');

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(User.getUserList).toHaveBeenCalled();
    });
    */
  });

  describe('submitAddUser()', function () {
    it('should add a user and callback the success of the operation');
  });

  describe('submitEditUser()', function () {
    it('should edit a user and callback the success of the operation');
  });

  describe('submitRemoveUser()', function () {
    it('should remove a user and callback the success of the operation');
  });

  describe('setUserList()', function () {
    it('should set a list of users and toggle loading off', function () {
      var user = $controller('UserController'); 

      spyOn(user, 'toggleActionLoading').and.returnValue(true); 

      user.setUserList([{name: 'corwin'}]);

      expect(user.toggleActionLoading).toHaveBeenCalled();
      expect(user.userList[0].name).toBe('corwin');
    });
  });

  describe('confirmAdd()', function () {
    it('should set state values to mainpulate view for add confirmation', function () {
      var user = $controller('UserController'); 
      
      user.confirmAdd();

      expect(user.state.name).toBe('confirm-add');
      expect(user.state.style).toBe('success');
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

  describe('confirmEdit()', function () {
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

});

