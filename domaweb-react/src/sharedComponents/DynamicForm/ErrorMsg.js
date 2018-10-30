import React from 'react'; 
import PropTypes from 'prop-types';
import { onlyUpdateForKeys, flattenProp, renameProp } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Popover, Overlay, Tooltip } from 'react-bootstrap';

//USAGE INSTRUCTIONS AT THE END OF FILE

const ErrorMsg = (name, selector) => (WrappedComponent) => {
  // ...and returns another component...
  const onlyUpdate = onlyUpdateForKeys(['required', 'value']);
  //console.log(selector);
  class FormComponent extends React.Component {
    render() {
      console.log(this.props);
      const { errorMsg } = this.props;
      return <div>
        {/*errorMsg && <Popover>{errorMsg}</Popover>*/}
        <WrappedComponent {...this.props} />
        <Tooltip placement="top">shit</Tooltip>
      </div>
    }
  };
  const mapStateToProps = createStructuredSelector({
    errorMsg: selector(name),
  });

  return connect(mapStateToProps)(onlyUpdate(FormComponent));
}

export default ErrorMsg;