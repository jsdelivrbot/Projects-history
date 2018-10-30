/*
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import  {Grid, Row, Col, Button, ProgressBar, Jumbotron} from 'react-bootstrap';
import { formatState, setStep, initRegister, registerSrpStep3, initLogin, logout, fetchUserState } from './actions';
import makeSelectLogin, { makeSelectRoute } from './selectors';
import messages from './messages';
// import SRPClient from '../utils/thinbus-srp/thinbus-srp6client-sha256';
import RegisterByPhone from '../../components/RegisterByPhone';
import SMSverification from '../../components/Smsverification';
import LoginRegistered from '../../components/LoginRegistered';
import styles from './Login-styles.scss';

import { hashHistory } from 'react-router';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.fetchUserState();
  }
  componentDidMount() {
    if (!this.props.Login.state) {
      this.props.format();
    }
  }
  render() {
    console.log(this.props);
    const { login, route } = this.props;
    const logo = require('../../../assets/images/brand/DomaCare_color_RGB_black_text.svg');
    const year = (new Date()).getFullYear();
    return (
          <Row className={styles.login__section}>
            {this.props.Login.session &&
            !this.props.Login.session.loginState.clientRegisteringCookieValid &&
            this.props.Login.step !== 2 &&
            <RegisterByPhone submit={this.props.initRegister}/>}

            {this.props.Login.step === 2 &&
            <SMSverification
              submit={this.props.submitSMS}
              error={this.props.Login.error}
              errorMsg={this.props.Login.errorMessage}
              errorCode={this.props.Login.errorCode}
              onMaxAttemptReached={() => this.props.setStep(0)}
            />}

            {this.props.Login.session &&
            this.props.Login.session.loginState.clientRegisteringCookieValid === true &&
            this.props.Login.session.loginState.loggedIn === false &&
            <LoginRegistered submit={this.props.initLogin}/>}
            {/*this.props.Login.session &&
              this.props.Login.session.loginState.loggedIn === true && hashHistory.goBack()
            */}

          </Row>
    );
  }
}

Login.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  initRegister: PropTypes.func.isRequired,
  initLogin: PropTypes.func.isRequired,
  submitSMS: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  Login: PropTypes.object,
  fetchUserState: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
  route: makeSelectRoute(),
});

function mapDispatchToProps(dispatch) {
  return {
    format: () => dispatch(formatState()),
    setStep: (param) => dispatch(setStep(param)),
    initRegister: (credentials) => dispatch(initRegister(credentials)),
    submitSMS: (credentials) => dispatch(registerSrpStep3(credentials)),
    initLogin: (credentials) => dispatch(initLogin(credentials)),
    logout: () => dispatch(logout()),
    fetchUserState: () => dispatch(fetchUserState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
