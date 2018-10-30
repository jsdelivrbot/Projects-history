import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import BulkMenuBodyItem from './BulkMenuBodyItem';
import styles from './BulkMenu.scss';

class BulkMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }

  handleToggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  render() {
    const { menuVisible } = this.state;
    const { selectedRowsNumber } = this.props;

    return (
      <div className={ styles.bulkMenu }>
        <div className={ styles.bulkMenuHeader }>
          Actions
          { ` (${selectedRowsNumber} selected)` }
          <FontAwesome
            className={ classnames('fa-caret-down', styles.bulkMenuToggleIcon) }
            name="fa-caret-down"
            onClick={ this.handleToggleMenu }
          />
        </div>
        { menuVisible &&
          <div className={ styles.bulkMenuBody }>
            <div className={ styles.bulkMenuBodyHeader }>
              WORKFLOW
            </div>
            <BulkMenuBodyItem
              icon="fa-check-square-o"
              onClick={ () => {} }
              text="Confirm"
            />
            <BulkMenuBodyItem
              icon="fa-pencil-square-o"
              onClick={ () => {} }
              text="Allocate"
            />
            <BulkMenuBodyItem
              icon="fa-shopping-cart"
              onClick={ () => {} }
              text="Create Pick List"
            />
            <BulkMenuBodyItem
              icon="fa-gift"
              onClick={ () => {} }
              text="Pack"
            />
            <BulkMenuBodyItem
              icon="fa-truck"
              onClick={ () => {} }
              text="Ship"
            />
            <div className={ styles.bulkMenuBodyHeader }>
              DOCUMENTS
            </div>
            <BulkMenuBodyItem
              icon="fa-sign-out"
              onClick={ () => {} }
              text="Download Invoice"
            />
            <div className={ styles.bulkMenuBodyHeader }>
              ACTIONS
            </div>
            <BulkMenuBodyItem
              icon="fa-sign-out"
              onClick={ () => {} }
              text="Assign"
            />
          </div>
        }
      </div>
    );
  }
}

BulkMenu.propTypes = {
  selectedRowsNumber: PropTypes.number.isRequired,
};

export default BulkMenu;
