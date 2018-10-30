/**
*
* Report
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import DomaItemHeader from './../../../DomaItemHeader';
import ReportItem from './../ReportItem';

import styles from './Report-styles.scss';

class Report extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const report = this.props.report;
    
    const renderReportItems = report.symbolRepresentations.map(symbol => (
      <div
        key={shortid.generate()}
        className={styles.Report__ReportItem}
      >
        {symbol.entries.length > 0 ?
          <ReportItem
            mainSymbolName={symbol.shownSymbolNode.reportName}
            mainSymbolIcon={symbol.shownSymbol}
            symbolEntries={symbol.entries}
            searchKeys={this.props.searchKeys}
            textOnly={this.props.textOnly}
          /> :
          <FormattedMessage {...messages.freeText}>
            {freeText => (
              <ReportItem
                mainSymbolName={freeText}
                mainSymbolIcon={'info'}
                freeText={symbol.text}
                searchKeys={this.props.searchKeys}
                textOnly={this.props.textOnly}
              />
            )}
          </FormattedMessage>
        }
      </div>
    ));

    const reportCreatorName = `${report.editingUser.firstName || ''} ${report.editingUser.lastName || ''}`;

    return (
      <div className={`${styles.Report}${this.props.hideOnPrint ? ` ${styles.Report_PrintHidden}` : ''}`}>
        <DomaItemHeader
          className={styles.Report__Header}
          date={report.eventTime}
          name={reportCreatorName}
          value={report.id}
          // onEdit={this.props.onEdit}
          // onRemove={this.props.onDelete}
          onPrint={this.props.onPrint}
          searchKeys={this.props.searchKeys}
        />
        {renderReportItems}
      </div>
    );
  }
}

Report.propTypes = {
  report: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  searchKeys: PropTypes.string,
  textOnly: PropTypes.bool,
  hideOnPrint: PropTypes.bool,
};

export default Report;
