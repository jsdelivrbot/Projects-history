
import { fromJS } from 'immutable';
import allergiesReducer from '../reducer';

describe('allergiesReducer', () => {
  it('returns the initial state', () => {
    expect(allergiesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
