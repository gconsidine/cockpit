(function () {
  'use strict';

  angular.module('cockpit').service('State', State);

  State.$inject = ['$rootScope', '$location'];
  
  function State($rootScope, $location) {
    var _user;

    function authorizeRoutes() {
      $rootScope.$on('$routeChangeStart', function (event, next) {
        
        // Invalid route
        if(!next.access) {
          return;
        }

        var user = getUser();

        // TODO: Redirect to 401 forbidden page
        if(next.access.requiresLogin && !user.loggedIn) {
          $location.path('/login').replace();            
          return;
        }

        // TODO: Redirect to 403 unauthorized page
        if(next.access.allowedRoles) {
          if(next.access.allowedRoles.indexOf(user.role) !== -1) {
            $location.path('/').replace();            
          }
        }
      });
    }

    // TODO: Move to user service
    function getUser(response) {
      if(!response) {
        if(!_user) {
          _user = {
            role: 'user',
            loggedIn: false
          };
        }

        return _user;
      }

      _user = response.user;
    }

    function login() {
    }
    
    return {
      authorizeRoutes: authorizeRoutes,
      login: login,
      getUser: getUser
    };
  }

}());
