/*
 *
 * Logout
 *
 */

import React from 'react'; 
 import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectLogout from './selectors';
import { defaultAction } from './actions'

export class Logout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Logout: makeSelectLogout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logout: () => dispatch(defaultAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
