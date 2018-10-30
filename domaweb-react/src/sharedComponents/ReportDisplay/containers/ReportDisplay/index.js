/*
 *
 * ReportDisplay
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Checkbox } from 'react-bootstrap';
import moment from 'moment';
import shortid from 'shortid';
import InfiniteScroll from 'react-infinite-scroll-component';

import SearchBar from './../../../SearchBar';
import Spinner from './../../../Spinner';
import DomaDatePicker from './../../../DomaDatePicker';

import messages from './messages';

import Report from './../../components/Report';

import {
  getReports,
  getMoreReports,
  getFilteredReports,
  onFiltersChanged,
} from './actions';

import {
  makeSelectReports,
  makeSelectFilteredReports,
  makeSelectLocalFilteredReports,
  makeSelectIsLazyLoading,
  makeSelectLoadMore,
  makeSelectFilterMode,
  makeSelectLoadMoreWithFilters,
  makeSelectCurrentCustomerInfo,
} from './selectors';

import styles from './ReportDisplay-styles.scss';


export class ReportDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        searchKeys: '',
        startDate: '',
        endDate: '',
        textOnly: false,
        singleReportPrintMode: false,
        activePrintReportId: 0,
        initReportsLoaded: false,
      },
    };
  }

  componentWillMount() {
    this.props.getReports(this.props.customerId);
  }

  componentWillReceiveProps(nextProps) {
    // If there initReportsLoaded flag has not yet turned on
    // and incoming reports is an array, turn it on
    if (!this.state.initReportsLoaded && Array.isArray(nextProps.reports)) {
      this.setState({
        initReportsLoaded: true,
      });
    }
  }

  onSearch = (value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        searchKeys: value,
      },
    }), () => {
      this.props.onFiltersChanged(this.state.filters);
    });
  }

  handleChangeStart = (date) => {
    let startDate = moment(`${date}T00:00:00`);
    let endDate = this.state.filters.endDate;

    // If startDate is after current endDate, swap endDate <-> startDate
    if (endDate && startDate && startDate.isAfter(endDate)) {
      [startDate, endDate] = [endDate, startDate];
    }

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        startDate,
        endDate,
      },
    }), () => {
      this.props.onFiltersChanged(this.state.filters);
    });
  }

  handleChangeEnd = (date) => {
    let endDate = moment(`${date}T23:59:59`);
    let startDate = this.state.filters.startDate;

    // If endDate is before current startDate, swap startDate <-> endDate
    if (endDate && startDate && endDate.isBefore(startDate)) {
      [startDate, endDate] = [endDate, startDate];
    }

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        startDate,
        endDate,
      },
    }), () => {
      this.props.onFiltersChanged(this.state.filters);
    });
  }

  toggleTextOnlyMode = (evt) => {
    this.setState({
      textOnly: evt.target.checked,
    });
  }

  editReport = (reportId) => {
    console.log('Edit report id =', reportId);
  }

  deleteReport = (reportId) => {
    console.log('Delete report id =', reportId);
  }

  printReport = (reportId) => {
    this.setState({
      singleReportPrintMode: true,
      activePrintReportId: reportId,
    }, () => {
      // Reset state when print dialog close
      window.onafterprint = () => {
        this.setState({
            singleReportPrintMode: false,
            activePrintReportId: 0,
        }, () => window.onafterprint = undefined);
      };
      // Fire the print dialog
      window.print();
    });
  }

  loadMoreReports = () => {
    if (!this.props.loadMore) return;
    if (this.props.filterMode && this.props.loadMoreWithFilters) {
      this.props.getFilteredReports(this.state.filters);
    } else {
      this.props.getMoreReports();
    }
  }

  render() {
    const loading = <Spinner />;

    const noReport = (
      <div className={`${styles.ReportDisplay__NoReport} text-danger`}>
        <FormattedMessage {...messages.noReport} />
      </div>
    );

    const noFilteredReport = (
      <div className={`${styles.ReportDisplay__NoReport} text-danger`}>
        <FormattedMessage {...messages.noReportWithFilters} />
      </div>
    );

    if (!this.state.initReportsLoaded) return loading;

    const reports = this.props.filterMode ?
      [...this.props.localFilteredReports, ...this.props.filteredReports]
      : this.props.reports;

    const renderReports = reports && reports.map(report => (
      <Report
        key={shortid.generate()}
        report={report}
        onEdit={this.editReport}
        onDelete={this.deleteReport}
        onPrint={
          !/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
          && this.printReport
        }
        searchKeys={this.state.filters.searchKeys}
        textOnly={this.state.textOnly}
        hideOnPrint={
          this.state.singleReportPrintMode &&
          this.state.activePrintReportId !== report.id
        }
      />
    ));

    return (
      <div className={styles.ReportDisplay}>
        <div className={styles.ReportDisplay__Metadata}>
          <div className={styles.ReportDisplay__Metadata__Title}>
            <FormattedMessage {...messages.title} />
          </div>
          <div className={styles.ReportDisplay__Metadata__CustomerInfo}>
            <div className={styles.ReportDisplay__Metadata__CustomerInfo__Name}>
              {this.props.customerInfo && this.props.customerInfo.customerName}
            </div>
            <div className={styles.ReportDisplay__Metadata__CustomerInfo__SSN}>
              {this.props.customerInfo && this.props.customerInfo.ssn}
            </div>
          </div>
        </div>
        <Row className={styles.ReportDisplay__Row_Overflow}>
          <Col xs={12} sm={4} className={styles.ReportDisplay__Filters}>
            <SearchBar
              className={styles.ReportDisplay__Filters__SearchBar}
              onChange={this.onSearch}
            />
          </Col>
          <Col xs={6} sm={4} className={styles.ReportDisplay__Filters}>
            <FormattedMessage {...messages.startDate}>
              {startDateText => (
                <DomaDatePicker
                  selected={this.state.filters.startDate}
                  noInitDate
                  selectsStart
                  onChange={this.handleChangeStart}
                  placeholderText={startDateText}
                />
              )}         
            </FormattedMessage>
          </Col>
          <Col
            xs={6} sm={4}
            className={styles.ReportDisplay__Filters}
          >
            <FormattedMessage {...messages.endDate}>
              {endDateText => (
                <DomaDatePicker
                  selected={this.state.filters.endDate}
                  noInitDate
                  selectsEnd
                  popperClassName={styles.ReportDisplay__EndDate}
                  onChange={this.handleChangeEnd}
                  placeholderText={endDateText}
                  popperPlacement={'bottom-end'}
                />
              )}
            </FormattedMessage>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={styles.ReportDisplay__Filters}>
            <Checkbox
              readOnly
              onChange={this.toggleTextOnlyMode}
            >
              <FormattedMessage {...messages.textOnly} />
            </Checkbox>
          </Col>
        </Row>
        {(reports && reports.length > 0) ? (
          <InfiniteScroll
            height={!this.props.useWindow && window.innerHeight * 0.75}
            next={this.loadMoreReports}
            hasMore={
              (this.props.filterMode && this.props.loadMoreWithFilters) ||
              (!this.props.filterMode && this.props.loadMore)
            }
            loader={loading}
          >
            {renderReports}
          </InfiniteScroll>
        ) : (
          this.props.filterMode ? noFilteredReport : noReport
        )}
      </div>
    );
  }
}

ReportDisplay.propTypes = {
  customerId: PropTypes.number.isRequired,
  getReports: PropTypes.func,
  getMoreReports: PropTypes.func,
  onFiltersChanged: PropTypes.func,
  getFilteredReports: PropTypes.func,
  loadMore: PropTypes.bool,
  filterMode: PropTypes.bool,
  loadMoreWithFilters: PropTypes.bool,
  useWindow: PropTypes.bool,
  customerInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  filteredReports: makeSelectFilteredReports(),
  isLazyLoading: makeSelectIsLazyLoading(),
  loadMore: makeSelectLoadMore(),
  filterMode: makeSelectFilterMode(),
  localFilteredReports: makeSelectLocalFilteredReports(),
  loadMoreWithFilters: makeSelectLoadMoreWithFilters(),
  customerInfo: makeSelectCurrentCustomerInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReports: customerId => dispatch(getReports(customerId)),
    getMoreReports: () => dispatch(getMoreReports()),
    onFiltersChanged: filters => dispatch(onFiltersChanged(filters)),
    getFilteredReports: filters => dispatch(getFilteredReports(filters)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDisplay);
