import {Auth0Config}    from './Config.jsx'
import {LoginService}   from '../../../Services/API/Login/Main.jsx'
import {getUserDetails} from '../API/User.jsx'

function v2PatchUser ({ userId, id_token, data, callback, error }) {
  $.ajax(
    {
      method: 'PATCH',
      url: `https://quantler.auth0.com/api/v2/users/${userId}`,
      dataType: 'json',
      data: data,
      headers: {
        'Authorization': `Bearer  ${id_token}`
      }
    })
    .done(callback)
    .fail(...xhrError => error({ type: 'patch' }, xhrError))
}

function signupCallback ({ err, profile, email, password, id_token, name, callback, error }) {
  if (err) {
    error({ type: 'signup' }, err)
    return console.log('Something went wrong signing up: ', err)
  }

  LoginService
    .login(email, password, false, true)
    .then(() => {
      LoginService
        .userinfo.ajax()
        .success(LoginService.userinfo.success(() => {
            v2PatchUser(
              {
                id_token: LoginService.User.id_token,
                userId: LoginService.User.data.user_id,
                data: {
                  user_metadata: {
                    name: name
                  }
                },
                callback, error
              })
          },
          false))
        .error(xhrError => error({ type: 'login2' }, xhrError))
    })
    .error(xhrError => error({ type: 'login1' }, xhrError))
}

export function signup ({ name, email, password, callback, error }) {
  Auth0Config.sdk.signup(
    {
      sso: true,
      auto_login: false,
      connection: 'Username-Password-Authentication',
      email: email,
      password: password,
    }
    , (err, profile, id_token) => signupCallback({ err, profile, id_token, email, password, name, callback, error }))
}

export function userInfo ({ accessToken }) {
  return $.ajax({
    crossDomain: true,
    url: Auth0Config.userinfo,
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  })
}
