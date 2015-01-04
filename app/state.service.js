(function () {
  'use strict';

  angular.module('cockpit').service('State', State);

  State.$inject = ['$rootScope', '$location', 'User'];
  
  function State($rootScope, $location, User) {
    
    function startWatch() {
      $rootScope.$on('$routeChangeStart', function (event, next) {
        if(!verifyRoute(next)) {
          $location.path('/page-not-found').replace();            
          return;  
        }

        if(!verifyLogin(next)) {
          $location.path('/forbidden').replace();            
          return;
        }

        if(!authorizeRoute(next)) {
          $location.path('/unauthorized').replace();            
          return;
        }

        updateTitle($location.path());
        updateNavigation();
      });
    }

    //TODO: Think about how User affects this service and refactor
    function updateNavigation() {
      $rootScope.state = $rootScope.state || {};
      $rootScope.state.access = User.getAccess();

      if(User.current.loggedIn) {
        $rootScope.state.loggedIn = true;
      } else {
        $rootScope.state.loggedIn = false;
      }
    }

    function updateTitle(path) {
      $rootScope.state = $rootScope.state || {};
      path = path.replace('/', '');

      var titleWords = path.split('-'),
          title = '';

      for(var i = 0; i < titleWords.length; i++) {
        if(titleWords[i][0]) {
          title += titleWords[i][0].toUpperCase() + titleWords[i].substr(1) + ' ';
        } else {
          title = 'Home';
        }
      }

      $rootScope.state.title = title;
    }

    function verifyRoute(next) {
      if(!next.access) {
        return false;
      }

      return true;
    }

    function verifyLogin(next) {
      if(next.access.requiresLogin && !User.current.loggedIn) {
        return false;
      }

      return true;
    }

    function authorizeRoute(next) {
      if(next.access.allowedRoles) {
        if(next.access.allowedRoles.indexOf(User.current.role) === -1) {
          return false;
        }
      }

      return true;
    }

    function flush() {
      delete $rootScope.state;
      $location.path('/login').replace();            
    }

    function alert(type, message, active) {
      $rootScope.state = $rootScope.state || {};

      $rootScope.state.alert = {
        active: active,
        type: type,
        message: message
      };
    }
    
    return {
      startWatch: startWatch,
      updateTitle: updateTitle,
      updateNavigation: updateNavigation,
      verifyRoute: verifyRoute,
      verifyLogin: verifyLogin,
      authorizeRoute: authorizeRoute,
      flush: flush,
      alert: alert
    };
  }
}());
