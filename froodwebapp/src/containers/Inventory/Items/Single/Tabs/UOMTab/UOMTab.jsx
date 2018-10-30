import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  itemUOMGetRequest,
  itemUOMSaveRequest,
  itemUOMUpdateRequest,
  itemUOMDeleteRequest
} from 'redux-base/actions';
import { Table, Spin, Input } from 'antd';
import { ConnectedTopFormModal, ActionButton } from 'components';
import { table } from 'styles/common.scss';
import { columns } from './uomTabHelpers';
import fields from './modalFields';

const { Search } = Input;

const mapStateToProps = state => ({
  uoms: state.item.uoms,
  availableUoms: state.uom.data,
  itemInfo: state.item.itemInfo,
  loadingPage: state.item.loadingPage,
  needReloadUOM: state.item.needReloadUOM,
});

const mapDispatchToProps = {
  itemUOMGetRequest,
  itemUOMSaveRequest,
  itemUOMUpdateRequest,
  itemUOMDeleteRequest
};

const newUom = {
  skuId: '',
  fromId: '',
  fromQty: '',
  toId: '',
  toQty: '',
};

export class UOMTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newUom,
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update conversion
    if (nextProps.needReloadUOM) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.itemUOMGetRequest({
        id: this.props.itemId
      }));
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newUom
    });
  }

  handleSave = (formData) => {
    if (this.state.modalData.id) {
      this.props.itemUOMUpdateRequest({
        id: this.props.itemId,
        payload: {
          fromQty: formData.fromQty,
          toQty: formData.toQty,
          toId: formData.toId,
        }
      });
    } else {
      this.props.itemUOMSaveRequest({
        id: this.props.itemId,
        payload: {
          sku: formData.skuId,
          fromId: formData.fromId,
          fromQty: formData.fromQty,
          toId: formData.toId,
          toQty: formData.toQty,
        }
      });
    }
  }

  handleDeactivate = (e) => {
    this.props.itemUOMDeleteRequest({
      id: this.props.itemId,
      mappingId: Number(e.target.id),
    });
  }

  handleEdit = (e) => {
    const conversionId = e.target.id;
    const {
      id,
      fromId,
      fromQty,
      toId,
      toQty,
    } = this.props.uoms.find(item => item.id === Number(conversionId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        fromId,
        fromQty,
        toId,
        toQty,
      }
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
    } = this.state;

    const {
      uoms,
      availableUoms,
      itemInfo,
      loadingPage
    } = this.props;

    let skus = [];

    if (itemInfo.variants) {
      skus = itemInfo.variants.map(variant => ({ key: variant.id, value: variant.sku }));
    } else {
      skus.push({
        key: itemInfo.id,
        value: itemInfo.sku
      });
    }

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New UOM Conversion"
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(availableUoms, skus) }
        />
        <Spin spinning={ loadingPage }>
          <Row end="lg" style={ { marginBottom: '1rem' } }>
            <Col xs md lg={ 4 }>
              <Search
                placeholder="Type to search SKU/Variant"
                onChange={ this.handleSearchChange }
              />
            </Col>
            <Col xs md lg>
              <ActionButton
                style={ { float: 'right' } }
                onClick={ this.handleToggleModal }
              >
                New Link
              </ActionButton>
            </Col>
          </Row>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ uoms }
          />
        </Spin>
      </div>
    );
  }
}

UOMTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadUOM: PropTypes.bool.isRequired,
  // data
  uoms: PropTypes.array.isRequired,
  availableUoms: PropTypes.array.isRequired,
  itemInfo: PropTypes.object.isRequired,
  // props
  itemId: PropTypes.string.isRequired,
  // redux-base
  itemUOMGetRequest: PropTypes.func.isRequired,
  itemUOMSaveRequest: PropTypes.func.isRequired,
  itemUOMUpdateRequest: PropTypes.func.isRequired,
  itemUOMDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UOMTab);

