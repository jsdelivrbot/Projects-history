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
  inputs: [
    {
      id: 11,
      value: 'value'
    },
    {
      id: 12,
      value: 'value'
    },
    {
      id: 13,
      value: 'value'
    },
    {
      id: 14,
      value: 'value'
    },
    {
      id: 15,
      value: 'value'
    },
    {
      id: 16,
      value: 'value'
    },
    {
      id: 17,
      value: 'value'
    },
    {
      id: 18,
      value: 'value'
    },
    {
      id: 19,
      value: 'value'
    },
    {
      id: 20,
      value: 'value'
    },
  ],
  dropdownValues: ['value 1', 'value 2', 'value 3', 'value 4', 'value 5'],
};

export default function technologiesReducer(state = initialState, action) {

  switch (action.type) {

    case types.ADD_NEW_TECHNOLOGY:
    	return {...state, inputs: [...state.inputs, action.technology]};

    default:
    	return state;
  }
}