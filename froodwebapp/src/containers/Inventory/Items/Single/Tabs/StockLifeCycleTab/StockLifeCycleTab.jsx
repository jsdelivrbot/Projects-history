import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  itemStockLifeCycleGetRequest,
  itemStockLifeCycleSaveRequest,
  itemStockLifeCycleUpdateRequest,
  itemStockLifeCycleMoveUpdateRequest
} from 'redux-base/actions';
import { Spin } from 'antd';
import { GridTable, PageHeader } from 'components';
import columns from './stockLifeCycleTabHelpers';

const mapStateToProps = state => ({
  stockLifeCycles: state.item.stockLifeCycles,
  itemInfo: state.item.itemInfo,
  loadingPage: state.item.loadingPage,
  needReloadSLC: state.item.needReloadSLC,
});

const mapDispatchToProps = {
  itemStockLifeCycleGetRequest,
  itemStockLifeCycleSaveRequest,
  itemStockLifeCycleUpdateRequest,
  itemStockLifeCycleMoveUpdateRequest
};

class StockTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadSLC) {
      this.props.itemStockLifeCycleGetRequest({
        id: this.props.itemId
      });
    }

    // we need to show all variants and their related slc data
    const tableData = nextProps.itemInfo.variants.map((variant, index) => {
      // check if we have slc data for current variant
      const slc = nextProps.stockLifeCycles.find(item => item.fromVariant === variant.sku);

      if (slc) {
        return {
          id: index,
          slcId: slc.id,
          fromVariant: slc.fromVariant,
          toVariant: slc.toVariant,
          daysAfterMfg: slc.daysAfterMfg,
          isActive: slc.isActive,
        };
      }

      return {
        id: index,
        slcId: null,
        fromVariant: variant.sku,
        toVariant: '',
        daysAfterMfg: '',
        isActive: false,
      };
    });

    this.setState({ tableData });
  }

  handleUpdateTableData = (tableData) => {
    this.setState({
      tableData
    });
  }

  handleSave = (e) => {
    const {
      daysAfterMfg,
      fromVariant,
      toVariant,
    } = this.state.tableData[e.target.id];

    this.props.itemStockLifeCycleSaveRequest({
      id: this.props.itemId,
      payload: {
        daysAfterMfg,
        fromVariant,
        toVariant
      }
    });
  }

  handleUpdate = (e) => {
    const {
      daysAfterMfg,
      toVariant,
      slcId
    } = this.state.tableData[e.target.id];

    this.props.itemStockLifeCycleUpdateRequest({
      id: this.props.itemId,
      payload: {
        id: slcId,
        daysAfterMfg,
        toVariant
      }
    });
  }

  handleMoveSku = (e) => {
    const { slcId } = this.state.tableData[e.target.id];
    this.props.itemStockLifeCycleMoveUpdateRequest({
      id: this.props.itemId,
      slcId
    });
  }

  handleActivate = (e) => {
    this.handleChangeStatus(e.target.id, true);
  }

  handleDeactivate = (e) => {
    this.handleChangeStatus(e.target.id, false);
  }

  handleChangeStatus = (rowId, active) => {
    const { slcId } = this.state.tableData[rowId];

    this.props.itemStockLifeCycleUpdateRequest({
      id: this.props.itemId,
      payload: {
        id: slcId,
        isActive: active
      }
    });
  }

  render() {
    const {
      tableData
    } = this.state;

    const {
      loadingPage,
      itemInfo: {
        variants
      }
    } = this.props;

    const toVariantMenuItems = variants.map(variant => ({ id: variant.id, name: variant.sku }));

    return (
      <div>
        <PageHeader
          bigText="Manage your stock lifecycle by moving your stock to another SKU (For instance chilled stock to frozen)"
          smallText="Stock adjustment report will be generated automatically"
        />
        <Spin spinning={ loadingPage }>
          <GridTable
            dataSource={ tableData }
            updateTableData={ this.handleUpdateTableData }
            columns={ columns(
              this.handleSave,
              this.handleUpdate,
              this.handleActivate,
              this.handleDeactivate,
              this.handleMoveSku,
              toVariantMenuItems
            ) }
          />
        </Spin>
      </div>
    );
  }
}

StockTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadSLC: PropTypes.bool.isRequired,
  // data
  itemInfo: PropTypes.object.isRequired,
  stockLifeCycles: PropTypes.array.isRequired,
  // props
  itemId: PropTypes.string.isRequired,
  // redux-base
  itemStockLifeCycleGetRequest: PropTypes.func.isRequired,
  itemStockLifeCycleSaveRequest: PropTypes.func.isRequired,
  itemStockLifeCycleUpdateRequest: PropTypes.func.isRequired,
  itemStockLifeCycleMoveUpdateRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockTab);
