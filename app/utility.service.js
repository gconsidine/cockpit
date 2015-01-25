(function () {
  'use strict';

  angular.module('cockpit').service('Utility', Utility);
  
  function Utility() {

    function sortTable(list, table, key) {
      for(var column in table) {
        if(table.hasOwnProperty(column)) {
          if(column === key) {
            if(table[key] === 'minus' || table[key] === 'chevron-down') {
              table[key] = 'chevron-up';
            } else {
              table[key] = 'chevron-down';
            }

            continue;
          }

          table[column] = 'minus';
        }
      }

      list.sort(function(a, b) {
        if(a[key] > b[key]) {
          return 1;
        }

        if(a[key] < b[key]) {
          return 1;
        }

        return 0;
      });
    }

    return {
      sortTable: sortTable
    };
  }

}());
