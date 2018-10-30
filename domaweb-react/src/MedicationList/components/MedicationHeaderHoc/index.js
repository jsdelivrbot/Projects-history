import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  backgroundColor: '#ee1f79',
  color: 'white',
};

const HeaderHoc = ({children}) => <div style={styles}>{children && children}</div>

export default HeaderHoc;
