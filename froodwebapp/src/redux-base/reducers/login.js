import {
  LOGIN,
  LOGOUT
} from 'redux-base/actions/loginFlow';

// --------------------------- Reducer function --------------------------

const initialState = {
  user: null,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN.SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.user
      };
    }
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
