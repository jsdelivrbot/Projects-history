/**
*
* SymbolText
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './SymbolText-styles.scss';

class SymbolText extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {this.props.symbolTitle && (
          <div className={styles.SymbolText__Title}>
            {this.props.symbolTitle}
          </div>
        )}
        <pre className={styles.SymbolText__Content}>
          <Highlighter
            highlightClassName={styles.Highlight}
            searchWords={[this.props.searchKeys]}
            textToHighlight={this.props.symbolContent}
          />
        </pre>
      </div>
    );
  }
}

SymbolText.propTypes = {
  symbolTitle: PropTypes.string,
  symbolContent: PropTypes.string.isRequired,
  searchKeys: PropTypes.string,
};

export default SymbolText;
