import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { orderUpdatePackDataRequest } from 'redux-base/actions';
import { GridTable, Controls, OrderTabHeader } from 'components';

const mapDispatchToProps = { orderUpdatePackDataRequest };

const columns = [{
  title: 'Package #',
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
  title: 'Pack Qty',
  dataIndex: 'packQty'
}, {
  title: 'Pack Status',
  dataIndex: 'isPacked',
  type: 'checkbox'
}];

export class PackTabSection extends Component {
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

  handleUpdatePackData = () => {
    this.props.orderUpdatePackDataRequest({
      id: this.props.orderId,
      payload: {
        boxes: 1, // for first release
        id: this.state.data[0].id,
        lines: this.state.data[0].children.map(item => ({
          lineNo: item.lineNo,
          isPacked: item.isPacked
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
          headerLabel="Packing Station"
          primaryButtonText="Assign"
          secondaryButtonText="Print Slip"
        />
        <Row>
          <Col lg>
            <GridTable
              rowKey="code"
              isExpandable
              disabled={ this.props.data.list[0] && this.props.data.list[0].isPacked }
              columns={ columns }
              dataSource={ data }
              updateTableData={ this.handleUpdateTableData }
            />
          </Col>
        </Row>
        <Controls
          saveButtonVisible={ this.props.data.list[0] && !this.props.data.list[0].isPacked } // items can not be packed twice
          onSaveButtonClick={ this.handleUpdatePackData }
          saveButtonText="Save"
          // onCancelButtonClick={ this.handleCancel }
        />
      </div>
    );
  }
}

PackTabSection.propTypes = {
  data: PropTypes.object,
  orderUpdatePackDataRequest: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(PackTabSection);

