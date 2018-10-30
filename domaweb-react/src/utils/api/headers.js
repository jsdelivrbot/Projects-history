export const reqHeaders =  {
  method: 'GET',
  headers: {
    //'x-xsrf-token': true,
    'Authorization': true,
  },
  'Access-Control-Allow-Headers': 'true',
  'credentials': 'include',
  mode: 'cors',
};

export const postHeaders = {
  method: 'POST',
  headers: {
    'Authorization': true,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  'Access-Control-Allow-Headers': 'true',
  'credentials': 'include',
  mode: 'cors',
};

export const patchHeader = {
  method: 'PATCH',
  headers: {
    'Authorization': true,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  'Access-Control-Allow-Headers': 'true',
  'credentials': 'include',
  mode: 'cors',
};

export const deleteHeaders = {
  method: 'DELETE',
  headers: {
    //'x-xsrf-token': true,
    'Authorization': true,
  },
  'Access-Control-Allow-Headers': 'true',
  'credentials': 'include',
  mode: 'cors',
};