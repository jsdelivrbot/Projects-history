import {default as Auth0JS} from 'auth0-js';

let auth0 = {
    client_id: "tkeujbFunrGR0MZmAIqdx4rozm1IOrRz",
    domain: 'quantler.auth0.com'
  },

  authURL = 'https://' + auth0.domain,
  userinfo = authURL + '/userinfo',

  oauth_domain = authURL + '/oauth',
  oauth_login = oauth_domain + '/ro',
  oauth_logout = authURL + '/logout',

  dbconnections_domain = authURL + '/dbconnections',
  dbconnections_signup = dbconnections_domain + '/signup',
  dbconnections_change_password = dbconnections_domain + '/change_password',

  sdk = new Auth0JS({
    domain: auth0.domain,
    clientID: auth0.client_id,
    callbackOnLocationHash: true
  })

export let Auth0 = {
  sdk: sdk,
  client_id: auth0.client_id,
  domain: auth0.domain,
  url: authURL,
  connections: {
    usernamePassword: 'Username-Password-Authentication'
  },
  userinfo: userinfo,
  oauth: {
    domain: oauth_domain,
    login: oauth_login,
    logout: oauth_logout
  },
  dbconnections: {
    domain: dbconnections_domain,
    signup: dbconnections_signup,
    change_password: dbconnections_change_password
  }
}
