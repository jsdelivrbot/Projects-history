import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  uomConversionsGetRequest,
  uomConversionsSaveRequest,
  uomConversionsUpdateRequest,
  uomConversionsDeleteRequest
} from 'redux-base/actions';
import { Table, Spin, Select } from 'antd';
import { ConnectedTopFormModal, ActionButton } from 'components';
import { row, table, select } from 'styles/common.scss';
import columns from './conversionTabHelper';
import fields from './modalFields';


const mapStateToProps = state => ({
  uom: state.uom.data,
  conversions: state.uom.conversions,
  loadingPage: state.uom.loadingPage,
  needReloadUOMConversions: state.uom.needReloadUOMConversions,
});

const mapDispatchToProps = {
  uomConversionsGetRequest,
  uomConversionsSaveRequest,
  uomConversionsUpdateRequest,
  uomConversionsDeleteRequest
};

const newConversion = {
  id: '',
  fromUnit: '',
  fromQty: '',
  toId: '',
  toQty: '',
};

export class ConversionsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newConversion,
      selectedUOMId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update conversion
    if (nextProps.needReloadUOMConversions) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.uomConversionsGetRequest({
        id: this.state.selectedUOMId
      }));
      return;
    }

    // when we create conversion
    if (this.props.conversions.length !== nextProps.conversions.length) {
      this.setState({
        modalVisible: false,
        modalData: newConversion
      });
    }
  }

  handleToggleModal = () => {
    const { name } = this.props.uom.find(item => item.id === Number(this.state.selectedUOMId));
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: !this.state.modalVisible ? { fromUnit: name } : newConversion
    });
  }

  handleSave = (data) => {
    if (this.state.modalData.toId) {
      this.props.uomConversionsUpdateRequest({
        id: this.state.selectedUOMId,
        payload: {
          fromQty: data.fromQty,
          id: data.id,
          toQty: data.toQty,
          toId: data.toId,
        }
      });
    } else {
      this.props.uomConversionsSaveRequest({
        id: this.state.selectedUOMId,
        payload: {
          fromQty: data.fromQty,
          toQty: data.toQty,
          toId: data.toId,
        }
      });
    }
  }

  handleDeactivate = (e) => {
    this.props.uomConversionsDeleteRequest({
      id: this.state.selectedUOMId,
      mappingId: Number(e.target.id),
    });
  }

  handleUOMSelect = (uomId) => {
    this.setState({
      selectedUOMId: uomId
    }, () => {
      this.props.uomConversionsGetRequest({
        id: uomId
      });
    });
  }

  handleEdit = (e) => {
    this.setState({
      modalVisible: true,
      modalData: this.props.conversions.find(item => item.id === Number(e.target.id))
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      selectedUOMId
    } = this.state;

    const {
      uom,
      conversions,
      loadingPage
    } = this.props;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Conversion"
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(uom) }
        />
        <Row between="xs">
          <Col xs md={ 6 } lg={ 4 }>
            Conversion for UOM
            <Select
              className={ select }
              onChange={ this.handleUOMSelect }
            >
              { uom.map(item => (
                <Select.Option
                  key={ item.id }
                  value={ toString(item.id) }
                >
                  { item.name }
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={ 1 } >
            <ActionButton
              style={ { float: 'right' } }
              disabled={ !selectedUOMId }
              onClick={ this.handleToggleModal }
            >
              New
            </ActionButton>
          </Col>
        </Row>
        <Spin spinning={ loadingPage }>
          <Row className={ row }>
            <Table
              className={ table }
              rowKey="id"
              small="small"
              columns={ columns(this.handleEdit, this.handleDeactivate) }
              dataSource={ conversions }
            />
          </Row>
        </Spin>
      </div>
    );
  }
}

ConversionsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadUOMConversions: PropTypes.bool.isRequired,
  // data
  uom: PropTypes.array.isRequired,
  conversions: PropTypes.array.isRequired,
  // redux-base
  uomConversionsGetRequest: PropTypes.func.isRequired,
  uomConversionsSaveRequest: PropTypes.func.isRequired,
  uomConversionsUpdateRequest: PropTypes.func.isRequired,
  uomConversionsDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversionsTab);
