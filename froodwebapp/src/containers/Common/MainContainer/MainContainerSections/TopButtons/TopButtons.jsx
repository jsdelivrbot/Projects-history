import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Button, ActionButton } from 'components';
import { push } from 'react-router-redux';
import {
  topButton,
  topButtons,
  keyIndicators
} from './TopButtons.scss';

const mapDispatchToProps = { push };

export class TopButtons extends Component {
  handleNewButtonClick = () => {
    this.props.push(this.props.newButtonLink);
  }

  render() {
    const {
      statsEnabled = false,
      statsVisible,
      handleToggleStats,
      newButtonVisible = false,
      newButtonText,
      exportButton = false,
      onExportButtonClick,
      printButton = false,
      printButtonText = 'Print',
      onPrintButtonClick
    } = this.props;
    return (
      <div className={ topButtons }>
        { statsEnabled &&
          <Button
            className={ keyIndicators }
            onClick={ handleToggleStats }
          >
            <FontAwesome
              className="fa-bar-chart"
              name="fa-bar-chart"
            />
            Key Indicators
            <FontAwesome
              className={ statsVisible ? 'fa-angle-up' : 'fa-angle-down' }
              name={ statsVisible ? 'fa-angle-up' : 'fa-angle-down' }
            />
          </Button>
        }
        { exportButton &&
          <ActionButton
            onClick={ onExportButtonClick }
          >
            Export
          </ActionButton>
        }
        { newButtonVisible &&
          <ActionButton
            className={ topButton }
            onClick={ this.handleNewButtonClick }
          >
            { newButtonText }
          </ActionButton>
        }
        { printButton &&
        <Button
          className={ topButton }
          onClick={ onPrintButtonClick }
        >
          <FontAwesome
            className="fa-th"
            name="fa-th"
          />
          { printButtonText }
        </Button>
        }
      </div>
    );
  }
}

TopButtons.propTypes = {
  newButtonVisible: PropTypes.bool,
  statsEnabled: PropTypes.bool,
  statsVisible: PropTypes.bool,
  handleToggleStats: PropTypes.func,
  exportButton: PropTypes.bool,
  onExportButtonClick: PropTypes.func,
  newButtonText: PropTypes.string,
  newButtonLink: PropTypes.string,
  printButton: PropTypes.bool,
  printButtonText: PropTypes.string,
  onPrintButtonClick: PropTypes.func,
  // router
  push: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TopButtons);
