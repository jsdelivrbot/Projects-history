import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import moment from 'moment';
import { ConnectedTopFormModal, NewTableRow } from 'components';
import {
  holidaysGetRequest,
  holidaySaveRequest,
  holidayDeleteRequest
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import columns from './columns';
import fields from './modalFields';

const mapStateToProps = state => ({
  holidays: state.transporters.holidays,
  needReloadHolidays: state.transporters.needReloadHolidays,
  loadingPage: state.transporters.loadingPage
});

const mapDispatchToProps = {
  holidaysGetRequest,
  holidaySaveRequest,
  holidayDeleteRequest
};

const newHoliday = {
  startDate: moment(),
  endDate: moment(),
  name: ''
};

export class BlackoutTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newHoliday,
    };
  }

  componentWillMount() {
    this.props.holidaysGetRequest({
      id: this.props.fulfilmentId
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadHolidays) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.holidaysGetRequest({
        id: this.props.fulfilmentId
      }));
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newHoliday,
    });
  }

  handleSave = (holiday) => {
    const hol = holiday;
    // if we don`t change date on modal, it give us moment object, that`s why we check for this here
    hol.startDate = (typeof hol.startDate === 'object') ? hol.startDate.format('D-MMMM-YYYY') : hol.startDate;
    hol.endDate = (typeof hol.endDate === 'object') ? hol.endDate.format('D-MMMM-YYYY') : hol.endDate;
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newHoliday
    }, () => this.props.holidaySaveRequest({
      id: this.props.fulfilmentId,
      payload: hol
    }));
  }

  handleDeleteRow = (e) => {
    this.props.holidayDeleteRequest({
      id: this.props.fulfilmentId,
      holidayId: e.target.id
    });
  }

  handleAddRow = () => {
    this.setState({
      modalVisible: true,
      modalData: newHoliday
    });
  }

  render() {
    const {
      holidays,
      readonly,
      loadingPage
    } = this.props;

    const {
      modalData,
      modalVisible
    } = this.state;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Holiday"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields() }
          okText="Add"
          buttonVisible={ false }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Table
              rowKey="id"
              dataSource={ holidays }
              columns={ columns(this.handleDeleteRow, readonly) }
              size="small"
              pagination={ false }
              className={ table }
            />
            { !readonly && <NewTableRow
              addOtherRowText="Add Another Holiday"
              addNewRowText="Add New Holiday"
              hasData={ holidays && holidays.length !== 0 }
              onClick={ this.handleAddRow }
            /> }
          </Row>
        </Spin>
      </div>
    );
  }
}

BlackoutTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadHolidays: PropTypes.bool.isRequired,
  // state
  readonly: PropTypes.bool.isRequired,
  // data
  holidays: PropTypes.array.isRequired,
  fulfilmentId: PropTypes.string.isRequired,
  // redux-base
  holidaysGetRequest: PropTypes.func.isRequired,
  holidaySaveRequest: PropTypes.func.isRequired,
  holidayDeleteRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BlackoutTab);
