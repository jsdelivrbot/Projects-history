import 'styles/main.scss';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider, message } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ConnectedHeader, Footer, Breadcrumb } from 'components';
import {
  logoutRequest,
  clearErrorMessage
} from 'redux-base/actions';
import parseError from './parseError';
import styles from './CoreLayout.scss';

const mapStateToProps = state => ({
  errorMessage: state.error.errorMessage,
  errorStatus: state.error.errorStatus,
  successMessage: state.success.successMessage,
  user: state.login.user,
  commonDataLoaded: state.commonData.commonDataLoaded
});

const mapDispatchToProps = {
  logoutRequest,
  clearErrorMessage
};

export class CoreLayout extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      errorMessage,
      errorStatus,
      successMessage
    } = nextProps;

    if (errorMessage) {
      message.error(parseError(errorMessage, errorStatus, this.props.logoutRequest), 3, this.props.clearErrorMessage);
    }

    if (successMessage) {
      message.success(successMessage, 3);
    }
  }

  render() {
    const {
      children,
      location,
      user,
      commonDataLoaded
    } = this.props;

    const pathnames = location.pathname.split('/');

    return (
      <LocaleProvider locale={ enUS }>
        <div id="content" className={ styles.content }>
          <ConnectedHeader />
          { user && commonDataLoaded && <Breadcrumb pathnames={ pathnames } /> }
          <main id="main" className={ styles.main }>
            { children }
          </main>
          <Footer />
        </div>
      </LocaleProvider>
    );
  }
}

CoreLayout.propTypes = {
  // props
  user: PropTypes.object,
  commonDataLoaded: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  errorStatus: PropTypes.number,
  successMessage: PropTypes.string,
  children: PropTypes.node,
  // router
  location: PropTypes.object,
  // redux-base
  logoutRequest: PropTypes.func.isRequired,
  clearErrorMessage: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoreLayout));
