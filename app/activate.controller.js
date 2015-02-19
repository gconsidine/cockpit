(function () {
  'use strict';

  angular.module('cockpit').controller('ActivateController', ActivateController);

  ActivateController.$inject = [
    '$routeParams', 
    '$timeout', 
    '$location', 
    'State', 
    'User', 
    'Validate'
  ]; 

  function ActivateController($routeParams, $timeout, $location, State, User, Validate) {
    var vm = this || {};
   
    vm.state = {
      submitLoading: false,
      actionLoading: true
    };

    vm.input = {
      email: '',
      passwordNew: '',
      passwordConfirm: '',
      tempAuth: ''
    };

    vm.init = function () {
      if(!$routeParams.email || !$routeParams.tempAuth) {
        State.alert(true, 'danger', 'Malformed activation link.');
        return;
      }

      var request = {
        params: {
          email: $routeParams.email,
          tempAuth: $routeParams.tempAuth
        }
      };

      User.getPendingActivation(request, function (error, response) {
        vm.state.actionLoading = false;

        if(error) {
          State.alert(true, 'danger', 'Could not complete request. Please try later.');
          return;
        }

        if(!response.ok) {
          State.alert(true, 'danger', 'Invalid activation paramters. Contact an administrator.');
          return;
        }

        vm.input.email = $routeParams.email;
        vm.input.tempAuth = $routeParams.tempAuth;
      });
    };

    vm.submit = function () {
      vm.state.submitLoading = true;

      var validation = vm.validateInput();

      if(validation.error) {
        State.alert(true, 'danger', validation.message);
        return;
      }

      var request = {
        email: vm.input.email,
        tempAuth: vm.input.tempAuth,
        password: {
          new: vm.input.passwordNew,
          confirm: vm.input.passwordConfirm
        }
      };

      User.activate(request, function (error, response) {
        vm.state.submitLoading = false;

        if(error) {
          State.alert(true, 'danger', 'Could not complete request. Please try later.');
          return;
        }

        if(!response.ok) {
          State.alert(true, 'danger', 'Invalid input.  Please check and try again.');
          return;
        }

        State.alert(true, 'success', 'Activation complete. You will be redirected momentarily');
        
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

      if(!Validate.isComplex(vm.input.passwordNew)) {
        result.error = true;
        result.message.push('Invalid password (does not meet complexity requirements). ');
      }

      if(!Validate.isMatch(vm.input.passwordNew, vm.input.passwordConfirm)) {
        result.error = true;
        result.message.push('Passwords do not match. ');
      }

      if(result.error) {
        result.message = result.message.join(' ');
      }

      return result;
    };
  }
}());
