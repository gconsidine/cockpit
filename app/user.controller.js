(function () {
  'use strict';

  angular.module('cockpit').controller('UserController', UserController);
  
  UserController.$inject = ['User'];

  function UserController(User) {
    this.state = {
      name: 'view',
      style: 'primary'
    };

    this.userList = [];

    this.toggleAction = function(name) {
      this.getUserList();

      switch(name) {
        case 'view':
          this.state.name = 'view';
          this.state.style = 'primary';
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
      this.userList = User.getUserList();
    };
  }
}());
