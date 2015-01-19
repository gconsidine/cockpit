(function () {
  'use strict';

  angular.module('cockpit').service('State', State);

  State.$inject = ['$rootScope', '$location', 'Property'];
  
  function State($rootScope, $location, Property) {
    $rootScope.state = {
      title: '',
      user: {
        email: '',
        role: '',
        access: {},
        loggedIn: false
      },
      alert: {
        active: false,
        type: '',
        message: ''
      }
    };

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
      });
    }

    function updateTitle(path) {
      path = path.replace('/', '');

      var titleWords = path.split('-');
      $rootScope.state.title = '';
      
      for(var i = 0; i < titleWords.length; i++) {
        if(titleWords[i][0]) {
          $rootScope.state.title += titleWords[i][0].toUpperCase() + titleWords[i].substr(1) + ' ';
        } else {
          $rootScope.state.title = 'Home';
        }
      }
    }

    function verifyRoute(next) {
      if(!next.access) {
        return false;
      }

      return true;
    }

    function verifyLogin(next) {
      if(next.access.requiresLogin && !$rootScope.state.user.loggedIn) {
        return false;
      }

      return true;
    }

    function authorizeRoute(next) {
      if(next.access.allowedRoles) {
        if(next.access.allowedRoles.indexOf($rootScope.state.user.role) === -1) {
          return false;
        }
      }

      return true;
    }

    function getAccess() {
      var permissions = {},
          accessList = Property.getAccess();

      for(var area in accessList) {
        if(accessList[area].indexOf($rootScope.state.user.role) === -1) {
          permissions[area] = false;
        } else {
          permissions[area] = true;
        }
      }

      return permissions;
    }

    function login(email, password) {
      // TODO: Temporary login without API
      if(email && password) {
        $rootScope.state.user.email = email;
        $rootScope.state.user.role = 'user';
        $rootScope.state.user.loggedIn = true;
        $rootScope.state.user.access = getAccess();

        return true;
      }

      return false;
    }

    function logout() {
      delete $rootScope.state;
      $location.path('/login').replace();            
    }

    function alert(type, message, active) {
      $rootScope.state.alert.type = type;
      $rootScope.state.alert.message = message;
      $rootScope.state.alert.active = active;
    }

    return {
      startWatch: startWatch,
      updateTitle: updateTitle,
      verifyRoute: verifyRoute,
      verifyLogin: verifyLogin,
      authorizeRoute: authorizeRoute,
      getAccess: getAccess,
      login: login,
      logout: logout,
      alert: alert
    };
  }
}());
