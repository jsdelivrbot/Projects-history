/**
*
* Smsverification
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import  {Grid, Row, Col, Button, ProgressBar, Jumbotron} from 'react-bootstrap';

import messages from './messages';
import styles from '../../containers/Login/Login-styles.scss';

const MAX_ATTEMPTS = 3;

class Smsverification extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      attempts: 0,
      submitting: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error === true) {
      this.setState({
        submitting: false,
        attempts: nextProps.errorCode === 'INVALID_LOGIN_TOKEN_DEFAULT' ?
          this.state.attempts + 1 : this.state.attempts,
      }, () => {
        if (this.state.attempts === MAX_ATTEMPTS) {
          this.props.onMaxAttemptReached();
        }
      });
    }
  }

  updateSms = (e) => {
    this.setState({ token: e.target.value });
  }

  handleSubmit = (e) => {
    this.setState({
      submitting: true,
    }, () => {
      this.props.submit(this.state);
    });
    e.preventDefault();
  }

  render() {
    const domacareLogo = require('../../../assets/images/brand/DomaCare_color_RGB_black_text.svg');

    return (
      <Row>
        <div className={styles.centered}>
          <form className={styles.login} onSubmit={this.handleSubmit}>
            <div className={styles.login__logo}>
              <img src={domacareLogo} className={styles.logo__img} />
            </div>

            <p className={styles.login__label}>Syötä SMS-varmenne</p>
            {this.state.attempts > 0 &&
              <p
                style={{
                  color: 'red',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                SMS-varmennus epäonnistui.<br />
                Sinulla on {MAX_ATTEMPTS - this.state.attempts} yritystä jäljellä.
              </p>
            }

            <fieldset>
              <div className={styles.input}>
                <input
                  type="tel"
                  value={this.state.token}
                  onChange={this.updateSms}
                  placeholder="SMS-varmenne"
                  autoFocus
                  maxLength={6}
                  pattern="\d*"
                />
              </div>

              <button
                className={`${styles.btn__login__invian} btn btn-lg btn-block`}
                type="submit"
                disabled={
                  this.state.token.length !== 6 ||
                  !Number.isInteger(Number(this.state.token)) ||
                  this.state.submitting
                }
              >
                LÄHETÄ
              </button>
            </fieldset>
          </form>
        </div>
      </Row>
    );
  }
}

Smsverification.propTypes = {
  submit: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  onMaxAttemptReached: PropTypes.func,
};

export default Smsverification;
