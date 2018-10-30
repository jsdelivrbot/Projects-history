/*
 *
 * ErrorContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectErrorContainer from './selectors';

export class ErrorContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          ...this.props,
        })}
      </div>
    );
  }
}

ErrorContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ErrorContainer: makeSelectErrorContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
