import * as types from "../constants";

export function addNewCompany (company) {
  return {
    type: types.ADD_NEW_COMPANY,
    company
  };
}

export function addNewService (service) {
  return {
    type: types.ADD_NEW_SERVICE,
    service
  };
}

export function addNewRelationship (relationship) {
  return {
    type: types.ADD_NEW_RELATIONSHIP,
    relationship
  };
}

export function addNewTechnology (technology) {
  return {
    type: types.ADD_NEW_TECHNOLOGY,
    technology
  };
}

export function addNewStrategy (strategy) {
  return {
    type: types.ADD_NEW_STRATEGY,
    strategy
  };
}
export function addNewGeographicArea (area) {
  return {
    type: types.ADD_NEW_GEOGRAPHIC_AREA,
    area
  };
}

export function addPathToStore (path) {
  return {
    type: types.ADD_PATH_TO_STORE,
    path
  };
}

export function load (data) {
  return {
    type: types.LOAD,
    data
  };
}

export function getUserId () {
  return {
    type: types.GET_USER_ID,
  };
}

export function createUserId () {
  return {
    type: types.CREATE_USER_ID,
  };
}