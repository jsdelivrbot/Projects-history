import { fromJS } from 'immutable';
import {
  LOAD_TIMETABS,
  LOAD_TIMETABS_SUCCESS,
  LOAD_TIMETABS_FAILED,

  LOAD_BOOKINGTYPES,
  LOAD_BOOKINGTYPES_SUCCESS,
  LOAD_BOOKINGTYPES_FAILED,

  SELECTED_TIMETAB,
  SELECTED_TIMETAB_SUCCESS,
  SELECTED_TIMETAB_FAILED,

  LOAD_TIMETAB_RECORD,
  LOAD_TIMETAB_RECORD_SUCCESS,
  LOAD_TIMETAB_RECORD_FAILED,
  }
from './constants';

const initialState = fromJS({
  timetabs: [],
  selectedTimetab: null,
  timetabInfo: [],
  bookingTypes: [],
  isLoading: false,
});

// Booking reducer

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TIMETABS:
      return state.set('timetabs')
                  .set('isLoading', true);

    case LOAD_TIMETABS_SUCCESS:
      return state.set('timetabs', action.timetabs)
                  .set('isLoading', false);

    case LOAD_TIMETABS_FAILED:
      return state.set('error', fromJS(action.error))

    case LOAD_BOOKINGTYPES:
      return state.set('bookingTypes')
                  .set('isLoading', true);

    case LOAD_BOOKINGTYPES_SUCCESS:
      return state.set('bookingTypes', action.bookingTypes)
                  .set('isLoading', false);

    case LOAD_BOOKINGTYPES_FAILED:
      return state.set('error', fromJS(action.error));

    case LOAD_TIMETAB_RECORD:
      return state.set('timetabInfo');

    case LOAD_TIMETAB_RECORD_SUCCESS:
      return state.set('timetabInfo', action.timetabRecord);

    case LOAD_TIMETAB_RECORD_FAILED:
        return state.set('error', fromJS(action.error));

    case SELECTED_TIMETAB:
      return state.set('selectedTimetab': action.timetab);

    case SELECTED_TIMETAB_SUCCESS:
      return state.set('selectedTimetab': action.timetab);

    case SELECTED_TIMETAB_FAILED:
      return state.set('selectedTimetab': action.error);

    default:
      return state;
  }
}

export default bookingReducer;
