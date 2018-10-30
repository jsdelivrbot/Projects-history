import * as React              from 'react';
import {}                      from './login.scss';
import {Link}                  from 'react-router';
import {Routes}                from '../../Routes.jsx';
import {Authorized, AuthTypes} from '../../Services/API/Login/Authorized.jsx';
import {LoginService}          from '../../Services/API/Login/Main.jsx';
import {QSocialLogin}          from '../../Components/QSocialLogin/Main.jsx';
import {TermsLink}             from '../../Pages/Register/Main.jsx'

@Authorized(() => location.replace('/#/'), AuthTypes.Logged, true)
@LoginService.Subscribe()
export class Login extends React.Component {
  state = {
    error: false,
    message: "",
    IsBtnDisabled: false
  }

  componentDidMount () {
    $(() => {
      let logging = false

      let loginForm = $('#loginForm')

      if (loginForm.parsley()) {
        loginForm
          .parsley()
          .on('form:submit', (e) => {
            if (!logging) {
              logging = true

              //set initial state
              this.setState({ error: false, message: '', IsBtnDisabled: true });

              let [email, password] =
                [this.refs.email.value, this.refs.password.value]

              LoginService
                .login(email, password, false)
                .then(() => window.location.reload(true))
                .error((error) => {
                  logging = false;
                  //Set state to notify the error
                  this.setState({ error: true, message: `Error: ${error.textDesc}`, IsBtnDisabled: false });
                })
            }

            return false
          })
      }
    })
  }

  heading () {
    return (
      <div className="panel-heading text-center">
        <a>
          <img src={ "Art/Images/logo_dark.png" } alt="Image" className="block-center img-rounded"/>
        </a>
      </div>
    )
  }

  emailPasswordInputs () {
    return (
      <div>
        <div className="form-group has-feedback">
          <input type="email" ref="email"
                 placeholder="Enter email"
                 className="form-control"
                 data-parsley-error-message="This field must be a valid email address"
                 defaultValue=""
                 required/>
          <span className="fa fa-envelope form-control-feedback text-muted"/>
        </div>

        <div className="form-group has-feedback">
          <input ref="password" type="password"
                 placeholder="Password"
                 className="form-control"
                 defaultValue=""
                 required/>
          <span className="fa fa-lock form-control-feedback text-muted"/>
        </div>
      </div>
    )
  }

  loginForm () {
    return (
      <form role="form" id="loginForm" noValidate className="form-validate mb-lg">

            {this.emailPasswordInputs()}

              <div className="clearfix">
                <div className="checkbox c-checkbox pull-left mt0 invisible">
                  <label>
                    <input type="checkbox" value="" name="account_remember"/>
                    <span className="fa fa-check"/>Remember Me
                  </label>
                </div>

                <div className="pull-right">
                  <Link to={Routes.Recover}>
                    <a className="text-muted">Forgot your password?</a>
                  </Link>
                </div>
              </div>

              <div className="form-group has-feedback text-center">
                <button type="submit" disabled={this.state.IsBtnDisabled}
                        className="btn btn-labeled btn-block btn-primary mt-lg">
                  <span>Sign in</span>
                  <img className="hide" src={"Art/" + "Images/ajax-loader.gif"}/>
                </button>
              </div>
            {this.state.error ? <div className="alert alert-danger text-center">{this.state.message}</div> : null}
      </form>
    )
  }

  render () {
    return (
      <div className="auth-page-wrapper">
        <div className="login-gradient gradient"></div>
        <div className="page-login block-center mt-xl wd-xl" style={{ position: 'relative', zIndex: '2' }}>

          <div className="top-links">
            <Link to={Routes.Login}>
              <span className="top-links-active">LOGIN</span>
            </Link>
            <Link to={Routes.Register}>
              <span>REGISTER</span>
            </Link>
          </div>

          <div className="panel panel-dark panel-flat">

            {this.heading()}

            <div className="panel-body">
              {this.loginForm()}
              <QSocialLogin isLogin={true}
                            onError={(errorMsg) => this.setState({ error: true, message: errorMsg })}/>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', backgroundColor: '#3E3F4B', borderBottomLeftRadius: 3, borderBottomRightRadius: 3, textAlign: 'center', padding: 10 }}>
              <span>By signing in you agree with Quantler's </span><TermsLink style={{ color: '#e84e1b' }} text="Terms"/>
            </div>
          </div>
        </div>
        <RegulatoryText />
      </div>
    );
  }
}

export let RegulatoryText = () => {
  return (
    <div style={{ position: 'absolute', bottom: '5%', left: '5%', border: '1px solid #3E3F4B', color: 'rgba(255,255,255,0.3)', borderRadius: 3, padding: 15, width: '90%', fontSize: 11, textAlign: 'justify'}}>
      WARNING: No Investment Advice. Nothing provided by Quantler should be interpreted as investment, legal or tax advice. We are not financial advisors, brokers or fund managers. None of the content offered by Quantler, third parties or shared code and or algorithms on Quantler should be interpreted as recommendations. These are educational materials provided for the development of your strategy. You acknowledge and agree that any use of Quantler, any decisions made in reliance on Quantler, including any trading or investment decisions or strategies, are made at your own risk. The service provides ability to test ideas on historical data, however past performance is no guarantee of future results. By accessing this site, you agree with Quantler's terms
    </div>
  )
}