
import { fromJS } from 'immutable';
import medicationListReducer from '../reducer';

describe('medicationListReducer', () => {
  it('returns the initial state', () => {
    expect(medicationListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
