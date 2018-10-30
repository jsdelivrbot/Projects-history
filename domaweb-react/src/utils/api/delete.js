import 'whatwg-fetch';
import { getCookie } from '../getCookie';
import { deleteHeaders} from './headers';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

function parseJSON(response) {
  return response.json();
}

function setXSRFheader() {
  deleteHeaders.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
}

/**
 *
 * checks for existence of an X-XSRF-TOKEN in cookies
 * if not present, repeats the incoming request to receive the token
 * then adds it to headers, and carries on with the original request
 */
function checkXSRF(url, options) {
  const xsrf = getCookie('XSRF-TOKEN');
  if (xsrf !== '' && xsrf !== deleteHeaders.headers['X-XSRF-TOKEN']) {
    setXSRFheader();
    // return response;
  }

  if (xsrf === '') {
    console.log('no xsrf header present');
    setXSRFheader();
    /* return fetch(url, options)
    .then(setXSRFheader) */
  }
  // return response;
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
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function deleteMethod(url, options) {
  checkXSRF(url, deleteHeaders);
  return fetch(url, deleteHeaders)
      .then(checkStatus)
      .then(parseJSON);
}
