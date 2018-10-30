import * as React              from 'react';
import {}                      from './Social.scss';
import {LoginService}          from '../../Services/API/Login/Main.jsx';
import {Auth0}                 from '../../Services/API/Auth0.jsx';
import  _                      from 'lodash'

export class QSocialLogin extends React.Component {

  socialAuth (provider:String) {
    let me = this;
    //Google uses a different provider name
    provider = provider == 'google' ? provider + '-oauth2' : provider;

    //Perform auth0 social login
    Auth0.sdk.login({
      connection: provider,
      popup: true,
      scope: "openid"
    }, function (err, profile, id_token, access_token, state) {

      if (err) {
        if (err.status != 'User closed the popup window') {
          
          //401 Error means the account is actually blocked
          if(err.status == '401')
            err.message = 'Account is blocked'

          let errorMsg = `Error: ${err.message}`;
          me.props.onError ? me.props.onError(errorMsg) : console.log(errorMsg);
        }

        return;
      }

      LoginService.User = _.extend(profile, {
        access_token, id_token, state
      })

      LoginService.userinfo
        .ajax()
        .success(LoginService.userinfo.success(() => window.location.reload(true), false))
        .fail(LoginService.userinfo.fail())
    })
  }

  render () {
    //Check if this is a sign up or sign in mount
    let ttext = this.props.isLogin ? 'in' : 'up';
    return (
      <div className="social-holder">
        <div className="title-divider">
          <div><span>or</span></div>
        </div>
        <div style={{ padding: '0 10px' }}>
          <div onClick={() => this.socialAuth('facebook')} className="social-login-btn social-login-facebook">
            <i className="fa fa-facebook"/>
            <div>Sign {ttext} with Facebook</div>
          </div>
          <div onClick={() => this.socialAuth('google')} className="social-login-btn social-login-google">
            <i className="fa fa-google"/>
            <div>Sign {ttext} with Google</div>
          </div>
        </div>
      </div>
    )
  }
}
