/**
*
* FieldRequired
*
*/

import React from 'react'; 
 import PropTypes from 'prop-types'
// import styled from 'styled-components';
import styles from './fieldRequired.scss';


class FieldRequired extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { required, component } = this.props;
    const NewComponent = () => component;
    if (component) {
      return (
        <span>
          {required && <NewComponent />}
        </span>
      );
    }
    return (
      <span className={styles.style}>
        {required && <b>*</b>}
      </span>
    );
  }
}

FieldRequired.propTypes = {
  required: PropTypes.bool,
  component: PropTypes.component,
};

export default FieldRequired;
