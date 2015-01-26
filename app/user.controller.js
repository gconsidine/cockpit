(function () {
  'use strict';

  angular.module('cockpit').controller('UserController', UserController);
  
  UserController.$inject = ['State', 'User', 'Property', 'Utility'];

  function UserController(State, User, Property, Utility) {
    this.state = {
      name: 'view',
      style: 'primary',
      actionLoading: false,
      submitLoading: false,
      current: {}
    };

    this.table = {
      id: 'minus',
      email: 'minus',
      createdAt: 'minus',
      role: 'minus',
      status: 'minus'
    };

    this.roleList = Property.getRoles();

    this.userList = [];

    this.init = function () {
      this.toggleAction('view');
    };

    this.toggleAction = function(name, user) {
      State.alert(false);

      switch(name) {
        case 'view':
          this.getUserList();
          break;
        case 'add':
          this.state.current = {};
          this.state.name = 'add';
          this.state.style = 'success';
          break;
        case 'confirm-add':
          this.confirmAdd();
          break;
        case 'edit':
          this.getEditList();
          break;
        case 'confirm-edit':
          this.confirmEdit(user);
          break;
        case 'remove':
          this.getRemoveList();
          break;
        case 'confirm-remove':
          this.confirmRemove(user);
          break;
      }
    };

    this.getDisplayTitle = function() {
      var parts = this.state.name.split('-'),
          title = '';

      for(var i = 0; i < parts.length; i++) {
        title += parts[i][0].toUpperCase() + parts[i].substring(1) + ' '; 
      }

      if(title.indexOf('Confirm') === -1 ) {
        return title + 'Users';
      }

      return title;
    };

    this.getUserList = function () {
      this.toggleActionLoading();
      User.getUserList(null, this.setUserList.bind(this));

      this.state.style = 'primary';
      this.state.name = 'view';
    };

    this.getEditList = function () {
      this.toggleActionLoading();
      User.getUserList(null, this.setUserList.bind(this));

      this.state.style = 'warning';
      this.state.name = 'edit';
    };

    this.getRemoveList = function () {
      this.toggleActionLoading();
      User.getUserList(null, this.setUserList.bind(this));

      this.state.style = 'danger';
      this.state.name = 'remove';
    };

    this.setUserList = function (userList) {
      this.toggleActionLoading();
      this.userList = userList;
    };

    this.confirmAdd = function () {
      //TODO: validate input

      this.state.name = 'confirm-add';
      this.state.style = 'success';
    };

    this.confirmEdit = function (user) {
      //TODO: validate input

      this.state.current = user;
      this.state.name = 'confirm-edit';
      this.state.style = 'warning';
    };

    this.confirmRemove = function (user) {
      //TODO: validate input

      this.state.current = user;
      this.state.name = 'confirm-remove';
      this.state.style = 'danger';
    };

    this.submitAddUser = function () {
      this.toggleSubmitLoading();
      User.addUser(null, wrapUp.bind(this));

      function wrapUp(error, request, response) {
        this.toggleSubmitLoading();

        if(error) {
          State.alert(true, 'danger', 'Unable to add user.  Please try again later.');
          console.log(request, response);
          return;
        }

        State.alert(true, 'success', 'Activation email sent.');
      }
    };

    this.submitEditUser = function () {
      this.toggleSubmitLoading();
      User.addUser(null, wrapUp.bind(this));

      function wrapUp(error, request, response) {
        this.toggleSubmitLoading();

        if(error) {
          State.alert(true, 'danger', 'Unable to edit user.  Please try again later.');
          console.log(request, response);
          return;
        }

        State.alert(true, 'success', 'User successfully edited');
        this.state.name = 'edit';
        this.state.style = 'warning';
      }
    };

    this.submitRemoveUser = function () {
      this.toggleSubmitLoading();
      User.addUser(null, wrapUp.bind(this));

      function wrapUp(error, request, response) {
        this.toggleSubmitLoading();

        if(error) {
          State.alert(true, 'danger', 'Unable to remove user.  Please try again later.');
          console.log(request, response);
          return;
        }

        State.alert(true, 'success', 'User successfully removed');
        this.state.name = 'remove';
        this.state.style = 'danger';
      }
    };

    this.toggleSubmitLoading = function () {
      this.state.submitLoading = !this.state.submitLoading;
    };

    this.toggleActionLoading = function () {
      this.state.actionLoading = !this.state.actionLoading;
    };

    this.sortTable = function (key) {
      Utility.sortTable.call(this, this.userList, this.table, key);
    };
  }
}());
