/**
*
* ExpandableHeader
* TAKES PROPS COLOR AND NUMBER. COLOR DEFINES THE COLOR, NUMBER DEFINES THE
* NICE LITTLE NUMBER APPEARING IN RIGHT CORNER
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-bootstrap';
import messages from './messages';
//import AddButton from '../AddButton';
import styles from './expandableHeader.scss';

class ExpandableHeader extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const { color } = this.props;
    const backGround = {
      'background-color': color,
    };

    const buttonBackground = {
      'color': color,
      'background-color': styles.$secondary_text_color,
    }
    return (
      <div>
        <Col onClick={this.toggle} lg={12} md={12} sm={12} xs={12} className={styles.header} style={backGround}>
            <span className={styles.expand_button} style={buttonBackground}>
              {!this.state.show &&
                <span className={styles.icon}>
                  +
                </span>
              }
              {this.state.show &&
                <span className={styles.icon}>
                  –
                </span>
              }
            </span>

          {this.props.text}
          {this.props.number &&
            <span className={styles.number}>{this.props.number}</span>
          }
        </Col>
        {this.state.show &&
          <Col lg={12} md={12} sm={12} xs={12}>
            {this.props.children}
          </Col>
        }
      </div>
    );
  }
}

ExpandableHeader.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  number: PropTypes.string,
};

export default ExpandableHeader;
