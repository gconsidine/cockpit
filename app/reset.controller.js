(function () {
  'use strict';

  angular.module('cockpit').controller('ResetController', ResetController);
  ResetController.$inject = ['$routeParams', '$timeout', '$location', 'State', 'Validate', 'User']; 

  function ResetController($routeParams, $timeout, $location, State, Validate, User) {
    var vm = this || {};
   
    vm.state = {
      submitLoading: false,
      request: false,
      process: false,
      sent: false
    };

    vm.input = {
      email: '',
      password: '',
      passwordConfirm: '',
      tempAuth: ''
    };

    vm.init = function () {
      if($routeParams.email && $routeParams.tempAuth) {
        vm.input.email = $routeParams.email;
        vm.input.tempAuth = $routeParams.tempAuth;
        vm.getPending();
      } else {
        vm.state.request = true;
      }
    };

    vm.request = function () {
      vm.state.submitLoading = true;

      if(!Validate.isEmail(vm.input.email)) {
        State.alert(true, 'danger', 'Invalid email address');
        return;
      }

      var request = {
        user: { email: vm.input.email }
      };

      User.resetRequest(request, function (error, request, response) {
        vm.state.submitLoading = false;

        if(error) {
          State.alert(true, 'danger', 'Your request for a reset failed.  Please try later.');
          return;
        }

        if(!response.ok) {
          State.alert(true, 'danger', 'Your request is invalid.  Please check your input.');
          return;
        }

        State.alert(true, 'success', 'A password reset request has been emailed to you');
        vm.state.sent = true;
      });
    };

    vm.getPending = function () {
      vm.state.submitLoading = true;

      if(!Validate.isEmail(vm.input.email) && !Validate.isHash('sha256', vm.input.tempAuth)) {
        State.alert(true, 'danger', 'Invalid email address');
        return;
      }

      var request = {
        user: { 
          email: vm.input.email,
          tempAuth: vm.input.tempAuth
        }
      };

      User.getPendingReset(request, function (error, request, response) {
        vm.state.submitLoading = false;

        if(error) {
          State.alert(true, 'danger', 'Your request for a reset failed.  Please try later.');
          return;
        }

        if(!response.ok) {
          State.alert(true, 'danger', 'Invalid reset link.');
          return;
        }

        vm.state.process = true;
      });
    };

    vm.submit = function () {
      var result = vm.validateInput();

      if(result.error) {
        State.alert(true, 'danger', result.message);
        return;
      }

      var request = { 
        user: {
          email: vm.input.email,
          tempAuth: vm.input.tempAuth,
          password: {
            new: vm.input.password,
            confirm: vm.input.passwordConfirm,
            hash: 'sha256'
          }
        }
      };

      User.reset(request, function (error, request, response) {
        vm.state.submitLoading = false;

        if(error) {
          State.alert(true, 'danger', 'Your reset request failed.  Please try again later.');
          return;
        }

        if(!response.ok) {
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

      if(!Validate.isHash('sha256', vm.input.tempAuth)) {
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
