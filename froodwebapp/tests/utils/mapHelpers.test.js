import {
  getMenuItems,
  join2Arrays,
  crossJoinArrays
} from 'utils';

const { describe, it, expect } = global;

describe('getMenuItems', () => {
  it('returns array with new fields', () => {
    const arrayBefore = [
      { id: 114, name: 'John' },
      { id: 223, name: 'Bruce' }
    ];
    const arrayAfter = [
      { key: 114, value: 'John' },
      { key: 223, value: 'Bruce' }
    ];

    expect(getMenuItems(arrayBefore)).toEqual(arrayAfter);
  });
});

describe('join2Arrays', () => {
  it('combines 2 arrays in new one', () => {
    const firstArray = ['banana', 'lemon'];
    const secondArray = ['orange', 'watermelon'];
    const resultArray = [
      ['banana', 'orange'],
      ['banana', 'watermelon'],
      ['lemon', 'orange'],
      ['lemon', 'watermelon']
    ];

    expect(join2Arrays(firstArray, secondArray)).toEqual(resultArray);
  });
});

describe('crossJoinArrays', () => {
  it('combines three arrays in new one', () => {
    const firstArray = ['banana', 'lemon'];
    const secondArray = ['orange', 'watermelon'];
    const thirdArray = ['pineapple', 'lime'];
    const resultArray = [
      [
        'banana',
        'orange',
        'pineapple'
      ], [
        'banana',
        'orange',
        'lime'
      ], [
        'banana',
        'watermelon',
        'pineapple'
      ], [
        'banana',
        'watermelon',
        'lime'
      ], [
        'lemon',
        'orange',
        'pineapple'
      ], [
        'lemon',
        'orange',
        'lime'
      ], [
        'lemon',
        'watermelon',
        'pineapple'
      ], [
        'lemon',
        'watermelon',
        'lime'
      ]
    ];

    expect(crossJoinArrays(firstArray, secondArray, thirdArray)).toEqual(resultArray);
  });
});
