import {LoginService} from '../../../Services/API/Login/Main.jsx';
import _              from 'lodash'

export class Tokens {
  static get APIURL () {
    return localStorage.getItem('APIURL') ||
      'UNKOWN-URL'
  }

  static get CODEGENURL () {
    return localStorage.getItem('CODEGENURL') ||
      'UNKOWN-URL'
  }

  static get LOGENTRIESTOKEN () {
    return localStorage.getItem('LOGENTRIESTOKEN') ||
      'UNKOWN-UNKNOWN-UNKOWN-UNKOWN'
  }

  static get PUSHERKEY () {
    return localStorage.getItem('PUSHERKEY') ||
      'UNKOWN-TOKEN'
  }
}

function ajaxOptions (prefix, url) {
  return {
    async: true,
    crossDomain: true,
    url: prefix + url,
    processData: false,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "authorization": getAuthToken()
    },
    error (xhr, b, c) {
      console.log('\n\n\nAJAX ERROR FUNCTION', xhr, b, c, '\n\n\n')
      if (xhr.status == 401 || xhr.status == 0) {
        localStorage.User = ''
        window.location.replace('#/')
      }
    }
  }
}

function get (prefix) {
  return function (url) {
    return $.ajax(Object.assign(ajaxOptions(prefix, url), {
      method: "GET",
    }))
  }
}

function post (prefix) {
  return function (url, body) {
    return $.ajax(Object.assign(ajaxOptions(prefix, url), {
      method: "POST",
      data: JSON.stringify(body),
    }))
  }
}

function put (prefix) {
  return function (url, body) {
    return $.ajax(Object.assign(ajaxOptions(prefix, url), {
      method: "PUT",
      data: JSON.stringify(body),
    }))
  }
}

function _delete (prefix) {
  return function (url) {
    return $.ajax(Object.assign(ajaxOptions(prefix, url), {
      method: "DELETE",
    }))
  }
}

export function AjaxErrorHandler (jqxhr, textStatus, error) {
  let err = "Request Failed: " + textStatus + ", " + error
  console.log('error: ', err)
  console.dir('jqxhr: ', jqxhr)

  // Logging to LogEntries
  LE.error(err)
  LE.error(jqxhr)
}

export let API =
{
  get: (url, data) => get(Tokens.APIURL)(url, data),
  post: (url, data) => post(Tokens.APIURL)(url, data),
  put: (url, data) => put(Tokens.APIURL)(url, data),
  delete: (url) => _delete(Tokens.APIURL)(url),
}

export let CodeGen =
{
  get: (url, data) => get(Tokens.CODEGENURL)(url, data),
  post: (url, data) => post(Tokens.CODEGENURL)(url, data),
  put: (url, data) => put(Tokens.CODEGENURL)(url, data),
  delete: (url) => _delete(Tokens.CODEGENURL)(url)
}

function getAuthToken () {
  // let token = "Bearer " + _.get (LoginService, 'User.id_token', '')
  // console.log ('token: ', token)
  return "Bearer " + _.get(LoginService, 'User.id_token', '') //token
}
