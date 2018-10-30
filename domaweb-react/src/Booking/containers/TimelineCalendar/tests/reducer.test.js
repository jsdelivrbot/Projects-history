
import { fromJS } from 'immutable';
import bookingReducer from '../reducer';

describe('bookingReducer', () => {
  it('returns the initial state', () => {
    expect(bookingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
