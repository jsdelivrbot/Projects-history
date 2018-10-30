import React from 'react';
import PropTypes from 'prop-types';

import DynamicImage from '../../../DynamicImage';

import styles from './symbol-styles.scss';

function Symbol(props) {
  let inSummary = false;

    Object.keys(props.summaryUpto).some(function(key,index) {
        if (key.split('*')[0] == props.displayName) {
            inSummary = true;
            return true;
        }
  });

  return (
    <div
    className={`${styles.symbolWarper} ${props.selectedSymbol == `${props.displayName}*${props.symbol}` ? styles.selected : ''} ${inSummary ? `${styles.selectedInSummary} ${styles.selectedColor}` : ''}                `}
    onClick={() => {props.selectSymbol(props.id, `${props.displayName}*${props.symbol}`); window.matchMedia('(max-width: 992px)').matches? props.openModel() : ''; }}
    >
      {/*
          In above, first check if the selcted symbol is the current one, use the selected style.
          Add the onClick handler if the screen is less then 992px
      */}
      <div className={styles.space}>
        <DynamicImage
          imgName={props.symbol}
          folder={'symbols'}
          className={styles.symbol}
          defaultImg={'info'}
          alt={props.alt}
        />
        <span className={styles.symbol_text}>{props.displayName}</span>
      </div>
    </div>
  );
}

export default Symbol;
