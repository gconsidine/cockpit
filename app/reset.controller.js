(function () {
  'use strict';

  angular.module('cockpit').controller('ResetController', ResetController);
  ResetController.$inject = ['$routeParams', '$timeout', '$location', 'State', 'Validate', 'User']; 

  function ResetController($routeParams, $timeout, $location, State, Validate, User) {
    var vm = this || {};
   
    vm.state = {
      submitLoading: false,
      request: false,
      process: false
    };

    vm.input = {
      email: '',
      password: '',
      passwordConfirm: '',
      tempAuth: ''
    };

    vm.init = function () {
      if($routeParams.email && $routeParams.auth) {
        vm.state.process = true;
        vm.input.email = $routeParams.email;
        vm.input.auth = $routeParams.auth;
      } else {
        vm.state.request = true;
      }
    };

    vm.submitRequest = function () {
      vm.state.submitLoading = true;

      var validated = Validate.isEmail(vm.input.email);

      if(!validated) {
        State.alert(true, 'danger', 'Invalid email address');
        return;
      }

      User.resetRequest({ email: vm.input.email }, function (error, request, response) {
        if(error) {
          State.alert(true, 'danger', 'Your request for a reset failed.  Please try later.');
          return;
        }

        if(!response.success) {
          State.alert(true, 'danger', 'Your request is invalid.  Please check your input.');
          return;
        }

        State.alert(true, 'success', 'A password reset request has been emailed to you');
      });
    };

    vm.submitUpdate = function () {
      var result = vm.validateInput();

      if(result.error) {
        State.alert(true, 'danger', result.message);
        return;
      }

      User.resetProcess(vm.input, function (error, request, response) {
        if(error) {
          State.alert(true, 'danger', 'Your reset request failed.  Please try again later.');
          return;
        }

        if(!response.success) {
          State.alert(true, 'danger', 'Reset unsuccessful. Please check your input.');
          return;
        }

        State.alert(true, 'success', 'Reset successful. You will be redirected momentarily');
        
        $timeout(function () {
          $location.path('/login/email/' + vm.input.email).replace();
        }, 2000);
      });
    };

    vm.validateInput = function () {
      var result = {
        error: false,
        message: []
      };

      if(!Validate.isEmail(vm.input.email)) {
        result.error = true;
        result.message.push('Invalid email address. ');
      }

      if(!Validate.isComplex(vm.input.password)) {
        result.error = true;
        result.message.push('Invalid password (does not meet complexity requirements). ');
      }

      if(!Validate.isMatch(vm.input.password, vm.input.passwordConfirm)) {
        result.error = true;
        result.message.push('Passwords do not match. ');
      }

      if(!Validate.isHash('sha256', vm.input.auth)) {
        result.error = true;
        result.message.push('Invalid authentication hash. ');
      }

      if(result.error) {
        result.message = result.message.join(' ');
      }

      return result;
    };
  }
}());
