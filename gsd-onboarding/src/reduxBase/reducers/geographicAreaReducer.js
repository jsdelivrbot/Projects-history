import * as types from "../constants";

const initialState = {
  dropdowns: [
    {
      id: 1,
      value: 'value'
    },
    {
      id: 2,
      value: 'value'
    },
    {
      id: 3,
      value: 'value'
    },
    {
      id: 4,
      value: 'value'
    },
    {
      id: 5,
      value: 'value'
    },
    {
      id: 6,
      value: 'value'
    },
    {
      id: 7,
      value: 'value'
    },
    {
      id: 8,
      value: 'value'
    },
    {
      id: 9,
      value: 'value'
    },
    {
      id: 10,
      value: 'value'
    },
  ],
  dropdownValues: ['one geography option'],
};

export default function geographicAreaReducer(state = initialState, action) {

  switch (action.type) {

    case types.ADD_NEW_GEOGRAPHIC_AREA:
    	return {...state, dropdowns: [...state.dropdowns, action.area]};

    default:
    	return state;
  }
}