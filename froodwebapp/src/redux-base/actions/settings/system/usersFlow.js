import {
  createRequestTypes,
  createRequestFunc,
  createParallelRequestFunc
} from 'utils';
import { addActionsToSagas } from 'redux-base/sagas/actionsHelper';

// ------------------------Action constants---------------
export const USERS_GET_PARALLEL = createRequestTypes('USERS_GET_PARALLEL');
export const USERS_SAVE = createRequestTypes('USERS_SAVE');
export const USERS_UPDATE = createRequestTypes('USERS_UPDATE');
export const USERS_DELETE = createRequestTypes('USERS_DELETE');

export const ROLES_GET = createRequestTypes('ROLES_GET');
export const ROLES_UPDATE = createRequestTypes('ROLES_UPDATE');
export const ROLES_DELETE = createRequestTypes('ROLES_DELETE');
export const ROLES_SAVE = createRequestTypes('ROLES_SAVE');

export const RIGHTS_GET_PARALLEL = createRequestTypes('RIGHTS_GET_PARALLEL');
export const RIGHTS_UPDATE = createRequestTypes('RIGHTS_UPDATE');

// ------------------------Action creators---------------
export const usersGetRequest = createParallelRequestFunc(USERS_GET_PARALLEL, ['users', 'roles']);
export const usersSaveRequest = createRequestFunc(USERS_SAVE, 'users');
export const usersUpdateRequest = createRequestFunc(USERS_UPDATE, 'users');
export const usersDeleteRequest = createRequestFunc(USERS_DELETE, 'users/{id}');

export const rolesGetRequest = createRequestFunc(ROLES_GET, 'roles');
export const rolesSaveRequest = createRequestFunc(ROLES_SAVE, 'roles');
export const rolesUpdateRequest = createRequestFunc(ROLES_UPDATE, 'roles/{id}');
export const rolesDeleteRequest = createRequestFunc(ROLES_DELETE, 'roles/{id}');

export const rightsGetRequest = createParallelRequestFunc(RIGHTS_GET_PARALLEL, ['roles', 'rights']);
export const rightsUpdateRequest = createRequestFunc(RIGHTS_UPDATE, 'roles/{id}/rights');

// -------------------Add actions to Sagas -------------
addActionsToSagas([
  USERS_GET_PARALLEL,
  USERS_SAVE,
  USERS_UPDATE,
  USERS_DELETE,

  ROLES_GET,
  ROLES_SAVE,
  ROLES_UPDATE,
  ROLES_DELETE,

  RIGHTS_GET_PARALLEL,
  RIGHTS_UPDATE
]);
