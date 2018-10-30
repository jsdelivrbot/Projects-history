import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { GridTable, Controls, OrderTabHeader } from 'components';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { orderUpdateAllocationDataRequest } from 'redux-base/actions';
import PropTypes from 'prop-types';

const { Option } = Select;

const mapStateToProps = state => ({
  orderId: state.order.initialValues.id,
  data: state.order.allocationData,
});

const mapDispatchToProps = { orderUpdateAllocationDataRequest };

const columns = [{
  title: 'Batch',
  dataIndex: 'batch'
}, {
  title: 'Expiry',
  dataIndex: 'expiry'
}, {
  title: 'Available Qty',
  dataIndex: 'availableQty'
}, {
  title: 'Allocated Qty',
  dataIndex: 'allocatedQty',
  type: 'number',
  min: 1
}];

export class AllocationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemId: '',
      code: '',
      items: [],
      batches: [],
      location: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeItemId: nextProps.data.items[0].id,
      code: nextProps.data.items[0].code,
      items: nextProps.data.items.map(item => ({
        key: item.id,
        value: item.id,
        text: item.code
      })),
      batches: nextProps.data.items[0].batches,
      location: nextProps.data.location
    });
  }

  handleChangeItem = (itemId) => {
    const activeItem = this.props.data.items.find(item => item.id === itemId);
    this.setState({
      activeItemId: itemId,
      code: activeItem.code,
      batches: activeItem.batches
    });
  }

  handleUpdateTableData = (batches) => {
    this.setState({
      batches
    });
  }

  handleUpdateAllocationData = () => {
    this.props.orderUpdateAllocationDataRequest({
      id: this.props.orderId,
      payload: {
        code: this.state.code,
        batches: this.state.batches.map(item => ({
          allocatedQty: Number(item.allocatedQty),
          batch: item.batch,
          id: item.id
        }))
      }
    });
  }

  render() {
    const {
      activeItemId,
      batches,
      items,
      location
    } = this.state;

    return (
      <div>
        <OrderTabHeader
          header={ location }
          headerLabel="Location"
          primaryButtonText="Edit Allocation"
          secondaryButtonText="Pick List"
        >
          <Row>
            <Col lg={ 3 }>
              <Select
                value={ activeItemId }
                onChange={ this.handleChangeItem }
              >
                { items.map(item => (
                  <Option
                    key={ item.key }
                    value={ item.value }
                  >
                    { item.text }
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </OrderTabHeader>
        <Row>
          <Col lg>
            <GridTable
              rowKey="id"
              columns={ columns }
              isExpandable={ false }
              dataSource={ batches }
              updateTableData={ this.handleUpdateTableData }
            />
          </Col>
        </Row>
        <Controls
          saveButtonVisible
          onSaveButtonClick={ this.handleUpdateAllocationData }
          saveButtonText="Save"
        />
      </div>
    );
  }
}

AllocationsTab.propTypes = {
  orderId: PropTypes.string.isRequired,
  data: PropTypes.object,
  orderUpdateAllocationDataRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllocationsTab);
