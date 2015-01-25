(function () {
  'use strict';

  angular.module('cockpit').service('Utility', Utility);
  
  function Utility() {

    function sortTable(list, table, key) {
      var modifier = 1;

      for(var column in table) {
        if(table.hasOwnProperty(column)) {
          if(column === key) {
            if(table[key] === 'minus' || table[key] === 'chevron-down') {
              modifier = 1;
              table[key] = 'chevron-up';
            } else {
              modifier = -1;
              table[key] = 'chevron-down';
            }

            continue;
          }

          table[column] = 'minus';
        }
      }

      list.sort(function(a, b) {
        if(a[key] > b[key]) {
          return 1 * modifier;
        }

        if(a[key] < b[key]) {
          return -1 * modifier;
        }

        return 0;
      });
    }

    return {
      sortTable: sortTable
    };
  }

}());
