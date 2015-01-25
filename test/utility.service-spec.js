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
      {name: 'Corwin'},
      {name: 'Bleys'},
      {name: 'Bleys'},
      {name: 'Eric'}
    ];

    var table = {
      name: 'minus'
    };

    var key = 'name';

    Utility.sortTable.call(this, list, table, key);
    expect(table.name).toBe('chevron-up');
    expect(list[0].name).toBe('Bleys');
    expect(list[1].name).toBe('Bleys');
    expect(list[2].name).toBe('Corwin');
    expect(list[3].name).toBe('Eric');
    
    Utility.sortTable.call(this, list, table, key);
    expect(table.name).toBe('chevron-down');
    expect(list[0].name).toBe('Eric');
    expect(list[1].name).toBe('Corwin');
    expect(list[2].name).toBe('Bleys');
    expect(list[3].name).toBe('Bleys');
  });
});
