import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  itemSuppliersGetRequest,
  itemSuppliersSaveRequest,
  itemSuppliersUpdateRequest
} from 'redux-base/actions';
import { Table, Spin, Input } from 'antd';
import { ActionButton, ConnectedTopFormModal } from 'components';
import { table } from 'styles/common.scss';
import fields from './modalFields';
import columns from './suppliersTabHelpers';

const { Search } = Input;

const mapStateToProps = state => ({
  uoms: state.uom.data,
  suppliers: state.item.suppliers,
  loadingPage: state.item.loadingPage,
  needReloadSuppliers: state.item.needReloadSuppliers,
  itemInfo: state.item.itemInfo,
});

const mapDispatchToProps = {
  itemSuppliersGetRequest,
  itemSuppliersSaveRequest,
  itemSuppliersUpdateRequest
};

const newSkuLink = {
  sku: '',
  supplierId: '',
  supplierSku: '',
  supplierSkuName: '',
  uomId: '',
  minPurchaseQuantity: '',
  isDefault: true
};

export class SuppliersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      modalVisible: false,
      modalTitle: 'New Supplier Link',
      modalData: newSkuLink
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we edit or create new Link to reload vendors
    if (nextProps.needReloadSuppliers) {
      this.setState({
        modalData: undefined,
        modalVisible: !this.state.modalVisible
      }, () => this.props.itemSuppliersGetRequest({
        id: this.props.itemId
      }));
    }
  }

  handleSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleEdit = (e) => {
    this.setState({
      modalTitle: 'Edit Supplier Link',
      modalVisible: true,
      modalData: this.props.suppliers.find(item => item.id === Number(e.target.id))
    });
  }

  handleToggleModal = () => {
    this.setState({
      modalTitle: 'New Supplier Link',
      modalVisible: !this.state.modalVisible,
      modalData: newSkuLink
    });
  }

  handleSave = (formData) => {
    const {
      supplierId,
      sku,
      supplierSku,
      supplierSkuName,
      uomId,
      minPurchaseQuantity,
      isDefault
    } = formData;

    if (this.state.modalData.id) {
      this.props.itemSuppliersUpdateRequest({
        id: this.props.itemId,
        variantId: this.state.variantId,
        payload: {
          id: this.state.modalData.id,
          sku,
          supplierSku,
          supplierSkuName,
          uomId,
          minPurchaseQuantity,
          isDefault,
          supplierId: supplierId.id
        }
      });
    } else {
      this.props.itemSuppliersSaveRequest({
        id: this.props.itemId,
        variantId: this.state.variantId,
        payload: {
          sku,
          supplierSku,
          supplierSkuName,
          uomId,
          minPurchaseQuantity,
          isDefault,
          supplierId: supplierId.id
        }
      });
    }
  }

  render() {
    const {
      modalData,
      modalTitle,
      modalVisible,
      searchValue
    } = this.state;

    const {
      loadingPage,
      suppliers,
      uoms,
      itemInfo
    } = this.props;

    const data = suppliers.filter(supplier =>
      supplier && supplier.sku.toLowerCase().includes(searchValue.toLowerCase())
    );

    const skus = itemInfo.variants
      ? itemInfo.variants.map(variant => ({ key: variant.id, value: variant.sku }))
      : ([{ key: itemInfo.id, value: itemInfo.sku }]);

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title={ modalTitle }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(uoms, skus) }
          buttonVisible={ false }
        />
        <Spin spinning={ loadingPage }>
          <Row end="lg" style={ { marginBottom: '1rem' } }>
            <Col lg={ 4 }>
              <Search
                placeholder="Type to search SKU/Variant"
                onChange={ this.handleSearchChange }
              />
            </Col>
            <Col lg>
              <ActionButton
                style={ { float: 'right' } }
                onClick={ this.handleToggleModal }
              >
                New Link
              </ActionButton>
            </Col>
          </Row>
          <Row>
            <Col sm md lg>
              <Table
                className={ table }
                columns={ columns(this.handleEdit) }
                dataSource={ data }
                size="small"
                pagination={ false }
                rowKey="id"
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

SuppliersTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadSuppliers: PropTypes.bool.isRequired,
  // data
  suppliers: PropTypes.array.isRequired,
  uoms: PropTypes.array.isRequired,
  itemInfo: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  // redux-base
  itemSuppliersGetRequest: PropTypes.func.isRequired,
  itemSuppliersSaveRequest: PropTypes.func.isRequired,
  itemSuppliersUpdateRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersTab);

