/**
*
* ReportItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Highlighter from 'react-highlight-words';

import { Row, Col } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import SymbolIcon from './../../../SymbolIcon';
import SymbolSelect from './../SymbolSelect';
import SymbolText from './../SymbolText';

import styles from './ReportItem-styles.scss';

class ReportItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const symbolEntries = this.props.symbolEntries && this.props.symbolEntries.map(entry =>
      <div key={shortid.generate()}>
        {entry.selectedLeafNode.type === 'select' ?
        (
          <SymbolSelect
            mainSymbol={entry.values[1]}
            subSymbols={
              entry.values.length > 2 ?
              entry.values.slice(2) :
              null
            }
            searchKeys={this.props.searchKeys}
          />
        ) :
        (
          <FormattedMessage {...messages.additionalDetails}>
            {additionalDetails => (
              <SymbolText
                symbolTitle={entry.values.length > 2 ? entry.values[1] : additionalDetails}
                symbolContent={entry.values.length > 2 ? entry.values[2] : entry.values[1]}
                searchKeys={this.props.searchKeys}
              />
            )}
          </FormattedMessage>
        )}
      </div>,
    );

    const reportContent = (
      <div className={styles.ReportItem__Content}>
        {this.props.freeText ?
          (
            <SymbolText
              symbolContent={this.props.freeText}
              searchKeys={this.props.searchKeys}
            />
          ) : symbolEntries
        }
      </div>
    );

    return (
      <div className={styles.ReportItem__Wrapper}>
        <Row className={styles.ReportItem__TitleRow}>
          <Col xs={12} sm={12}>
            {!this.props.textOnly && (
              <div className={styles.ReportItem__TitleRow__ReportIcon}>
                <SymbolIcon icon={this.props.mainSymbolIcon} />
              </div>
            )}
            <div className={styles.ReportItem__TitleRow__Title}>
              <Highlighter
                highlightClassName={styles.Highlight}
                searchWords={[this.props.searchKeys]}
                textToHighlight={this.props.mainSymbolName}
              />
            </div>
          </Col>
        </Row>
        <Row>
          {!this.props.textOnly ? (
            <Col xs={12} sm={11} smOffset={1}>
              {reportContent}
            </Col>
          ) : (
            <Col xs={12}>
              {reportContent}
            </Col>
          )}          
        </Row>
      </div>
    );
  }
}

ReportItem.propTypes = {
  mainSymbolName: PropTypes.string.isRequired,
  mainSymbolIcon: PropTypes.string.isRequired,
  symbolEntries: PropTypes.array,
  freeText: PropTypes.string,
  searchKeys: PropTypes.string,
  textOnly: PropTypes.bool,
};

export default ReportItem;
