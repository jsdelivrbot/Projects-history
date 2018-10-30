import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  itemBinsGetRequest,
  itemBinsSaveRequest,
  itemBinsUpdateRequest
} from 'redux-base/actions';
import { Table, Spin, Input } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { ConnectedTopFormModal, ActionButton } from 'components';
import { table } from 'styles/common.scss';
import columns from './binsTabHelpers';
import fields from './modalFields';

const { Search } = Input;

const topFormSelector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  loadingPage: state.item.loadingPage,
  itemInfo: state.item.itemInfo,
  bins: state.item.bins,
  availableBins: state.item.availableBins,
  needReloadBins: state.item.needReloadBins,
  selectedSkuId: topFormSelector(state, 'skuId')
});

const mapDispatchToProps = {
  itemBinsGetRequest,
  itemBinsSaveRequest,
  itemBinsUpdateRequest,
};

const newLink = {
  binId: '',
  skuId: '',
  reorderQty: '',
  reorderThreshold: ''
};

export class BinsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newLink,
      searchValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update conversion
    if (nextProps.needReloadBins) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.itemBinsGetRequest({
        id: this.props.itemId
      }));
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newLink
    });
  }

  handleSave = (formData) => {
    if (this.state.modalData.id) {
      this.props.itemBinsUpdateRequest({
        id: formData.skuId,
        payload: {
          id: formData.id,
          binId: formData.binId,
          reorderQty: formData.reorderQty,
          reorderThreshold: formData.reorderThreshold,
        }
      });
    } else {
      this.props.itemBinsSaveRequest({
        id: formData.skuId,
        payload: {
          binId: formData.binId,
          reorderQty: formData.reorderQty,
          reorderThreshold: formData.reorderThreshold,
        }
      });
    }
  }

  handleSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleEdit = (e) => {
    const {
      id,
      sku,
      binId,
      reorderThreshold,
      reorderQty
    } = this.props.bins.find(bin => bin.id === Number(e.target.id));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        skuId: sku,
        binId,
        reorderThreshold,
        reorderQty,
      }
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      searchValue
    } = this.state;

    const {
      bins,
      availableBins,
      itemInfo,
      loadingPage,
      selectedSkuId
    } = this.props;

    const data = bins.filter(bin =>
      bin && bin.sku.toLowerCase().includes(searchValue.toLowerCase())
    );

    // get skus for modal select
    let skus = [];

    if (itemInfo.variants) {
      skus = itemInfo.variants.map(variant => ({ key: variant.id, value: variant.sku }));
    } else {
      skus.push({
        key: itemInfo.id,
        value: itemInfo.sku
      });
    }

    // get bins by selected sku in the modal
    let binsBySku = [];
    const skuBinsPair = availableBins.find(obj => obj.sku === selectedSkuId);

    if (skuBinsPair) {
      binsBySku = skuBinsPair.bins;
    }

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New SKU Bin Link"
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(skus, binsBySku) }
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
            columns={ columns(this.handleEdit) }
            dataSource={ data }
          />
        </Spin>
      </div>
    );
  }
}

BinsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadBins: PropTypes.bool.isRequired,
  // data
  itemId: PropTypes.string.isRequired,
  bins: PropTypes.array.isRequired,
  availableBins: PropTypes.array.isRequired,
  itemInfo: PropTypes.object.isRequired,
  selectedSkuId: PropTypes.string,
  // redux-base
  itemBinsGetRequest: PropTypes.func.isRequired,
  itemBinsSaveRequest: PropTypes.func.isRequired,
  itemBinsUpdateRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BinsTab);

