import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  FETCH_FILMS,
  POST_FILM,
  FETCH_FILM,
  DELETE_FILM,
  UPDATE_FILM
} from "./types"

const ROOT_URL = 'http://localhost:3090';

export function fetchFilms() {
  const request = axios.get(`${ ROOT_URL }/films`, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: FETCH_FILMS,
    payload: request
  }
}

export function createFilm(values, file, callback) {
  // console.log(file);
  let data = new FormData();
  data.append('file', file);
  data.append('title', values.title);
  data.append('categories', values.categories);
  data.append('content', values.content);
  console.log(data);
  const request = axios.post (`${ROOT_URL}/films/add`, data,  {
      headers: { authorization: localStorage.getItem('token')
      }
  }).then(() => callback() );

  return {
      type: POST_FILM,
      payload: request
  }
}

export function updateFilm(film) {
  const data = new FormData();

  data.append('file', film.image);
  data.append('title', film.title);
  data.append('categories', film.categories);
  data.append('content', film.content);
  data.append('_id', film._id);
  data.append('oldImage', film.oldImage);

  const request = axios.put(`${ ROOT_URL }/films/update/${ film._id }`, data, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: UPDATE_FILM,
    payload: request
  }
}

export function fetchFilm(id) {
  const request = axios.get(`${ ROOT_URL }/films/${ id }`, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: FETCH_FILM,
    payload: request
  }
}

export function deleteFilm(id, oldImage, callback) {
  const request = axios.delete(`${ ROOT_URL }/films/${ id }`, {
    headers: {
      authorization: localStorage.getItem('token'),
      body: oldImage
    }
  }).then(() => callback());

  return {
    type: DELETE_FILM,
    payload: id
  }
}

export function signinUser({ email, password }) {

  return function (dispatch) {
    axios.post(`${ ROOT_URL }/signin`, { email, password })
        .then(response => {
          dispatch({type: AUTH_USER});
          global.localStorage.setItem('token', response.data.token);
          browserHistory.push('/films')
        })
        .catch(() => {
          dispatch(authError('Bad Login Info'))
        })
  }
}

export function signupUser({ email, password }) {

  return function (dispatch) {
    axios.post(`${ ROOT_URL }/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        global.localStorage.setItem('token', response.data.token);
        browserHistory.push('/films')
      })
      .catch(response => {
        dispatch(authError(response.data.error))
    })
  }
}

export function authError(error) {

  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  global.localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {

  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
}

