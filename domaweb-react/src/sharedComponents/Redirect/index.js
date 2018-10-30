/*
 *
 * Redirect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

import AuthRequired from '../AuthRequired';
import Spinner from '../Spinner';
import { taskRedirect } from '../../utils/routeUtil';

import makeSelectRedirect from './selectors';

export class Redirect extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.redirect(taskRedirect());
  }
  render() {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
}

Redirect.propTypes = {
  redirect: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Redirect: makeSelectRedirect(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: (url) => dispatch(push(url)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRequired(Redirect));
