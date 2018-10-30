
import { fromJS } from 'immutable';
import addNewMedicationReducer from '../reducer';

describe('addNewMedicationReducer', () => {
  it('returns the initial state', () => {
    expect(addNewMedicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
