
import { fromJS } from 'immutable';
import medListViewReducer from '../reducer';

describe('medListViewReducer', () => {
  it('returns the initial state', () => {
    expect(medListViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
