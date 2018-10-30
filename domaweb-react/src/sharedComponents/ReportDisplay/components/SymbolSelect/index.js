/**
*
* SymbolSelect
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './SymbolSelect-styles.scss';

class SymbolSelect extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const textToDisplay = `${this.props.mainSymbol}${this.props.subSymbols && this.props.subSymbols.length > 0 ? `  (${this.props.subSymbols.join(' → ')})` : ''}`;
    return (
      <li>
        <Highlighter
          highlightClassName={styles.Highlight}
          searchWords={[this.props.searchKeys]}
          textToHighlight={textToDisplay}
        />
      </li>
    );
  }
}

SymbolSelect.propTypes = {
  mainSymbol: PropTypes.string.isRequired,
  subSymbols: PropTypes.array,
  searchKeys: PropTypes.string,
};

export default SymbolSelect;
