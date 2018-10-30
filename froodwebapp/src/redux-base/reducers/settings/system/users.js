import {
  USERS_GET_PARALLEL,
  USERS_SAVE,
  USERS_UPDATE,
  USERS_DELETE,
  ROLES_GET,
  ROLES_SAVE,
  ROLES_UPDATE,
  ROLES_DELETE,
  RIGHTS_GET_PARALLEL,
  RIGHTS_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  users: [],
  roles: [],
  rights: [],
  loadingPage: false,
  needReloadUsers: false,
  needReloadRoles: false,
  needReloadRights: false,
};

export default function users(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_GET_PARALLEL.REQUEST:
    case USERS_SAVE.REQUEST:
    case USERS_UPDATE.REQUEST:
    case USERS_DELETE.REQUEST:
    case ROLES_GET.REQUEST:
    case ROLES_SAVE.REQUEST:
    case ROLES_UPDATE.REQUEST:
    case ROLES_DELETE.REQUEST:
    case RIGHTS_GET_PARALLEL.REQUEST:
    case RIGHTS_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadUsers: false,
        needReloadRoles: false,
        needReloadRights: false
      };
    case USERS_SAVE.SUCCESS:
    case USERS_DELETE.SUCCESS:
    case USERS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadUsers: true
      };
    case ROLES_SAVE.SUCCESS:
    case ROLES_UPDATE.SUCCESS:
    case ROLES_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadRoles: true
      };
    case RIGHTS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadRights: true
      };
    case USERS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        users: action.data[0],
        roles: action.data[1],
      };
    case ROLES_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        roles: action.data
      };
    case RIGHTS_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        roles: action.data[0],
        rights: action.data[1]
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
