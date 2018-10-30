import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

import auth, { loginCallbackFactory } from 'api/auth';
import errors from 'api/errors';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    loginStatus: false,
  }

  callbacks = loginCallbackFactory({
    onSuccess: (result) => {
      console.log('res', result);
      if (result.loginStatus) {
        window.location.href = '/';
      }
      // this.setState(() => {
      //   loginStatus: result.loginStatus
      // });
    },
    onFailure: (result) => {
      console.log('failure', result);
    },
  }, this);

  // componentDidUpdate(prevProps, prevState, ctx) {
  //   console.log(this.state.loginStatus);
  //   if (this.state.loginStatus) {
  //     // it is stupid
  //     // @todo: replace with react-router actions
  //     window.location.href = '/';
  //   }
  // }

  signIn = (event) => {
    event.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();

    auth.signIn(email, password, this.callbacks);
  }

  handleUsernameChange = (event, value) => {
    this.setState({ username: value });
  }

  handleEmailChange = (event, value) => {
    this.setState({ email: value });
  }

  handlePasswordChange = (event, value) => {
    this.setState({ password: value });
  }

  handleSignIn = (error, result) => {
    if (error) {
      this.setState({
        error: errors.getSignInErrorMessage(error),
      });
    } else {
      console.log(result);
    }
  }

  render() {
    return (
      <div className="loginmodal-container">
        <h1>Login to Your Account</h1>
        <br />
        <form>
          <TextField
            hintText="Login Field"
            floatingLabelText="Login"
            onChange={this.handleEmailChange}
          />
          <br />
          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
            onChange={this.handlePasswordChange}
          />
          <br />
          <RaisedButton
            label="Login"
            primary={true}
            fullWidth={true}
            onClick={this.signIn}
          />
        </form>
        <div className="login-help">
          {/*<Link to="/signup">Sign Up</Link>*/}
        </div>
      </div>
    );
  };
}