import {
  prepareFilterValue,
  prepareHeaders
} from 'utils';

const { describe, it, expect } = global;

describe('prepareFilterValue', () => {
  it('returns array without any changes', () => {
    const filters = [{
      relationalOpId: 'some OpId',
      columnId: 'some column Id',
      logicalOpId: 'some logical OpId',
      value: 312,
      someField: 'field'
    }, {
      relationalOpId: 'some OpId',
      logicalOpId: 'some logical OpId',
      columnId: 'Some id',
      value: 312,
      someField: 'field'
    }];
    const result = [{
      relationalOpId: 'some OpId',
      columnId: 'some column Id',
      logicalOpId: 'some logical OpId',
      value: 312
    }, {
      relationalOpId: 'some OpId',
      logicalOpId: 'some logical OpId',
      columnId: 'Some id',
      value: 312
    }];

    expect(prepareFilterValue(filters)).toEqual(result);
  });
});

describe('prepareHeaders', () => {
  it('returns array with new fields', () => {
    const entryArray = [{
      id: 1876423,
      name: 'Rocket-Name',
      dataAlias: 'some data alias',
      tableDataType: 'string',
      order: 242,
      isEditable: true,
      isSortable: false
    }, {
      id: 8933441,
      name: 'Bullet-Name',
      dataAlias: 'some data alias',
      tableDataType: 'string',
      order: 243,
      isEditable: false,
      isSortable: true
    }];
    const resultArray = [{
      id: 1876423,
      key: 'some data alias',
      name: 'Rocket-Name',
      order: 242,
      dataAlias: 'some data alias',
      dataType: 'string',
      isEditable: true,
      isSortable: false
    }, {
      id: 8933441,
      key: 'some data alias',
      name: 'Bullet-Name',
      order: 243,
      dataAlias: 'some data alias',
      dataType: 'string',
      isEditable: false,
      isSortable: true
    }];

    expect(prepareHeaders(entryArray)).toEqual(resultArray);
  });

  it('returns array of objects without missing fields', () => {
    const entryArray = [{
      id: 1,
      name: 'Rocket-Name',
      dataAlias: 'some data alias',
      tableDataType: 'string'
    }, {
      id: 2,
      name: 'Bullet-Name',
      dataAlias: 'some data alias',
      isSortable: true
    }];
    const resultArray = [{
      id: 1,
      key: 'some data alias',
      name: 'Rocket-Name',
      dataAlias: 'some data alias',
      dataType: 'string'
    }, {
      id: 2,
      key: 'some data alias',
      name: 'Bullet-Name',
      dataAlias: 'some data alias',
      isSortable: true
    }];

    expect(prepareHeaders(entryArray)).toEqual(resultArray);
  });
});
