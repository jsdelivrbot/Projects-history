
import { fromJS } from 'immutable';
import AuthRequiredReducer from '../reducer';

describe('AuthRequiredReducer', () => {
  it('returns the initial state', () => {
    expect(AuthRequiredReducer(undefined, {})).toEqual(fromJS({}));
  });
});
