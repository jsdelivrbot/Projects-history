import React from 'react';
import PropTypes from 'prop-types';

import DynamicImage from '../../../DynamicImage';

import styles from './report-summary-styles.scss';

function getKeys(summary) {
  return Object.keys(summary);
}

function sortSelections(selections) {
  selections.sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    }
    return (a[0] < b[0]) ? -1 : 1;
  });
}

function splitArray(splitArr, arrToAdd) {
  let i = 0;
  splitArr.map(key =>
  arrToAdd[i++] = key.split('*'));
}

function mergeArrays(toMerge, toAddProp) {
  let i = 0;
  for (var property in toMerge) {
     toAddProp[i].push(toMerge[property]);
     i++;
  }
}

function ReportSummary(props) {

  let seperation = [];
  const values = [];
  const keyNames = getKeys(props.summary);

  // split array into different properties
  splitArray(keyNames, seperation);

  // merge the values and properties
  mergeArrays(props.summary, seperation)

  // Sort the values
  sortSelections(seperation);

  let i = 0;
  let prev = null;

  return (
    <div>
      <h3>Symbol Report Preview</h3>
      {
        seperation.map((key) => {
          const render = (
            <div className={prev !== key[0] ? styles.summary_wrapper : 0} key={i++}>
              { prev !== key[0] ?
              (<div className={styles.symbol_section}>
                <DynamicImage
                  imgName={key[1]}
                  folder={'symbols'}
                  defaultImg={'info'}
                  className={styles.symbol}
                  alt={key[1]}
                />
              </div>) : ''
          }
              <span className = {styles.symbol_heading_firstLevel}>{prev !== key[0] ? key[0] : ''}</span> {prev !== key[0] ? (<br />) : ''}
              {
              parseInt(key[2]) ? (<span>{key[3] !== 'textField' && key[3] !== 'radio' ? key[3] : (<span><span className = {styles.symbol_heading_secondLevel}>Free Text: </span> <span>{key[4]}</span></span>) }</span>) : (<span>{(<span className = {styles.symbol_heading_secondLevel}>{key[2]}</span>)} : {parseInt(key[3]) ? key[5] : key[3]}</span>)
           }
            </div>);
          prev = key[0];
          return render;
        })
      }
    </div>
  );
}

export default ReportSummary;
