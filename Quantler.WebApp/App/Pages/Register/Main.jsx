import {Component}           from 'react';
import {Link}                  from 'react-router';
import {Routes}                from '../../Routes.jsx';
import {LoginService}          from '../../Services/API/Login/Main.jsx';
import {Authorized, AuthTypes} from '../../Services/API/Login/Authorized.jsx';
import {}                      from './register.scss';
import {QSocialLogin}          from '../../Components/QSocialLogin/Main.jsx';
import Modal                   from 'react-modal'
import {Terms}               from './Terms.jsx'
import * as Auth0API           from '../../Functions/Networking/Auth0/Auth0.jsx'
import {RegulatoryText}        from '../../Pages/Login/Main.jsx'

let modalStyle =
{
  overlay: {
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.51)'
  },
  content: {
    padding: 10
  }
}

export class TermsLink extends Component {
  state = {
    open: false
  }

  toggleModal = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    let open = this.state.open

    return (
      <span>
        <a onClick={ this.toggleModal } style={ this.props.style }>{ this.props.text }</a>

        <Modal className="Modal__Bootstrap modal-dialog"
               onRequestClose={ this.toggleModal }
               isOpen={ open }
               style={ modalStyle }
        >
          <div>
            <div className="modal-content" style={{ border: 'none' }}>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span onClick={ this.toggleModal } aria-hidden="true" style={{ fontSize: '22px' }}>&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Terms and conditions for Quantler</h4>
              </div>
              <div className="modal-body">
                <Terms/>
              </div>
            </div>
          </div>
        </Modal>
      </span>
    )
  }

}

class RegisterForm extends Component {
  state = {
    error: false,
    message: "",
    IsBtnDisabled: false
  }

  componentDidMount () {
    $(() => {
      let $registerForm = $('#registerForm')

      if ($registerForm.parsley) {
        $registerForm
          .parsley()
          .on('form:submit', () => {
            let name = this.refs.name.value,
              email = this.refs.email.value,
              password = this.refs.password.value

            this.setState({
              error: false,
              message: '',
              IsBtnDisabled: true
            })

            Auth0API.signup({
              name, email, password,
              callback: () => window.location.reload(true),
              error: (error, xhrError) => {
                window.console.log('signup error: ', error)

                switch (error.type) {
                  case 'signup':
                    this.setState({
                      error: true,
                      message: `Signup, please try again later`,
                      IsBtnDisabled: false
                    })
                    break

                  case 'login1':
                  case 'login2':
                  case 'login3':
                    this.setState({
                      success: true,
                      message: `Signup successfull, you may now log in`,
                      IsBtnDisabled: false
                    })
                    break

                  default:
                    // to backtester
                    window.location.reload(true)
                    break
                }
              }
            })

            return false
          })
      }

    })
  }

  componentWillUnmount () {
    $('#registerForm').parsley().destroy()
  }

  render () {
    return (
      <form onSubmit={(e) => {e.preventDefault()}} role="form" id="registerForm" noValidate
            className="form-validate mb-lg">
        <div className="form-group has-feedback">
          <input type="text" placeholder="Full name" required className="form-control"
                 ref="name" data-parsley-error-message="This field is required"/>
          <span className="fa fa-user form-control-feedback text-muted"/>
        </div>

        <div className="form-group has-feedback">
          <input ref="email" type="email" name="account_email" placeholder="Enter email" required
                 className="form-control"/>
          <span className="fa fa-envelope form-control-feedback text-muted"/>
        </div>

        <div className="form-group has-feedback">
          <input ref="password" placeholder="Password" type="password" className="form-control"
                 pattern="/^(?=.*\d)(?=.*[a-zA-Z]).{6,50}$/" required id="password"
                 data-parsley-error-message="Input should contain 1 numeric, 1 alphabetic character and at least 6 length"/>
          <span className="fa fa-lock form-control-feedback text-muted"/>
        </div>

        <div className="form-group has-feedback">
          <input type="password" placeholder="Retype Password" className="form-control" required
                 data-parsley-equalto="#password" data-parsley-error-message="Passwords are different"/>
          <span className="fa fa-lock form-control-feedback text-muted"/>
        </div>

        <label className="checkbox-inline c-checkbox pull-left" style={{ margin: 0 }}>
          <input type="checkbox" name="termsAgree" defaultValue="ispublic" required
                 data-parsley-error-message="You must agree the terms"
                 data-parsley-errors-container="#termsError"/>
          <span className="fa fa-check"/>
          <span style={{ width: 105, margin: 0 }}> I agree with the</span>
        </label><TermsLink style={{ float: 'left', marginTop: 10 }} text="terms" />

        <br/><br/>

        <div id="termsError"></div>

        <button type="submit" className="btn btn-labeled btn-block btn-primary mt-lg"
                disabled={this.state.IsBtnDisabled}>
          <span>Sign up</span>
          <img src={"Art/" + "Images/ajax-loader.gif"} className="hide"/>
        </button>

        <br/>

            { this.state.success && <div className="alert alert-success text-center">{this.state.message}</div> }
            { this.state.error && <div className="alert alert-danger text-center">{this.state.message}</div> }
      </form>
    )
  }

}

@Authorized(() => location.replace('/#/'), AuthTypes.Logged, true)
@LoginService.Subscribe()
export class Register extends Component {
  render () {
    return (
      <div className="auth-page-wrapper">
        <div className="login-gradient gradient"></div>
        <div className="page-register block-center mt-xl wd-xl" style={{ position: 'relative', zIndex: '2' }}>
          <div>
            <section>
              <div className=" ng-fadeInDown">
                <div className="block-center mt-xl wd-xl ">

                  <div className="top-links">
                    <Link to={Routes.Login}>
                      <span>LOGIN</span>
                    </Link>
                    <Link to={Routes.Register}>
                      <span className="top-links-active">REGISTER</span>
                    </Link>
                  </div>

                  <div className="panel panel-dark panel-flat">

                       {/*Quantler Logo*/}
                         <div className="panel-heading text-center">
                           <a>
                             <img src={"Art/" + "Images/logo_dark.png"} alt="Image"
                                  className="block-center img-rounded"/>
                           </a>
                         </div>

                         <div className="panel-body">
                           <RegisterForm/>
                           <QSocialLogin isLogin={false}
                                         onError={(errorMsg) => this.setState({ error: true, message: errorMsg })}/>
                         </div>

                  </div>
                </div>
              </div>
                          <div style={{ color: 'rgba(255,255,255,0.4)', backgroundColor: '#3E3F4B', borderBottomLeftRadius: 3, borderBottomRightRadius: 3, textAlign: 'center', padding: 10 }}>
              <span>By signing up you agree with Quantler's </span><TermsLink style={{ color: '#e84e1b' }} text="Terms"/>
            </div>
            </section>
          </div>
        </div>
        <RegulatoryText />
      </div>
    );
  }

}
