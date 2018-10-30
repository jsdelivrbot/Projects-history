import {Component, PropTypes} from 'react';
import {LoginService}         from './Login/Main.jsx';

function error (xhr) {
  if (xhr.status == 401 || xhr.status == 0) {
    localStorage.User = ''
    window.location.replace('#/')
  }
}

//Purpose of the ajax hander is to handle all ajax calls made to Quantlers backend (other calls can be done via direct ajax)
//This class allows for easier management of api calls (one central spot)
class AjaxHandlerClass extends Component {
  //Execute a get command towards the API
  Get (url:String, body = null) {
    //console.log(`Call: ${url}, Auth: ${this.GetAuthToken()}`);
    return $.ajax({
      url: url,
      method: "GET",
      data: JSON.stringify(body),
      headers: {
        "authorization": this.GetAuthToken()
      },
      error
    });
  }

  //Execute a post command towards the API
  Post (url:String, body) {
    //console.log(`Call: ${url}, Auth: ${this.GetAuthToken()}`);
    return $.ajax({
      async: true,
      crossDomain: true,
      url: url,
      method: "POST",
      processData: false,
      data: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "authorization": this.GetAuthToken()
      },
      error
    })
  }

  //Execute a Put command towards the API
  Put (url:String, body) {
    //console.log(`Call: ${url}, Auth: ${this.GetAuthToken()}`);
    return $.ajax({
      async: true,
      crossDomain: true,
      url: url,
      method: "PUT",
      data: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "authorization": this.GetAuthToken()
      },
      error
    })
  }

  GetAuthToken () {
    return "Bearer " + (!!LoginService.User ? LoginService.User.id_token : '')
  }
}

export var AjaxHandler = new AjaxHandlerClass()
