import {LoginService} from './Main.jsx'

function checkAuthorization (authType) {
  let user = LoginService.User

  switch (authType) {
    case AuthTypes.Logged:
      return (!!user && !!user.id_token)
      break
    default:
      return false
      break
  }
}

export class UserAuth {
  get idToken ():String {}

  get accessToken ():String {}

  get tokenType ():String {}
}

export let AuthTypes = {
  Logged: 0,
  Admin: 1,
  VIP: 2
}

export function isLoggedIn () {
  return checkAuthorization(AuthTypes.Logged)
}

// render component if user is authorized
// { CallIfAuthorized } for running callback if user is authorized
//   - used in pages like Login, so logged in users go to dashboard
export function Authorized (callback, authType = AuthTypes.Logged, CallIfAuthorized) {
  return function (Class) {
    let _render = Class.prototype.render

    Class.prototype.render = function () {
      let authResult = checkAuthorization(authType)

      if ((!authResult && !CallIfAuthorized) || (authResult && CallIfAuthorized)) {
        callback()
        return null
      }

      return _render.call(this)
    }

    return Class
  }
}
