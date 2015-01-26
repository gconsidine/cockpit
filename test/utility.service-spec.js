'use strict';

describe('utility.service', function () {
  var Utility;

  beforeEach(module('cockpit'));

  beforeEach(function () {
    inject(function(_Utility_) {
      Utility = _Utility_;
    });
  });

  it('should sort an array of objects and th given a key and table object', function () {
    var list = [
      {name: 'Corwin', age: 1580},
      {name: 'Bleys', age: 1373},
      {name: 'Bleys', age: 1373},
      {name: 'Eric', age: 1498}
    ];

    var table = {
      name: 'minus',
      age: 'minus'
    };

    var key = 'name';

    Utility.sortTable.call(this, list, table, key);
    expect(table.name).toBe('chevron-up');
    expect(table.age).toBe('minus');
    expect(list[0].name).toBe('Bleys');
    expect(list[1].name).toBe('Bleys');
    expect(list[2].name).toBe('Corwin');
    expect(list[3].name).toBe('Eric');
    
    Utility.sortTable.call(this, list, table, key);
    expect(table.name).toBe('chevron-down');
    expect(table.age).toBe('minus');
    expect(list[0].name).toBe('Eric');
    expect(list[1].name).toBe('Corwin');
    expect(list[2].name).toBe('Bleys');
    expect(list[3].name).toBe('Bleys');
  });
});
