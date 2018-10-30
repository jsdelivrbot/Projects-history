import * as types from "../constants";

const initialState = [
  {
    id: 1,
    name: 'first company',
    notes: 'note',
  },
  {
    id: 2,
    name: 'second company',
    notes: 'note',
  },
  {
    id: 3,
    name: 'third company',
    notes: 'note',
  },
  {
    id: 4,
    name: 'fourth company',
    notes: 'note',
  },
  {
    id: 5,
    name: 'fifth company',
    notes: 'note',
  },
  {
    id: 6,
    name: 'sixth company',
    notes: 'note',
  },
  {
    id: 7,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 8,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 9,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 10,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 11,
    name: 'first company',
    notes: 'note',
  },
  {
    id: 12,
    name: 'second company',
    notes: 'note',
  },
  {
    id: 13,
    name: 'third company',
    notes: 'note',
  },
  {
    id: 14,
    name: 'fourth company',
    notes: 'note',
  },
  {
    id: 15,
    name: 'fifth company',
    notes: 'note',
  },
  {
    id: 16,
    name: 'sixth company',
    notes: 'note',
  },
  {
    id: 17,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 18,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 19,
    name: 'seventh company',
    notes: 'note',
  },
  {
    id: 20,
    name: 'seventh company',
    notes: 'note',
  },
];

export default function companiesListReducer(state = initialState, action) {

  switch (action.type) {

    case types.ADD_NEW_COMPANY:
    	return [...state, action.company];

    default:
    	return state;
  }
}