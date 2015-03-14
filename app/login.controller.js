(function () {
  'use strict';

  angular.module('cockpit').controller('LoginController', LoginController);

  LoginController.$inject = [
    '$location', 
    '$routeParams', 
    '$rootScope', 
    'State', 
    'Validate', 
    'User'
  ]; 

  function LoginController($location, $routeParams, $rootScope, State, Validate, User) {
    var vm = this || {};

    vm.email = {
      value: '',
      valid: false
    };

    vm.password = {
      value: '',
      valid: false
    };

    vm.init = function () {
      if($routeParams.email) {
        vm.email.value = $routeParams.email;
      }
    };

    vm.submit = function () {
      if(!Validate.isEmail(vm.email.value) || !vm.password.value) {
        State.alert(true, 'danger', 'Invalid login credentials.');
        return;
      }

      var request = {
        user: {
          email: vm.email.value,
          password: vm.password.value
        }
      };

      User.login(request, vm.complete.bind(vm));
    };

    vm.complete = function (error, request, response) {
      if(error) {
        State.alert(true, 'danger', 'Server not responding. Please try later.');
        return;
      }

      if(!response.ok) {
        State.alert(true, 'danger', 'Invalid login credentials.');
        return;
      }

      var user = response.data[0];

      $rootScope.state.user.email = user.email;
      $rootScope.state.user.role = user.role;
      $rootScope.state.user.access = State.getAccess();
      $rootScope.state.user.loggedIn = true;

      $location.path('/').replace();
    };
  }
}());
