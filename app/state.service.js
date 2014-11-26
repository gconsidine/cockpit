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

    function updateNavigation() {
      var user = User.get();

      $rootScope.state = $rootScope.state || {};
      $rootScope.state.access = User.access();

      if(user.loggedIn) {
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
        title += titleWords[i][0].toUpperCase() + titleWords[i].substr(1) + ' ';
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
      var user = User.get();

      if(next.access.requiresLogin && !user.loggedIn) {
        return false;
      }

      return true;
    }

    function authorizeRoute(next) {
      var user = User.get();

      if(next.access.allowedRoles) {
        if(next.access.allowedRoles.indexOf(user.role) !== -1) {
          return false;
        }
      }

      return true;
    }
    
    return {
      startWatch: startWatch,
      updateTitle: updateTitle,
      verifyRoute: verifyRoute,
      verifyLogin: verifyLogin,
      authorizeRoute: authorizeRoute
    };
  }

}());
