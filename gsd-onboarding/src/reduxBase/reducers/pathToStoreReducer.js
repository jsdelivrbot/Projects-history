import * as types from "../constants";

const initialState = [];

export default function pathToStoreReducer(state = initialState, action) {

  switch (action.type) {

    case types.ADD_PATH_TO_STORE:
    	return [...state, action.path];

    default:
    	return state;
  }
}