/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Spin } from 'antd';
import {
  FormSelect,
  FormSkuAutoComplete,
  Controls,
  GridTable
} from 'components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  skuWarehouseBinGetRequest,
  skuBatchesGetWithFilterRequest,
  adjustmentSaveRequest,
} from 'redux-base/actions';
import { getMenuItems } from 'utils';
import { form } from 'styles/common.scss';
import columns from './newAdjustmentHelpers';

const selector = formValueSelector('newAdjustmentPageForm');

const mapStateToProps = state => ({
  loadingPage: state.adjustment.loadingPage,
  warehouses: state.adjustment.warehouses,
  bins: state.adjustment.bins,
  batches: state.adjustment.batches,
  adjustmentReasons: state.commonData.adjustmentReasons,
  activeWarehouse: selector(state, 'warehouse'),
  activeBin: selector(state, 'bin'),
  activeSku: selector(state, 'sku')
});

const mapDispatchToProps = {
  skuWarehouseBinGetRequest,
  skuBatchesGetWithFilterRequest,
  adjustmentSaveRequest
};

const reduxFormConfig = {
  form: 'newAdjustmentPageForm',
  enableReinitialize: true
};

export class NewAdjustment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchesData: [],
      batchesModified: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.batches) {
      this.setState({
        batchesData: nextProps.batches
      });
    }

    if (nextProps.activeWarehouse !== this.props.activeWarehouse) {
      this.setState({
        warehouseId: nextProps.activeWarehouse
      }, () => {
        this.getSkuBatches();
      });
    }

    if (nextProps.activeBin !== this.props.activeBin) {
      this.setState({
        binId: nextProps.activeBin
      }, () => {
        this.getSkuBatches();
      });
    }

    if (nextProps.activeSku.id && nextProps.activeSku.id !== this.props.activeSku.id) {
      // when new sku has been changed, bin and warehouse fields must reset
      this.props.change('bin', null);
      this.props.change('warehouse', null);
      this.props.skuWarehouseBinGetRequest({
        id: nextProps.activeSku.id
      });
    }
  }

  getSkuBatches = () => {
    if (this.state.warehouseId && this.state.binId) {
      this.props.skuBatchesGetWithFilterRequest({
        id: this.props.activeSku.id,
        payload: {
          binId: this.state.binId,
          warehouseId: this.state.warehouseId
        }
      });
    }
  }

  handleUpdateTableData = (batchesData, index) => {
    const newBatchesData = [...batchesData];
    let batchesModified = [...this.state.batchesModified];
    const modifyBatch = newBatchesData[index];
    const batchIndex = batchesModified.findIndex(item => item.lotId === modifyBatch.lotId);

    modifyBatch.newAdjustQty = modifyBatch.stockInHand + modifyBatch.adjustment;

    if (batchIndex > -1) {
      batchesModified[batchIndex] = modifyBatch;
    } else {
      batchesModified = [...batchesModified, modifyBatch];
    }

    this.setState({
      batchesData: newBatchesData,
      batchesModified
    });
  }

  handleSave = () => {
    const batches = this.state.batchesModified.map(item => ({
      reasonId: item.reasonId,
      lotId: item.lotId,
      qty: item.adjustment,
    }));
    this.props.adjustmentSaveRequest({
      payload: {
        details: batches,
        binId: this.state.binId,
        warehouseId: this.state.warehouseId,
        sku: this.props.activeSku.id,
      }
    });
  }

  render() {
    const {
      loadingPage,
      warehouses,
      bins,
      adjustmentReasons,
      handleSubmit,
      activeSku
    } = this.props;

    const {
      batchesData,
    } = this.state;
    return (
      <div>
        <Spin spinning={ loadingPage }>
          <form
            className={ form }
            onSubmit={ handleSubmit(this.handleSave) }
          >
            <Row center="xs">
              <Col xs={ 12 } lg={ 6 }>
                <Row middle="xs">
                  <Col xs={ 4 }>
                    <label>SKU/Variant</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="sku"
                      component={ FormSkuAutoComplete }
                    />
                  </Col>
                </Row>
                <Row middle="xs">
                  <Col xs={ 4 }>
                    <label>Warehouse</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="warehouse"
                      type="select"
                      menuItems={ getMenuItems(warehouses) }
                      component={ FormSelect }
                      disabled={ !activeSku }
                    />
                  </Col>
                </Row>
                <Row middle="xs">
                  <Col xs={ 4 }>
                    <label>Bin</label>
                  </Col>
                  <Col xs={ 8 }>
                    <Field
                      name="bin"
                      type="select"
                      menuItems={ getMenuItems(bins) }
                      component={ FormSelect }
                      disabled={ !activeSku }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <GridTable
                  rowKey="lotId"
                  columns={
                    columns(
                      adjustmentReasons,
                    )
                  }
                  dataSource={ batchesData }
                  pagination={ false }
                  updateTableData={ this.handleUpdateTableData }
                />
              </Col>
            </Row>
            <Controls
              submitButtonVisible
              cancelButtonVisible={ false }
            />
          </form>
        </Spin>
      </div>
    );
  }
}

NewAdjustment.propTypes = {
  // triggers
  loadingPage: PropTypes.bool,
  // data
  warehouses: PropTypes.array.isRequired,
  bins: PropTypes.array.isRequired,
  batches: PropTypes.array.isRequired,
  activeWarehouse: PropTypes.string,
  activeBin: PropTypes.string,
  activeSku: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  // static values
  adjustmentReasons: PropTypes.array.isRequired,
  // redux base
  skuWarehouseBinGetRequest: PropTypes.func.isRequired,
  skuBatchesGetWithFilterRequest: PropTypes.func.isRequired,
  adjustmentSaveRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(NewAdjustment));
