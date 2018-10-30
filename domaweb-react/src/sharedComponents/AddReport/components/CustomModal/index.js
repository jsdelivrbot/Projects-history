import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

import TextArea from '../TextArea';
import styles from './custom-modal-styles.scss';

let checked;

function addToSumarry(props, symbolData) {
  const id = `${props.firstParent}*${props.secondParent}`;
  props.summary(symbolData, { id, checked });
}

 function getCheckboxes(symbol, props) {
  checked = props.summaryUpto[`${props.firstParent}*${props.secondParent}`] === symbol.displayName;
  return (
    <span className={styles.space}>
      <input
        type="checkbox"
        id={`${props.firstParent}*${props.firstParent}`}
        firstparent={props.firstParent}
        value={symbol.displayName}
        key={symbol.id}
        onClick={()=> {addToSumarry(props, symbol); props.handleClose();}}
        checked={checked}
      />
      <label htmlFor={symbol.id}>{symbol.displayName}</label>
    </span>
  );
}

  function getRadioBoxes(symbol, props) {
    return (
      <span className={styles.space}>
        <input
          type="radio"
          id={`${props.firstParent}*${props.secondParent}`}
          name={'field'}
          firstparent={props.firstParent}
          value={symbol.displayName}
          key={symbol.id}
          onClick={() => { addToSumarry(props, symbol); props.handleClose(); }}
          checked={props.summaryUpto[`${props.firstParent}*${props.secondParent}`] === symbol.displayName}
        />
        <label htmlFor={symbol.id}>{symbol.displayName}</label>
      </span>
    );
  }

  function getTextField (symbol, props) {
    return (<TextArea
      key={symbol.id}
      summary={props.summary}
      id={`${props.firstParent}*${props.secondParent}*${symbol.id}*textField`}
      summaryUpto={props.summaryUpto}
      symbolData={symbol}
    />);
  }

function CustomModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Please select an Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
      props.children.map((symbol, i, arr) => {
        if (symbol.type == 'text') {
          return getTextField(symbol, props);
        } else if (props.type == 'radio') {
          return getRadioBoxes(symbol, props);
        } else if (props.type == 'text') {
          return getTextField(symbol);
        } else if (props.type == 'multi') {
          return getCheckboxes(symbol, props);
        }
      })
    }
      </Modal.Body>
    </Modal>
  );
  }


export default CustomModal;
