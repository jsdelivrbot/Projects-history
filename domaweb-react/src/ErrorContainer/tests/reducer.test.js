
import { fromJS } from 'immutable';
import errorContainerReducer from '../reducer';

describe('errorContainerReducer', () => {
  it('returns the initial state', () => {
    expect(errorContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
