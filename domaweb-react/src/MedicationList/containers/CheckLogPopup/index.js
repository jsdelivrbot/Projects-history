/*
 *
 * CheckLogPopup
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { toggleCheckLog } from '../MedListView/actions';
import { createStructuredSelector } from 'reselect';
import { selectCheckLog } from '../MedListView/selectors';

export class CheckLogPopup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { toggle, children, status } = this.props;
    console.log(this.props);
    return (
      <span onClick={() => toggle(status)}>
        {children}
      </span>
    );
  }
}

CheckLogPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  status: selectCheckLog(),
});


function mapDispatchToProps(dispatch) {
  return {
    toggle: (status) => dispatch(toggleCheckLog(status)), 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckLogPopup);
