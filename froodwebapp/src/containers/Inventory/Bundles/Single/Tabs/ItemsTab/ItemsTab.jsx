import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  bundleItemsGetRequest,
  bundleItemsSaveRequest,
  bundleItemsUpdateRequest,
  bundleItemsDeleteRequest,
  itemInfoGetRequest
} from 'redux-base/actions';
import { formValueSelector } from 'redux-form';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal, ActionButton } from 'components';
import { table } from 'styles/common.scss';
import fields from './modalFields';
import columns from './itemsTabHelpers';

const topFormSelector = formValueSelector('topFormModal');

const mapStateToProps = state => ({
  needReloadItems: state.bundle.needReloadItems,
  loadingPage: state.bundle.loadingPage,
  bundleItems: state.bundle.bundleItems,
  itemInfo: state.item.itemInfo,
  bundleLocationId: state.bundle.bundleInfo.defaultLocationId,
  sku: topFormSelector(state, 'sku'),
});

const mapDispatchToProps = {
  bundleItemsGetRequest,
  bundleItemsSaveRequest,
  bundleItemsUpdateRequest,
  bundleItemsDeleteRequest,
  itemInfoGetRequest
};

const newBundleItem = {
  sku: {},
  categoryName: '',
  uomName: '',
  qty: ''
};

export class ItemsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newBundleItem
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete or update code
    if (nextProps.needReloadItems) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.bundleItemsGetRequest({
        id: this.props.bundleId
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
          categoryName: nextProps.itemInfo.categoryName,
          uomName: nextProps.itemInfo.uomName,
        }
      });
    }
  }

  // refactor this
  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newBundleItem
    });
  }

  handleSave = (modalData) => {
    if (modalData.id) {
      this.props.bundleItemsUpdateRequest({
        id: this.props.bundleId,
        payload: {
          id: modalData.id,
          qty: modalData.qty
        }
      });
    } else {
      this.props.bundleItemsSaveRequest({
        id: this.props.bundleId,
        payload: {
          sku: modalData.sku.id,
          qty: modalData.qty,
        }
      });
    }
  }

  handleDeactivate = (e) => {
    this.props.bundleItemsDeleteRequest({
      id: this.props.bundleId,
      itemId: e.target.id
    });
  }

  handleEdit = (e) => {
    const {
      id,
      sku,
      skuName,
      categoryName,
      uomName,
      qty
    } = this.props.bundleItems.find(bi => bi.id === Number(e.target.id));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        sku: {
          id: sku,
          name: skuName
        },
        categoryName,
        uomName,
        qty
      }
    });
  }

  render() {
    const {
      modalData,
      modalVisible
    } = this.state;

    const {
      bundleItems,
      loadingPage,
      bundleLocationId
    } = this.props;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Item"
          buttonVisible={ false }
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(bundleLocationId) }
        />
        <Row style={ { marginBottom: '1rem' } }>
          <Col lg>
            <ActionButton
              style={ { float: 'right' } }
              onClick={ this.handleToggleModal }
            >
              New Item
            </ActionButton>
          </Col>
        </Row>
        <Spin spinning={ loadingPage }>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ bundleItems }
          />
        </Spin>
      </div>
    );
  }
}

ItemsTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadItems: PropTypes.bool.isRequired,
  // data
  bundleId: PropTypes.string.isRequired,
  bundleItems: PropTypes.array.isRequired,
  itemInfo: PropTypes.object,
  sku: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  bundleLocationId: PropTypes.number.isRequired,
  // redux-base
  bundleItemsGetRequest: PropTypes.func.isRequired,
  bundleItemsSaveRequest: PropTypes.func.isRequired,
  bundleItemsUpdateRequest: PropTypes.func.isRequired,
  bundleItemsDeleteRequest: PropTypes.func.isRequired,
  itemInfoGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTab);
