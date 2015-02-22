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
          $location.path('/').replace();            
          return;  
        }

        if(!verifyLogin(next)) {
          $location.path('/login').replace();            
          return;
        }

        if(!authorizeRoute(next)) {
          $location.path('/').replace();            
          return;
        }

        $rootScope.state.alert.active = false;

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

    function alert(active, type, message) {
      $rootScope.state.alert.active = active;
      $rootScope.state.alert.type = type;
      $rootScope.state.alert.message = message;
    }

    function logout() {
      delete $rootScope.state;
      $location.path('/login').replace();            
    }

    return {
      startWatch: startWatch,
      updateTitle: updateTitle,
      verifyRoute: verifyRoute,
      verifyLogin: verifyLogin,
      authorizeRoute: authorizeRoute,
      getAccess: getAccess,
      logout: logout,
      alert: alert
    };
  }
}());
