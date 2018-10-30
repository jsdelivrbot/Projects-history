
import { fromJS } from 'immutable';
import currentMedicationReducer from '../reducer';

describe('currentMedicationReducer', () => {
  it('returns the initial state', () => {
    expect(currentMedicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
