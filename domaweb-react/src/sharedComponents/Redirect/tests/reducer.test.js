
import { fromJS } from 'immutable';
import redirectReducer from '../reducer';

describe('redirectReducer', () => {
  it('returns the initial state', () => {
    expect(redirectReducer(undefined, {})).toEqual(fromJS({}));
  });
});
