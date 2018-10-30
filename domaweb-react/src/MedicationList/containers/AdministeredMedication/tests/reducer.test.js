
import { fromJS } from 'immutable';
import administeredMedicationReducer from '../reducer';

describe('administeredMedicationReducer', () => {
  it('returns the initial state', () => {
    expect(administeredMedicationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
