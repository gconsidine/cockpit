(function () {
  'use strict';

  angular.module('cockpit').controller('UserController', UserController);
  
  UserController.$inject = ['State', 'User', 'Property', 'Utility', 'Validate'];

  function UserController(State, User, Property, Utility, Validate) {
    var vm = this || {};

    vm.state = {
      name: 'view',
      style: 'primary',
      actionLoading: false,
      submitLoading: false,
      current: {}
    };

    vm.table = {
      id: 'minus',
      email: 'minus',
      createdAt: 'minus',
      role: 'minus',
      status: 'minus'
    };

    vm.roleList = Property.getRoles();

    vm.userList = [];

    vm.init = function () {
      vm.toggleAction('view');
    };

    vm.toggleAction = function(name, user) {
      State.alert(false);

      switch(name) {
        case 'view':
          vm.getUserList();
          break;
        case 'add':
          vm.state.current = {};
          vm.state.name = 'add';
          vm.state.style = 'success';
          break;
        case 'confirm-add':
          vm.confirmAdd();
          break;
        case 'edit':
          vm.getEditList();
          break;
        case 'confirm-edit':
          vm.confirmEdit(user);
          break;
        case 'remove':
          vm.getRemoveList();
          break;
        case 'confirm-remove':
          vm.confirmRemove(user);
          break;
      }
    };

    vm.getDisplayTitle = function() {
      var parts = vm.state.name.split('-'),
          title = '';

      for(var i = 0; i < parts.length; i++) {
        title += parts[i][0].toUpperCase() + parts[i].substring(1) + ' '; 
      }

      if(title.indexOf('Confirm') === -1 ) {
        return title + 'Users';
      }


      return title;
    };

    vm.getUserList = function () {
      vm.toggleActionLoading();
      User.getUsers({}, vm.setUserList.bind(vm));

      vm.state.style = 'primary';
      vm.state.name = 'view';
    };

    vm.getEditList = function () {
      vm.toggleActionLoading();
      User.getUsers({}, vm.setUserList.bind(vm));

      vm.state.style = 'warning';
      vm.state.name = 'edit';
    };

    vm.getRemoveList = function () {
      vm.toggleActionLoading();
      User.getUsers({}, vm.setUserList.bind(vm));

      vm.state.style = 'danger';
      vm.state.name = 'remove';
    };

    vm.setUserList = function (error, request, response) {
      vm.toggleActionLoading();

      if(error) {
        State.alert(true, 'danger', 'Unable to retrieve user list.  Please try again later.');
        return;
      }

      vm.userList = response;
    };

    vm.confirmAdd = function () {
      if(!vm.validateCurrentUser()) {
        return false;
      }

      vm.state.name = 'confirm-add';
      vm.state.style = 'success';
    };

    vm.confirmEdit = function (user) {
      vm.state.current = user;
      vm.state.name = 'confirm-edit';
      vm.state.style = 'warning';
    };

    vm.confirmRemove = function (user) {
      vm.state.current = user;
      vm.state.name = 'confirm-remove';
      vm.state.style = 'danger';
    };

    vm.submitAddUser = function () {
      var request = {
        user: {
          name: vm.state.current.name,
          email: vm.state.current.email,
          role: vm.state.current.role
        },
        type: 'add'
      };

      vm.toggleSubmitLoading();
      User.addUser(request, vm.setSubmitResult.bind(vm));
    };

    vm.submitEditUser = function () {
      if(!vm.validateCurrentUser()) {
        return false;
      }

      // TODO: temporary request object
      var request = {type: 'edit'};

      vm.toggleSubmitLoading();
      User.addUser(request, vm.setSubmitResult.bind(vm));
    };

    vm.submitRemoveUser = function () {
      // TODO: temporary request object
      var request = {
        type: 'remove'       
      };

      vm.toggleSubmitLoading();
      User.addUser(request, vm.setSubmitResult.bind(vm));
    };

    vm.setSubmitResult = function (error, request) {
      vm.toggleSubmitLoading();

      if(error) {
        switch(request.type) {
          case 'add':
            State.alert(true, 'danger', 'Unable to add user.  Please try again later.');
            break;
          case 'edit':
            State.alert(true, 'danger', 'Unable to edit user.  Please try again later.');
            break;
          case 'remove':
            State.alert(true, 'danger', 'Unable to remove user.  Please try again later.');
            break;
        }

        return;
      }

      vm.state.current = {};

      switch(request.type) {
        case 'add':
          State.alert(true, 'success', 'Activation email sent.');
          vm.state.name = 'add';
          vm.state.style = 'success';
          break;
        case 'edit':
          State.alert(true, 'success', 'User successfully edited');
          vm.state.name = 'edit';
          vm.state.style = 'warning';
          break;
        case 'remove':
          State.alert(true, 'success', 'User successfully removed');
          vm.state.name = 'remove';
          vm.state.style = 'danger';
          break;
      }
    };

    vm.toggleSubmitLoading = function () {
      vm.state.submitLoading = !vm.state.submitLoading;
    };

    vm.toggleActionLoading = function () {
      vm.state.actionLoading = !vm.state.actionLoading;
    };

    vm.sortTable = function (key) {
      Utility.sortTable.call(vm, vm.userList, vm.table, key);
    };

    vm.validateCurrentUser = function () {
      if(!Validate.isEmail(vm.state.current.email) || !Validate.isName(vm.state.current.name) ||
         !Validate.isRole(vm.state.current.role)) {

         State.alert(true, 'warning', 'Please make sure your input is valid');
         return false;
      }

      return true;
    };
  }
}());
