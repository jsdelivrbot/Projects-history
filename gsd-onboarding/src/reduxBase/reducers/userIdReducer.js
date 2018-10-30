import * as types from "../constants";

const initialState = { 
	userId: '',
};

export default function pathToStoreReducer(state = initialState, action) {

  switch (action.type) {

    case types.GET_USER_ID:
    	return {...state, userId: '12345'};

    case types.CREATE_USER_ID:
    	return {...state, userId: '56789'};

    default:
    	return state;
  }
}