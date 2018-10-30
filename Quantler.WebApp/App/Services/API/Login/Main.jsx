import {Component, PropTypes} from 'react'
import _ from 'lodash'
import {Store} from '../../Utils/pubsub.jsx'
import {Auth0} from '../Auth0.jsx'
import {State} from '../../../State.jsx'

class LoginServiceClass extends Store {
  get User () {
    try {
      let user = JSON.parse(localStorage.User)
      return user
    }
    catch (e) {
      localStorage.User = ""
      return {}
    }
  }

  set User (value) {
    localStorage.User = JSON.stringify(value)
  }

  logging = false

  loginAjaxError (textStatus, error) {
    return {
      error: "AjaxError",
      error_description: textStatus + ": " + error
    }
  }

  logout (errorCallback = () => {}, callback) {
    if (!this.logging) {
      this.logging = true

      $.ajax({
        url: Auth0.oauth.logout,
        crossDomain: true,
        method: "GET"
      })
        .success((data) => {
          this.logging = false

          if (data.error) return errorCallback(data.error)

          this.User = null

          State.resetState()

          if (callback) {
            callback()
          } else {
            this.Publish()
          }
        })
        .fail(...xhrError => {
          console.log(xhrError)
          this.logging = false
          errorCallback(xhrError)
        })
    }

  }

  userinfo = {
    ajax: () => {
      return $.ajax({
        crossDomain: true,
        url: Auth0.userinfo,
        method: "GET",
        headers: {
          authorization: "Bearer " + this.User.access_token
        }
      })
    },
    success: (callback, publish = true) => (data) => {

      this.User = _.extend(this.User, {
        data: data
      })

      if (publish) this.Publish()

      if (callback) callback()

    },
    fail: (callback) => (xhr, status, error) => {

      console.log(status, error)

      this.User = null

      this.logging = false

      alert('something went wrong loading userinfo')

      if (callback) callback(this.loginAjaxError(status, error))

    }
  }

  login (email, password, publish = true, force = false) {
    let then, error

    if (!this.logging || force) {
      this.logging = true

      $.ajax
      ({
        url: Auth0.oauth.login,
        crossDomain: true,
        method: "POST",
        data: {
          client_id: Auth0.client_id,
          username: email,
          password: password,
          connection: "Username-Password-Authentication",
          grant_type: "Password",
          scope: "openid"
        },
        error: (jqxhr, textStatus, errortxt) => {
          console.log(this.loginAjaxError(textStatus, errortxt))

          let textDesc = _.get(jqxhr, 'responseJSON.error_description', 'Internal Error')

          if (error) error({ textStatus, textDesc })
        }
      })
        .done(data => {
          if (data.error && error) error(data.error)

          this.User = data

          console.log('login done, user: ', this.User)

          this.userinfo.ajax()
            .success(this.userinfo.success((() => then && then(data)), publish))
            .fail(this.userinfo.fail(error))
        })
        .always(() => {
          this.logging = false
        })
    }

    return {
      then (callback:Function)
      {
        then = callback
        return this
      },
      error (callback:Function)
      {
        error = callback
        return this
      }
    }
  }

}

export let LoginService = new LoginServiceClass()
