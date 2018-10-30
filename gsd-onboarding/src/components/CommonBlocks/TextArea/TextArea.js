import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export const TextArea = (props) => {
  return (
 		<TextField
      style={ props.style }
 			className="text-input"
      hintText="User Defined"
      fullWidth={ props.fullwidth }
    />
  );
};

TextArea.propTypes = {
  fullwidth: PropTypes.bool,
  style: PropTypes.object,
};