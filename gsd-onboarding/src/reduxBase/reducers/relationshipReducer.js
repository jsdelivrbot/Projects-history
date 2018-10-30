
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
  dropdownValues: ['value 1', 'value 2', 'value 3', 'value 4', 'value 5'],
};

export default function relationshipReducer(state = initialState, action) {

  switch (action.type) {

    case types.ADD_NEW_RELATIONSHIP:
    	return {...state, inputs: [...state.inputs, action.relationship], dropdowns: [...state.dropdowns, action.relationship]};

    default:
    	return state;
  }
}