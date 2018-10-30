/**
*
* RegisterByPhone
*
*/

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import  {Grid, Row, Col, Button, ProgressBar, Jumbotron} from 'react-bootstrap';

import messages from './messages';
import styles from '../../containers/Login/Login-styles.scss';


let RegExpMobileNumber = /^$|^\d{9,11}$/;

const validate = (phoneNumber, userName, password) => {
  // true means invalid, so our conditions got reversed
  return {
    phoneNumber: phoneNumber.length === 0,
    userName: userName.length === 0,
    password: password.length === 0,
  };
}


class RegisterByPhone extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props);
    this.state = {
      phoneNumber: '',
      userName: '',
      password:'',
      showError: this.props.errorstatus,
      touched: {
        phoneNumber: false,
        userName: false,
        password: false
      }
    };
    this.updatePhone = this.updatePhone.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleBlur = this.handleBlur.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { showError } = this.state;
    if (showError !== nextProps.errorstatus) {
      this.setState({
        showError: nextProps.errorstatus,
      });
    }
  }

  updatePhone(e) {
    this.setState({phoneNumber: e.target.value});
  }

  updateUserName(e) {
    this.setState({userName: e.target.value});
  }

  updatePassword(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
    // canBeSubmitted is not true than don't dispatch sumbit action
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    // else dispatch submit
    this.props.submit(this.state);
    e.preventDefault();
  }

  canBeSubmitted() {
    const errors = validate(this.state.phoneNumber, this.state.userName, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  // handle input blur
  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  render() {
    const domacareLogo = require('../../../assets/images/brand/DomaCare_color_RGB_black_text.svg');
    const errors = validate(this.state.phoneNumber, this.state.userName, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };
    const { showError } = this.state;
    const { message } = this.props;
    console.log(showError)

    return (
      <Row>
        <div className={styles.centered}>
          <form className={styles.login} onSubmit={this.handleSubmit}>
            <div className={styles.login__logo}>
              <img src={domacareLogo} className={styles.logo__img} />
            </div>

            <p className={styles.login__label}>Laitteen rekisteröinti</p>
            {showError && <p style={{color: 'red', padding: '12px', textAlign:'center', marginTop: '10px'}}>{message}</p>}

            <fieldset>
              <div className={styles.input}>
                <input
                  type="tel"
                  placeholder="Puhelinnumero"
                  value={this.state.phoneNumber}
                  onChange={this.updatePhone}
                  onBlur={this.handleBlur("phoneNumber")}
                  autoFocus
                />
              </div>

              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="Käyttäjätunnus"
                  autoCorrect="off"
                  autoCapitalize="none"
                  value={this.state.userName}
                  onChange={this.updateUserName}
                  onBlur={this.handleBlur("userName")}
                />
              </div>

              <div className={styles.input}>
                <input
                  type="password"
                  placeholder="Salasana"
                  value={this.state.password}
                  onChange={this.updatePassword}
                  onBlur={this.handleBlur("password")}
                />
              </div>

              <button
                disabled={isDisabled}
                className={`${styles.btn__login__invian} btn btn-lg btn-block`}
                type="submit">LÄHETÄ
              </button>
            </fieldset>
          </form>
        </div>
      </Row>
    );
  }
}


RegisterByPhone.propTypes = {
  submit: PropTypes.func.isRequired,
  message: PropTypes.string,
  errorstatus: PropTypes.oneOf([true, false]),
};



function mapStateToProps(state) {
  const normalizedState = state.get('login', immutable.Map()).toJS();
  return {
    message: normalizedState.errorMessage,
    errorstatus: normalizedState.error,
  };
}

export default connect(mapStateToProps, null)(RegisterByPhone);
