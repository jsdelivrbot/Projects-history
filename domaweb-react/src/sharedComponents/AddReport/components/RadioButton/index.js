import React from 'react';
import PropTypes from 'prop-types';

import CustomModal from '../CustomModal';

import styles from './radio-button-styles.scss';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
    this.checked = false;
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }

  addToSumarry = () => {
    const id = `${this.props.firstParent}*${this.props.id}*radio`;
    this.props.summary(this.props.symbolData, { id, checked: this.checked });
  }

  render() {
    let selectedFunction = this.props.children.length ? this.handleShow : this.addToSumarry;
    this.checked = this.props.summaryUpto[`${this.props.firstParent}*${this.props.id}*radio`] === this.props.value;

    return (
      <span className={styles.space}>
        <input
          type="radio"
          id={`${this.props.firstParent}*${this.props.id}*radio`}
          name={'field'}
          onClick={selectedFunction}
          value={this.props.value}
          checked={this.checked}
        />
        <label htmlFor={this.props.value}>{this.props.value}</label>
        {this.props.children.length ? <CustomModal
          show={this.state.showModal}
          handleClose={this.handleClose}
          firstParent={this.props.firstParent}
          secondParent={this.props.value}
          children={this.props.children ? this.props.children : []}
          summary={this.props.summary}
          summaryUpto={this.props.summaryUpto}
        /> : ''
      }
      </span>
    );
  }
}

export default RadioButton;
