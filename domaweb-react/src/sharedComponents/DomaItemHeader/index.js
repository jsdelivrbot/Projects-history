/**
*
* DomaTabHeader
*
*/

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';

import { Row, Col } from 'react-bootstrap';
import { pencil } from 'react-icons-kit/icomoon/pencil';
import { bin } from 'react-icons-kit/icomoon/bin';
import { printer } from 'react-icons-kit/icomoon/printer';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './DomaItemHeader-styles.scss';

class DomaItemHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  editItem = () => {
    if (this.props.onEdit) {
      this.props.onEdit(this.props.value);
    }
  }

  removeItem = () => {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.value);
    }
  }

  printItem = () => {
    if (this.props.onPrint) {
      this.props.onPrint(this.props.value);
    }
  }

  render() {
    const colorStyles = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.textColor,
    };

    return (
      <Row
        style={colorStyles}
        className={this.props.className ? `${styles.DomaItemHeader} ${this.props.className}` : styles.DomaItemHeader}
      >
        <Col xs={4} sm={3}>
          {moment(this.props.date).format('DD.MM.YYYY HH:mm')}
        </Col>
        <Col xs={5} sm={7}>
          {this.props.name}
        </Col>
        <Col xs={3} sm={2} className={styles.DomaItemHeader__IconGroup}>
          {this.props.onEdit &&
            <Icon
              className={styles.DomaItemHeader__IconGroup__Icon}
              icon={pencil}
              onClick={() => this.editItem()}
            />
          }
          {this.props.onRemove &&
            <Icon
              className={styles.DomaItemHeader__IconGroup__Icon}
              icon={bin}
              onClick={() => this.removeItem()}
            />
          }
          {this.props.onPrint &&
            <Icon
              className={styles.DomaItemHeader__IconGroup__Icon}
              icon={printer}
              onClick={() => this.printItem()}
            />
          }
        </Col>
      </Row>
    );
  }
}

DomaItemHeader.propTypes = {
  /**
   * Display name on the header.
   */
  date: PropTypes.string.isRequired,
  /**
   * Display name on the header.
   */
  name: PropTypes.string.isRequired,
  /**
   * The value to be emitted onEdit and onRemove.
   */
  value: PropTypes.any.isRequired,
  /**
   * Background color of the header.
   */
  backgroundColor: PropTypes.string,
  /**
   * Text color of the header.
   */
  textColor: PropTypes.string,
  /**
   * Callback handler when 'Edit' is clicked.
   */
  onEdit: PropTypes.func,
  /**
   * Callback handler when 'Remove' is clicked.
   */
  onRemove: PropTypes.func,
  /**
   * Callback handler when 'Print' is clicked.
   */
  onPrint: PropTypes.func,
  /**
   * Custom class name
   */
  className: PropTypes.string,
  /**
   * Custom styles object
   */
  styles: PropTypes.object,
};

DomaItemHeader.defaultProps = {
  backgroundColor: '#3da8f4',
  textColor: '#ffffff',
};

export default DomaItemHeader;
