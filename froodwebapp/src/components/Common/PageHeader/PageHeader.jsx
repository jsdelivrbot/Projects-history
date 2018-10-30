import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHeader.scss';

const PageHeader = ({ bigText, smallText }) => (
  <div className={ styles.settigsHeader }>
    <div>
      { bigText }
    </div>
    <div>
      { smallText }
    </div>
  </div>
);

PageHeader.propTypes = {
  bigText: PropTypes.string.isRequired,
  smallText: PropTypes.string,
};

export default PageHeader;
