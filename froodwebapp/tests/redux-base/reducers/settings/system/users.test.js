import users from 'redux-base/reducers/settings/system/users';
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
import { cloneDeep } from 'lodash';

const { describe, it, expect } = global;

describe('locations reducer', () => {
  const initialState = {
    users: [],
    roles: [],
    rights: [],
    loadingPage: false,
    needReloadUsers: false,
    needReloadRoles: false,
    needReloadRights: false,
  };

  it('handles USERS_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: USERS_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_SAVE_REQUEST action type', () => {
    const action = {
      type: USERS_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_UPDATE_REQUEST action type', () => {
    const action = {
      type: USERS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_DELETE_REQUEST action type', () => {
    const action = {
      type: USERS_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_GET_REQUEST action type', () => {
    const action = {
      type: ROLES_GET.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_SAVE_REQUEST action type', () => {
    const action = {
      type: ROLES_SAVE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_UPDATE_REQUEST action type', () => {
    const action = {
      type: ROLES_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_DELETE_REQUEST action type', () => {
    const action = {
      type: ROLES_DELETE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles RIGHTS_GET_PARALLEL_REQUEST action type', () => {
    const action = {
      type: RIGHTS_GET_PARALLEL.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles RIGHTS_UPDATE_REQUEST action type', () => {
    const action = {
      type: RIGHTS_UPDATE.REQUEST
    };

    const state = cloneDeep(initialState);
    state.loadingPage = true;
    state.needReloadUsers = false;
    state.needReloadRoles = false;
    state.needReloadRights = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_SAVE_SUCCESS action type', () => {
    const action = {
      type: USERS_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUsers = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_DELETE_SUCCESS action type', () => {
    const action = {
      type: USERS_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUsers = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: USERS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadUsers = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_SAVE_SUCCESS action type', () => {
    const action = {
      type: ROLES_SAVE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadRoles = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_UPDATE_SUCCESS action type', () => {
    const action = {
      type: ROLES_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadRoles = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_DELETE_SUCCESS action type', () => {
    const action = {
      type: ROLES_DELETE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadRoles = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles RIGHTS_UPDATE_SUCCESS action type', () => {
    const action = {
      type: RIGHTS_UPDATE.SUCCESS
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.needReloadRights = true;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles USERS_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: USERS_GET_PARALLEL.SUCCESS,
      data: ['users', 'roles']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    [state.users, state.roles] = action.data;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ROLES_GET_SUCCESS action type', () => {
    const action = {
      type: ROLES_GET.SUCCESS,
      data: 'Some Data'
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    state.roles = action.data;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles RIGHTS_GET_PARALLEL_SUCCESS action type', () => {
    const action = {
      type: RIGHTS_GET_PARALLEL.SUCCESS,
      data: ['roles', 'rights']
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;
    [state.roles, state.rights] = action.data;


    expect(users(initialState, action)).toEqual(state);
  });

  it('handles ERROR action type', () => {
    const action = {
      type: ERROR
    };

    const state = cloneDeep(initialState);
    state.loadingPage = false;

    expect(users(initialState, action)).toEqual(state);
  });

  it('handles default case', () => {
    expect(users(initialState, {})).toEqual(initialState);
  });
});
