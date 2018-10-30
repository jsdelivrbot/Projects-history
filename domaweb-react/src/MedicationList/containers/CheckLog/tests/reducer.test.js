
import { fromJS } from 'immutable';
import checkLogReducer from '../reducer';

describe('checkLogReducer', () => {
  it('returns the initial state', () => {
    expect(checkLogReducer(undefined, {})).toEqual(fromJS({}));
  });
});
