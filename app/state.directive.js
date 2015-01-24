(function () {
  'use strict';

  angular.module('cockpit').directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/navigation.html'
    };
  }

  angular.module('cockpit').directive('footer', footer);

  function footer() {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/footer.html'
    };
  }

  angular.module('cockpit').directive('userAlert', userAlert);

  function userAlert() {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/user-alert.html'
    };
  }

  angular.module('cockpit').directive('logout', logout);
  logout.$inject = ['State'];
  
  function logout(State) {

    function link(scope, element) {
      element.on('mousedown', function() {
        scope.$apply(function () {
          State.logout();
        });
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }

  angular.module('cockpit').directive('tableSort', tableSort);
  
  function tableSort() {

    function link(scope, element, attrs) {
      element.on('click', function() {
        var span = element[0].getElementsByTagName('span')[0],
            th = element[0].parentNode.children,
            currentOrder = element[0].getAttribute('order'),
            model = element[0].parentNode.getAttribute('model').split('|'); // smells...

        if(currentOrder === '' || currentOrder === 'ascending') {
          span.className = 'glyphicon glyphicon-chevron-down';
          element[0].setAttribute('order', 'descending');
        } else if(currentOrder === 'descending') {
          span.className = 'glyphicon glyphicon-chevron-up';
          element[0].setAttribute('order', 'ascending');
        }

        for(var i = 0; i < th.length; i++) {
          if(th[i].getAttribute('table-sort') === attrs.tableSort) {
            continue;
          }

          if(th[i].getElementsByTagName('span')[0]) {
            th[i].getElementsByTagName('span')[0].className = 'glyphicon glyphicon-minus';
          }
        }

        scope.$apply(function () {
          scope[model[0]][[model[1]]].sort(function (a, b) { // ...weird
            if (a[attrs.tableSort] > b[attrs.tableSort]) {
              return 1;
            }

            if(a[attrs.tableSort] < b[attrs.tableSort]) {
              return 1;
            }

            return 0;
          });
        });
      });
    }

    return {
      restrict: 'A',
      link: link
    };
  }

}());
