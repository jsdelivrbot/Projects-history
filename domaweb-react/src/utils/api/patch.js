import 'whatwg-fetch';
import { patchHeader } from './headers';
import { getCookie } from '../getCookie';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

function parseJSON(response) {
  return response.text().then((text) => {
    return text ? JSON.parse(text) : {}
  });
}

function setXSRFheader(options) {
  patchHeader.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
}

/**
 *
 * checks for existence of an X-XSRF-TOKEN in cookies
 * if not present, repeats the incoming request to receive the token
 * then adds it to headers, and carries on with the original request
 */
function checkXSRF(url, options) {
  const xsrf = getCookie('XSRF-TOKEN');
  if (xsrf !== '' && xsrf !== patchHeader.headers['X-XSRF-TOKEN']) {
    setXSRFheader();
  }

  // repeating a post method is not wise
  if (xsrf === '') {
    console.log('no xsrf header present in post');
    setXSRFheader();
  }
 // return response;
}

function addPayload(payload) {
  const data = JSON.stringify(payload)
  patchHeader.body = data;
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
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
export default function patch(url, options, payload) {
  checkXSRF(url, patchHeader);
  addPayload(payload);
  return fetch(url, patchHeader)
    .then(checkXSRF(url, patchHeader))
    .then(checkStatus)
    .then(parseJSON);
}
