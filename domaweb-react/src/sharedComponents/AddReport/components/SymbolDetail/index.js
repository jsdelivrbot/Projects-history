import React from 'react';
import PropTypes from 'prop-types';

import RadioButton from '../RadioButton';
import CheckBox from '../CheckBox';
import TextArea from '../TextArea';

import styles from './symbol-detail-styles.scss';

function SymbolDetail(props) {

  const symbols = props.selectedSymbolList; // Get the selected symbol childrens
  const heading = props.selectedSymbol ? props.selectedSymbol.split('*')[0] : ''; // Create the heading from selectedSymbol by removing *

  if (symbols) {
    if (symbols.type === 'multi') { // If symbol type is multi, render the checkboxes.
      return (
      <form>
      <h2 className={styles.heading}>{heading}</h2>
        {
           // Go through selected symbol first level child and render it
          symbols.children.map((symbol, i, arr) => {
            if (arr.length - 1 === i) { // Usually text areas comes in the end
              return (<TextArea
                key={symbol.id}
                summary={props.summary}
                id={`${props.selectedSymbol}*${symbol.id}*textField`}
                summaryUpto={props.summaryUpto}
                symbolData={symbol}
              />)
           }
            // If not check box, render the checkbox, add the first parent
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
      // If symbol type is radio, render the radio bttn
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
    // If the type is text, render text area
     else if (symbols.type === 'text') {
       return (
         <form>
          <h2 className={styles.heading}>{heading}</h2>
           <TextArea
             key={symbols.id}
             summary={props.summary}
             id={`${props.selectedSymbol}*${symbols.id}*textField`}
             summaryUpto={props.summaryUpto}
             symbolData={symbols}
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

export default SymbolDetail;
