import React, { Component } from 'react';
import {
  TextField,
  RaisedButton,
} from 'material-ui';
import { Link } from 'react-router-dom';

import auth from 'api/auth';
import errors from 'api/errors';

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  }

  signUp = (event) => {
    event.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();

    auth.signUp(email, password, this.handleSignUp);
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

  handleSignUp = (error, result) => {
    if (error) {
      this.setState({
        error: errors.getSignUpErrorMessage(error),
      });
    } else {
      console.log('confirm your email');
    }
  }

  render() {
    return (
      <div className="loginmodal-container">
        <h1>Sign Up</h1>
        <br />
        <form onSubmit={this.signUp}>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            value={this.state.email}
            type="email"
            onChange={this.handleEmailChange}
          />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <br />
          <RaisedButton
            label="Sign Up"
            primary={true}
            fullWidth={true}
            onClick={this.signUp}
          />
        </form>
        <div className="login-help">
          {/*<Link to="/login">Login</Link>*/}
        </div>
      </div>
    );
  };
}