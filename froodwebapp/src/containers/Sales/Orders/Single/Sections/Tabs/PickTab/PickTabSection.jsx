import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { orderUpdatePickDataRequest } from 'redux-base/actions';
import { GridTable, Controls, OrderTabHeader } from 'components';

const mapDispatchToProps = { orderUpdatePickDataRequest };

const columns = [{
  title: 'Pick List #',
  dataIndex: 'code'
}, {
  title: 'Item Name',
  dataIndex: 'name'
}, {
  title: 'UOM',
  dataIndex: 'uomName'
}, {
  title: 'Order Qty',
  dataIndex: 'orderQty'
}, {
  title: 'Batch',
  dataIndex: 'batch'
}, {
  title: 'Expiry',
  dataIndex: 'expiryDate'
}, {
  title: 'Pick Qty',
  dataIndex: 'pickQty',
  type: 'number',
  min: 0
}, {
  title: 'Pick Status',
  dataIndex: 'isPicked',
  type: 'checkbox'
}];

export class PickTabSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.list,
      location: props.data.location
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data.list,
      location: nextProps.data.location
    });
  }

  handleUpdateTableData = (data) => {
    this.setState({
      data
    });
  }

  handleUpdatePickData = () => {
    this.props.orderUpdatePickDataRequest({
      id: this.props.orderId,
      payload: {
        id: this.state.data[0].id,
        code: this.state.data[0].code,
        children: this.state.data[0].children.map(item => ({
          lineNo: item.lineNo,
          pickQty: Number(item.pickQty)
        }))
      }
    });
  }

  render() {

    const { data, location } = this.state;

    return (
      <div>
        <OrderTabHeader
          header={ location }
          headerLabel="Zone"
          primaryButtonText="Assign"
          secondaryButtonText="Print List"
        />
        <Row>
          <Col lg>
            <GridTable
              isExpandable
              disabled={ this.props.data.list[0] && this.props.data.list[0].isPicked }
              columns={ columns }
              dataSource={ data }
              updateTableData={ this.handleUpdateTableData }
            />
          </Col>
        </Row>
        <Controls
          saveButtonVisible={ this.props.data.list[0] && !this.props.data.list[0].isPicked } // items can not be picked twice
          onSaveButtonClick={ this.handleUpdatePickData }
          saveButtonText="Save"
        />
      </div>
    );
  }
}

PickTabSection.propTypes = {
  data: PropTypes.object,
  orderUpdatePickDataRequest: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(PickTabSection);

