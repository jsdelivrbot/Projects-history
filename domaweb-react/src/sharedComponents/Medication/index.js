/*
 *
 * Medication Wrapper
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { renameProp, onlyUpdateForKeys, pure } from 'recompose';

const MedicationWrapperHoc = (selector, dispatchToProps = null, rename = 'list') => (WrappedComponent) => {
  // ...and returns another component...
  const onlyUpdate = onlyUpdateForKeys([rename]);
  class MedicationWrapper extends React.Component {
    render() {
      return (
      <div>
        <WrappedComponent {...this.props} />
      </div>);
    }
  }

  const mapStateToProps = createStructuredSelector({
    [rename]: selector(),
  });
  
  return connect(mapStateToProps, dispatchToProps)(onlyUpdate(MedicationWrapper));
}
export default MedicationWrapperHoc;
/*

const MedicationWrapper = (props) => (WrappedComponent) => {
  console.log('Medwrapper');
  console.log(props);
  return (
    <div>
      <WrappedComponent info={...props} />
    </div>
  );
}

export default MedicationWrapper;
*/