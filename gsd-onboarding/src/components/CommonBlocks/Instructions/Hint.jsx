import React from 'react';
import PropTypes from 'prop-types';

export const Hint = (props) => {
  return (
    <div>
      <h6>{props.header}</h6>
      <p>{props.main}</p>
    </div>
  );
};

Hint.propTypes = {
  header: PropTypes.string,
  main: PropTypes.string
};
