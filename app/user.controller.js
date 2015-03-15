(function () {
  'use strict';

  angular.module('cockpit').controller('UserController', UserController);
  UserController.$inject = ['State', 'User', 'Property', 'Utility', 'Validate'];

  function UserController(State, User, Property, Utility, Validate) {
    var vm = this || {};

    vm.state = {
      action: 'view',
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

    vm.context = {
      view: 'primary',
      add: 'success',
      edit: 'warning',
      remove: 'danger',
      'confirm-add': 'success',
      'confirm-edit': 'warning',
      'confirm-remove': 'danger',
      'resend-activation': 'default'
    };

    vm.roleList = [];
    vm.userList = [];

    vm.init = function () {
      State.startActionWatch(this.updateAction.bind(this));

      vm.roleList = Property.getRoles();
      vm.updateAction({ action: 'view' });
    };

    vm.toggleAction = function (action, userIndex) {
      if(vm.validateAction(action, userIndex)) {
        State.toggleAction({
          action: action, 
          userIndex: userIndex
        });
      }
    };

    vm.validateAction = function (action) {
      switch(action) {
        case 'confirm-add':
          return vm.validateCurrentUser();
      }

      return true;
    };

    vm.updateAction = function (params) {
      var action = params.action,
          userIndex = params.userIndex;

      vm.state.action = action;
      vm.state.style = vm.context[action];

      switch(action) {
        case 'view':
        case 'remove':
        case 'edit':
          vm.getUserList();
          break;
        case 'add':
          vm.state.current = {};
          break;
        case 'confirm-edit':
        case 'confirm-remove':
          vm.state.current = vm.userList[userIndex];
          break;
        case 'confirm-add':
        case 'resend-activation':
          break;
        default:
          vm.updateAction({ action: 'view' });
          break;
      }
    };

    vm.resendActivation = function () {
      vm.toggleSubmitLoading();

      var request = {
        user: { email: vm.state.current.email }
      };

      User.resendActivation(request, vm.resendActivationComplete.bind(vm));
    };

    vm.resendActivationComplete = function (error, request, response) {
      if(error) {
        State.alert(true, 'danger', 'Unable to send.  Please try again later.');
        return;
      }

      if(!response.ok) {
        State.alert(true, 'danger', response.message);
        return;
      }
      
      vm.toggleSubmitLoading();
      State.alert(true, 'success', response.message);
    };

    vm.getDisplayTitle = function() {
      var parts = vm.state.action.split('-'),
          title = '';

      for(var i = 0; i < parts.length; i++) {
        title += parts[i][0].toUpperCase() + parts[i].substring(1) + ' '; 
      }

      return title;
    };

    vm.getUserList = function () {
      vm.toggleActionLoading();
      User.get({user: {}}, vm.setUserList.bind(vm));
    };

    vm.setUserList = function (error, request, response) {
      vm.toggleActionLoading();

      var loggedInUser = State.getLoggedInUser();

      if(error) {
        State.alert(true, 'danger', 'Unable to retrieve user list.  Please try again later.');
        return;
      }

      for(var i = 0; i < response.data.length; i++) {
        if(response.data[i].email === loggedInUser.email) {
          response.data.splice(i, 1);
        }
      }

      vm.userList = response.data;
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
      User.create(request, vm.setSubmitResult.bind(vm));
    };

    vm.submitEditUser = function () {
      if(!vm.validateCurrentUser()) {
        return false;
      }

      var request = {
        user: {
          criteria: { email: vm.state.current.email },
          update: { role: vm.state.current.role }
        },
        type: 'edit'
      };

      vm.toggleSubmitLoading();
      User.edit(request, vm.setSubmitResult.bind(vm));
    };

    vm.submitRemoveUser = function () {
      var request = {
        user: {
          email: vm.state.current.email
        },
        type: 'remove'
      };

      vm.toggleSubmitLoading();
      User.remove(request, vm.setSubmitResult.bind(vm));
    };

    vm.setSubmitResult = function (error, request, response) {
      vm.toggleSubmitLoading();

      if(error) {
        State.alert(true, 'danger', 'Unable to '+ request.type +' user.  Please try again later.');
        return;
      }

      if(!response.ok) {
        State.alert(true, 'danger', response.message);
        return;
      }

      vm.state.current = {};
      vm.toggleAction(request.type);
      State.alert(true, 'success', response.message);
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
