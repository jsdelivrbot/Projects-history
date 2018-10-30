/* eslint-disable class-methods-use-this, jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FormInput } from 'components';
import { reduxForm, Field } from 'redux-form';
import { loginRequest } from 'redux-base/actions/loginFlow';
// import loginFormValidation from './form/validation';
import { loginForm, loginButton } from './LoginPage.scss';

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = {
  loginRequest,
  push
};

const reduxFormConfig = {
  form: 'loginPageForm',
  initialValues: {
    email: '',
    password: ''
  }
  // validate: loginFormValidation
};

export class LoginPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.push('/loading');
    }
  }

  handleLogin = ({ email, password }) => {
    this.props.loginRequest(email, password);
  };

  render() {
    const {
      handleSubmit
    } = this.props;

    return (
      <form className={ loginForm }>
        <Row middle="xs">
          <Col xs md lg>
            <Field
              name="email"
              placeholder="Email"
              type="email"
              prefix={ <Icon type="user" style={ { fontSize: 13 } } /> }
              component={ FormInput }
            />
          </Col>
        </Row>
        <Row middle="xs">
          <Col xs md lg>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              prefix={ <Icon type="lock" style={ { fontSize: 13 } } /> }
              component={ FormInput }
            />
          </Col>
        </Row>
        <Row middle="xs">
          <Col xs md lg>
            <Button
              className={ loginButton }
              type="primary"
              onClick={ handleSubmit(this.handleLogin) }
            >
              Log in
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

LoginPage.propTypes = {
  // props
  user: PropTypes.object,
  // redux-base
  loginRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(LoginPage));
