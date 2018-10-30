import React from 'react'; 
import PropTypes from 'prop-types';
import { onlyUpdateForKeys, flattenProp, renameProp } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

//USAGE INSTRUCTIONS AT THE END OF FILE

const RequiredWrapper = (name, selector) => (WrappedComponent) => {
  // ...and returns another component...
  const onlyUpdate = onlyUpdateForKeys(['required', 'value']);
  //console.log(selector);
  class FormComponent extends React.Component {
    render() {
      console.log(this.props);
      return <WrappedComponent {...this.props} />;
    }
  };
  const mapStateToProps = createStructuredSelector({
    required: selector(name),
  });

  return connect(mapStateToProps)(onlyUpdate(FormComponent));
}

export default RequiredWrapper;
