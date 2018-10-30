import {Component, PropTypes} from 'react';
import {RecoverService}       from '../../Services/API/Recover/Main.jsx';
import {}                     from './recover.scss';
import {Link}                  from 'react-router';
import {Routes}                from '../../Routes.jsx';
import {RegulatoryText}        from '../../Pages/Login/Main.jsx'

export class Recover extends Component {

  constructor () {
    //Initialize top Component
    super();

    //set initial state
    this.state = {
      failure: false,
      success: false,
      message: "",
      IsBtnDisabled: false
    };
  }

  componentDidMount () {
    $(() => {

      $('#recoverForm')
        .parsley()
        .on('form:submit', (e) => {

          //disable button
          this.setState({ IsBtnDisabled: true });

          let [email, password] =
            [this.refs.email.value,
              this.refs.password.value]

          RecoverService
            .recover(email, password)
            .then(() => {
              //Set state to show the success message and information
              this.setState({
                success: true,
                failure: false,
                message: "Please check your email to verify your request."
              });
            })
            .error((errorObj) => {
              //Set state to show the failure message and information
              this.setState({ failure: true, success: false, message: `Error: ${errorObj.errormsg}` });
            })
            .always(() => {
              //re-enable button
              this.setState({ IsBtnDisabled: false });
            })
          return false
        })

    })
  }

  componentWillUnmount () {
    $('#recoverForm').parsley().destroy()
  }

  form () {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        return false;
      }} role="form" id="recoverForm" noValidate className="form-validate validator">
        <p className="text-center">
          <strong>PASSWORD RESET</strong>
          <br/>
          Fill in your e-mail and new password to receive confirmation that your password has been changed.
        </p>

        <div className="form-group has-feedback">
          <input ref="email" type="email" placeholder="Enter email" required className="form-control"/>
          <span className="fa fa-envelope form-control-feedback text-muted"/>
        </div>

        <div className="form-group has-feedback">
          <input ref="password" placeholder="Password" type="password" required className="form-control"
                 pattern="/^(?=.*\d)(?=.*[a-zA-Z]).{6,50}$/" id="password"
                 data-parsley-error-message="Input should contain 1 numeric, 1 alphabetic character and at least 6 length"/>
          <span className="fa fa-lock form-control-feedback text-muted"/>
        </div>

        <div className="form-group has-feedback">
          <input type="password" placeholder="Retype Password" required className="form-control"
                 data-parsley-equalto="#password" data-parsley-error-message="Passwords are different"/>
          <span className="fa fa-lock form-control-feedback text-muted"/>
        </div>

        <button type="submit" disabled={this.state.IsBtnDisabled} className="btn btn-labeled btn-danger btn-block">
          Reset
        </button>
        <br/>
        <Link to={Routes.Login}>
          <button type="submit" className="btn btn-labeled btn-default btn-block">I remembered my password</button>
        </Link>

        <br/>
            {this.state.success ? <div className="alert alert-success text-center">{this.state.message}</div> : null}
            {this.state.failure ? <div className="alert alert-danger text-center">{this.state.message}</div> : null}
      </form>
    )
  }

  render () {
    return (
      <div className="auth-page-wrapper">
        <div className="login-gradient gradient"></div>
        <div className="page-recover" style={{ position: 'relative', zIndex: '2' }}>
          <div className="block-center mt-xl wd-xl ng-scope">
            <div className="panel panel-dark panel-flat">
                 {/*Quantler logo*/}
                   <div className="panel-heading text-center">
                     <a>
                       <img src={"Art/" + "Images/logo_dark.png"} alt="Image" className="block-center img-rounded"/>
                     </a>
                   </div>

                   <div className="panel-body">
                        {this.form()}
                   </div>
            </div>
          </div>
        </div>
        <RegulatoryText />
      </div>
    )
  }
}
