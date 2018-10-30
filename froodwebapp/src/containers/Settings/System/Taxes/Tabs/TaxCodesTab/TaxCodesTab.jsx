import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  taxCodesGetRequest,
  taxCodesSaveRequest,
  taxCodesUpdateRequest,
  taxCodesDeleteRequest
} from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal, FroodSearchInput } from 'components';
import { percentageParser } from 'utils';
import { table } from 'styles/common.scss';
import fields from './modalFields';
import columns from './taxCodesHelpers';

const mapStateToProps = state => ({
  needReloadTaxCodes: state.taxes.needReloadTaxCodes,
  loadingPage: state.taxes.loadingPage,
  taxCodes: state.taxes.taxCodes,
});

const mapDispatchToProps = {
  taxCodesGetRequest,
  taxCodesSaveRequest,
  taxCodesUpdateRequest,
  taxCodesDeleteRequest
};

const newTax = {
  name: '',
  code: '',
  rate: 0
};

export class TaxCodesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newTax,
      searchValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete or update code
    if (nextProps.needReloadTaxCodes) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.taxCodesGetRequest());
      return;
    }

    // when we create codes
    if (this.props.taxCodes.length !== nextProps.taxCodes.length) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newTax
    });
  }

  handleSave = (taxCode) => {
    if (this.state.modalData.id) {
      this.props.taxCodesUpdateRequest({
        payload: {
          id: this.state.modalData.id,
          rate: taxCode.rate
        }
      });
    } else {
      this.props.taxCodesSaveRequest({ payload: taxCode });
    }
  }

  handleActivate = (e) => {
    const codeId = e.target.id;
    const { rate } = this.props.taxCodes.find(cde => cde.id === Number(codeId));
    this.props.taxCodesUpdateRequest({
      payload: {
        id: codeId,
        rate
      }
    });
  }

  handleDeactivate = (e) => {
    this.props.taxCodesDeleteRequest({
      id: e.target.id
    });
  }

  handleEdit = (e) => {
    const codeId = e.target.id;
    const {
      id,
      name,
      code,
      rate
    } = this.props.taxCodes.find(cde => cde.id === Number(codeId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        code,
        rate
      }
    });
  }

  handleFormatter(value) {
    return `${value}%`;
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      searchValue
    } = this.state;

    const { taxCodes, loadingPage } = this.props;

    const data = taxCodes.filter(item =>
      item && item.name && item.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Tax Code"
          buttonText="New Tax Code"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(this.handleFormatter, percentageParser) }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col lg={ 4 }>
              <FroodSearchInput
                onChange={ this.handleSearchChange }
                placeholder="Type to search tax codes"
              />
            </Col>
          </Row>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate, this.handleActivate) }
            dataSource={ data }
          />
        </Spin>
      </div>
    );
  }
}

TaxCodesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadTaxCodes: PropTypes.bool.isRequired,
  // data
  taxCodes: PropTypes.array.isRequired,
  // redux-base
  taxCodesGetRequest: PropTypes.func.isRequired,
  taxCodesSaveRequest: PropTypes.func.isRequired,
  taxCodesUpdateRequest: PropTypes.func.isRequired,
  taxCodesDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxCodesTab);
