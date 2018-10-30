import _ from 'lodash';
import {
  FETCH_FILMS,
  FETCH_FILM,
  DELETE_FILM
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FILMS:
      return _.mapKeys(action.payload.data, '_id');
    case FETCH_FILM:
      return {
        ...state,
        [action.payload.data._id]: action.payload.data
      }
    case DELETE_FILM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}