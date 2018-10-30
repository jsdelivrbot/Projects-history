import * as types from "../constants";

const initialState = [
  {
    id: 1,
    serviceName: 'service',
  },
  {
    id: 2,
    serviceName: 'service',
  },
  {
    id: 3,
    serviceName: 'service',
  },
  {
    id: 4,
    serviceName: 'service',
  },
  {
    id: 5,
    serviceName: 'service',
  },
  {
    id: 6,
    serviceName: 'service',
  },
  {
    id: 7,
    serviceName: 'service',
  },
  {
    id: 8,
    serviceName: 'service',
  },
  {
    id: 9,
    serviceName: 'service',
  },
  {
    id: 10,
    serviceName: 'service',
  },
];

export default function productsServicesReducer(state = initialState, action) {

  switch (action.type) {

    case types.ADD_NEW_SERVICE:
    	return [...state, action.service];

    default:
    	return state;
  }
}