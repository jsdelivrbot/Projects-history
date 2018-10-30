import React from 'react';
import PropTypes from 'prop-types';

import styles from './HeaderLabel-styles.scss';

class HeaderLabel extends React.Component {
  render() {
    return (<h5
              className={styles.header__label}
              style={{color: this.props.headercolor}}
            >
              {this.props.labeltext}
            </h5>
          );
  }
}

HeaderLabel.propTypes = {
  /**
  * header label color
  */
  headercolor: PropTypes.string,
  /**
  * label text
  */
  labeltext: PropTypes.string,
};


export default HeaderLabel;
