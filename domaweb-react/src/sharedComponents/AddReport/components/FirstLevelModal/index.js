import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

import RadioButton from '../RadioButton';
import CheckBox from '../CheckBox';
import TextArea from '../TextArea';
import styles from './first-level-modal-styles.scss';

function addToSumarry(props, symbolData) {
  const id = `${props.firstParent}*${props.secondParent}`;
  props.summary(symbolData, { id, checked });
}

function getFields(symbols, props, heading) {
  if (symbols) {
    if (symbols.type === 'multi') {
      return (
      <form>
      <h2 className={styles.heading}>{heading}</h2>
        {
          symbols.children.map((symbol, i, arr) => {
            if (arr.length - 1 === i) {
              return (<TextArea
                key={symbol.id}
                summary={props.summary}
                id={`${props.selectedSymbol}*${symbol.id}*textField`}
                summaryUpto={props.summaryUpto}
                symbolData={symbol}
              />)
           }
            return (
              <CheckBox
                value={symbol.displayName}
                key={symbol.id}
                type={symbol.type}
                children={symbol.children.length !== 0 ? symbol.children : 0}
                firstParent={props.selectedSymbol}
                summary={props.summary}
                id={symbol.id}
                summaryUpto={props.summaryUpto}
                symbolData={symbol}
            />);
          }
         )
        }
      </form>
      );
    }

    else if (symbols.type === 'radio') {
      return (
      <form>
        <h2 className={styles.heading}>{heading}</h2>
        {
          symbols.children.map((symbol, i, arr) => {
            if (arr.length - 1 === i) {
              return (<TextArea
                key={symbol.id}
                summary={props.summary}
                id={`${props.selectedSymbol}*${symbol.id}*textField`}
                summaryUpto={props.summaryUpto}
                symbolData={symbol}
              />)
           }
            return (
              <RadioButton
              value={symbol.displayName}
              key={symbol.id}
              type={symbol.type}
              children={symbol.children.length !== 0 ? symbol.children : 0}
              summary= {props.summary}
              firstParent={props.selectedSymbol}
              id={symbol.id}
              summaryUpto={props.summaryUpto}
              symbolData={symbol}
            />);

          }

         )
        }
      </form>
      );
    }

     else if (symbols.type === 'text') {
       return (
         <form>
          <h2 className={styles.heading}>{heading}</h2>
           <TextArea
             key={symbols.id}
             summary={props.summary}
             id={`${props.selectedSymbol}*${symbols.id}*textField`}
             summaryUpto={props.summaryUpto}
             symbolData={symbol}
           />
         </form>
       );
     }
  }

  return (
    <div>
        Please select a symbol from left
    </div>
  );
  }


function FirstLevelModal(props) {
  const symbols = props.selectedSymbolList;
  const heading = props.selectedSymbol ? props.selectedSymbol.split('*')[0] : '';
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Please select an Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          getFields(symbols, props, heading)
    }
      </Modal.Body>
    </Modal>
  );
  }


export default FirstLevelModal;
