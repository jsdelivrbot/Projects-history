import React from 'react';
import PropTypes from 'prop-types';

import CustomModal from '../CustomModal';
import styles from './checkbox-styles.scss';

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.checked = false;
  }

  handleClose = () =>{
    this.setState({ showModal: false });
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }

  addToSumarry = () => {
    const id = `${this.props.firstParent}*${this.props.id}`;
    this.props.summary(this.props.symbolData, { id, checked: this.checked });
  }

  render() {
    let selectedFunction = this.props.children.length ? this.handleShow : this.addToSumarry;
    this.checked = this.props.summaryUpto[`${this.props.firstParent}*${this.props.id}`] === this.props.value || this.props.summaryUpto.hasOwnProperty(`${this.props.firstParent}*${this.props.value}`);

    return (
      <span className={styles.space}>
         <input
           type="checkbox"
           id={`${this.props.firstParent}*${this.props.id}`}
           name={this.props.value}
           value={this.props.value}
           checked={this.checked}
           onClick={selectedFunction}
         />
         <label htmlFor={this.props.value}>{this.props.value}</label>
         {this.props.children.length ? <CustomModal
           show={this.state.showModal}
           handleClose={this.handleClose}
           firstParent={this.props.firstParent}
           secondParent={this.props.value}
           children={this.props.children ? this.props.children : []}
           type={this.props.type}
           summary={this.props.summary}
           summaryUpto={this.props.summaryUpto}
         /> : ''
       }
     </span>
       );
   }
}

export default CheckBox;
