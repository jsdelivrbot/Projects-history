/*
 *
 * AuthRequired
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectAuthRequired from './selectors';
import { checkLoginStatus } from './actions';
//import { selectAuth } from './selectors';

export default function AuthRequired(Component) {
  class AuthComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
  //    console.log('authrequired mounted');
      this.props.checkLogin();
    }
    /*shouldComponentUpdate(nextProps) {
      if (nextProps.AuthRequired.login !== this.props.AuthRequired.login) {
        return true;
      } return false;
    }*/
    render() {
    //  console.log(this.props);
      if (this.props.AuthRequired.login === true) {
        return (
          <div>
            <Component {...this.props} />
          </div>
        );
      }
      else {
        return null;
      }
    }
  }

  AuthRequired.propTypes = {
    redirect: PropTypes.func.isRequired,
    default: PropTypes.func.isRequired,
  };

  const mapStateToProps = createStructuredSelector({
    AuthRequired: makeSelectAuthRequired(),
  });

  function mapDispatchToProps(dispatch) {
    return {
      redirect: (url) => dispatch(push(url)),
      checkLogin: () => dispatch(checkLoginStatus()),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}
