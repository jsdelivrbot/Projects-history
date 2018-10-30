/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  ConnectedTopFormModal,
  ActionButton,
  FroodSearchInput
} from 'components';
import {
  priceListGetRequest,
  priceListSkuSaveRequest,
  priceListSkuUpdateRequest,
  itemInfoGetRequest
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import columns from './priceListHelpers';
import fields from './modalFields';
import ConnectedPriceListForm from './PriceListForm';

const topFormSelector = formValueSelector('topFormModal');
const selector = formValueSelector('priceListForm');

const mapStateToProps = state => ({
  loadingPage: state.priceList.loadingPage,
  needReloadSkuList: state.priceList.needReloadSkuList,
  priceList: state.priceList.data,
  skuList: state.priceList.skuList,
  itemInfo: state.item.itemInfo,
  currencies: state.commonData.currencies,
  sku: topFormSelector(state, 'sku'),
  currencyId: selector(state, 'currency.id')
});

const mapDispatchToProps = {
  priceListGetRequest,
  priceListSkuSaveRequest,
  priceListSkuUpdateRequest,
  itemInfoGetRequest
};

const newSku = {
  sku: {
    id: null,
    name: ''
  },
  uomName: '',
  currencyName: '',
  price: ''
};

export class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newSku,
      searchValue: ''
    };
  }

  componentWillMount = () => {
    if (!this.props.isNewPriceList) {
      this.props.priceListGetRequest({
        id: this.props.priceListId
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // when we add or update sku
    if (nextProps.needReloadSkuList) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.priceListGetRequest({
        id: this.props.priceListId
      }));
    } else if (this.state.modalData
            && !this.state.modalData.id
            && nextProps.sku.id
            && nextProps.sku.id !== this.props.sku.id) {
      // when we change sku in modal - load its corresponding data
      this.props.itemInfoGetRequest({
        id: nextProps.sku.id
      });
    } else if (this.state.modalData
            && !this.state.modalData.id
            && nextProps.itemInfo.id
            && nextProps.itemInfo.id !== this.props.itemInfo.id) {
      // when sku data is loaded - update modal data
      this.setState({
        modalData: {
          sku: {
            id: nextProps.itemInfo.id,
            name: nextProps.itemInfo.name
          },
          uomName: nextProps.itemInfo.uomName,
          currencyName: nextProps.currencies.find(cur => cur.id === this.props.currencyId).name,
          price: ''
        }
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newSku
    });
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  handleEdit = (e) => {
    const rowId = e.target.id;
    const {
      id,
      sku,
      uomName,
      currencyName,
      price
    } = this.props.skuList.find(item => item.id === Number(rowId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        sku: {
          id: sku,
          name: sku
        },
        uomName,
        currencyName,
        price
      }
    });
  }

  handleSaveSKU = (modalData) => {
    if (modalData.id) {
      this.props.priceListSkuUpdateRequest({
        id: this.props.priceListId,
        payload: {
          id: modalData.id,
          price: modalData.price,
        }
      });
    } else {
      this.props.priceListSkuSaveRequest({
        id: this.props.priceListId,
        payload: {
          sku: modalData.sku.id,
          price: modalData.price,
        }
      });
    }
  }

  render() {
    const {
      modalVisible,
      modalData,
      searchValue
    } = this.state;

    const {
      // trigger
      loadingPage,
      priceList: { isDefault },
      isNewPriceList,
      skuList
    } = this.props;

    const data = skuList.filter(item =>
      item && item.sku && item.sku.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="Add SKU in Price List"
          buttonVisible={ false }
          handleSave={ this.handleSaveSKU }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col lg>
              <ConnectedPriceListForm
                isNewPriceList={ isNewPriceList }
              />
            </Col>
          </Row>
          { !isNewPriceList && !isDefault &&
            <Row end="lg" style={ { marginBottom: '1rem' } }>
              <Col lg={ 4 }>
                <FroodSearchInput
                  onChange={ this.handleSearchChange }
                  placeholder="Type to search SKU/Variant"
                />
              </Col>
              <Col lg>
                <ActionButton
                  style={ { float: 'right' } }
                  onClick={ this.handleToggleModal }
                >
                  Add SKU
                </ActionButton>
              </Col>
            </Row>
          }
          { isDefault &&
            <Row style={ { marginBottom: '1rem' } }>
              <Col lg={ 4 }>
                <FroodSearchInput
                  onChange={ this.handleSearchChange }
                  placeholder="Type to search SKU/Variant"
                />
              </Col>
            </Row>
          }
          { !isNewPriceList &&
            <Row>
              <Col xs>
                <Table
                  className={ table }
                  columns={ columns(this.handleEdit) }
                  rowKey="id"
                  dataSource={ data }
                  size="small"
                  pagination={ false }
                />
              </Col>
            </Row>
          }
        </Spin>
      </div>
    );
  }
}

PriceList.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadSkuList: PropTypes.bool.isRequired,
  // data
  priceList: PropTypes.object.isRequired,
  skuList: PropTypes.array.isRequired,
  itemInfo: PropTypes.object,
  sku: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  currencyId: PropTypes.number,
  // static data
  currencies: PropTypes.array.isRequired,
  // props
  priceListId: PropTypes.string.isRequired,
  isNewPriceList: PropTypes.bool.isRequired,
  // redux base
  priceListGetRequest: PropTypes.func.isRequired,
  priceListSkuSaveRequest: PropTypes.func.isRequired,
  priceListSkuUpdateRequest: PropTypes.func.isRequired,
  itemInfoGetRequest: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PriceList));
