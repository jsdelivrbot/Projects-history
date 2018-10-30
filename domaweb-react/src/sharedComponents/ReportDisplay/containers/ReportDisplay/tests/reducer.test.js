
import { fromJS } from 'immutable';
import reportDisplayReducer from '../reducer';

describe('reportDisplayReducer', () => {
  it('returns the initial state', () => {
    expect(reportDisplayReducer(undefined, {})).toEqual(fromJS({}));
  });
});
