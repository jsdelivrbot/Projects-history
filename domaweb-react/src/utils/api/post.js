import 'whatwg-fetch';
import { getCookie } from '../getCookie';
import { postHeaders } from './headers';
import isEmpty from 'lodash/isEmpty'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

function parseJSON(response) {
  console.log(typeof(response));
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {}
  })
}

function setXSRFheader (options) {
  postHeaders.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
}

/**
 * 
 * checks for existence of an X-XSRF-TOKEN in cookies
 * if not present, repeats the incoming request to receive the token
 * then adds it to headers, and carries on with the original request 
 */
function checkXSRF(url, options) {
  const xsrf = getCookie('XSRF-TOKEN');
  if (xsrf !== "" && xsrf !== postHeaders.headers['X-XSRF-TOKEN']) {
    setXSRFheader();
    //return response;
  }

  // repeating a post method is not wise
  if (xsrf === "") {
    console.log('no xsrf header present in post');
    setXSRFheader();
  }
 // return response;
}

function addPayload(payload) {
  const data = JSON.stringify(payload)
  postHeaders.body = data;
  console.log(postHeaders);
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  console.error(error);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [postHeaders] The postHeaders we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function post(url, options, payload) {
  checkXSRF(url, postHeaders);
  addPayload(payload);
  return fetch(url, postHeaders)
    .then(checkXSRF(url, postHeaders))
    .then(checkStatus)
    .then(parseJSON);
}