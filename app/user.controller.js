(function () {
  'use strict';

  angular.module('cockpit').controller('UserController', UserController);
  
  UserController.$inject = ['User', 'Property'];

  function UserController(User, Property) {
    this.state = {
      name: 'view',
      style: 'primary',
      actionLoading: false,
      submitLoading: false
    };

    this.userList = [];
    this.roleList = Property.getRoles();

    this.toggleAction = function(name) {
      switch(name) {
        case 'view':
          this.getUserList();
          break;
        case 'add':
          this.state.name = 'add';
          this.state.style = 'success';
          break;
        case 'edit':
          this.state.name = 'edit';
          this.state.style = 'warning';
          break;
        case 'remove':
          this.state.name = 'remove';
          this.state.style = 'danger';
          break;
      }
    };

    this.getDisplayName = function() {
      return this.state.name[0].toUpperCase() + this.state.name.substring(1);
    };

    this.getUserList = function () {
      this.toggleActionLoading();
      User.getUserList(null, setUserList.bind(this));

      function setUserList(userList) {
        this.toggleActionLoading();

        this.userList = userList;
        this.state.style = 'primary';
        this.state.name = 'view';
      }
    };

    this.submitAddUser = function () {
      this.toggleSubmitLoading();
      User.getUserList(null, setUserList.bind(this));

      function setUserList(userList) {
        this.toggleSubmitLoading();
        this.userList = userList;
      }
    };

    this.toggleSubmitLoading = function () {
      this.state.submitLoading = !this.state.submitLoading;
    };

    this.toggleActionLoading = function () {
      this.state.actionLoading = !this.state.actionLoading;
    };
  }
}());
