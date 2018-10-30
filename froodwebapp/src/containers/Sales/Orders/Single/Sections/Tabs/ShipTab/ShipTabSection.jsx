import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { orderUpdateShipDataRequest } from 'redux-base/actions';
import { GridTable, Controls, OrderTabHeader } from 'components';

const mapDispatchToProps = { orderUpdateShipDataRequest };

const columns = [{
  title: 'Package #',
  dataIndex: 'code'
}, {
  title: 'Delivery Method',
  dataIndex: 'method'
}, {
  title: 'Delivery Slot',
  dataIndex: 'slot'
}, {
  title: 'Boxes',
  dataIndex: 'boxes'
}, {
  title: 'Tracking #',
  dataIndex: 'trackingNo'
}, {
  title: 'Ship Status',
  dataIndex: 'isShipped',
  type: 'checkbox'
}];

class ShipTabSection extends Component {
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

  handleUpdateShipData = () => {
    if (this.state.data[0].isShipped) {
      this.props.orderUpdateShipDataRequest({
        id: this.props.orderId,
        payload: {
          id: this.state.data[0].id,
          code: this.state.data[0].code,
        }
      });
    }
  }

  render() {

    const { data, location } = this.state;

    return (
      <div>
        <OrderTabHeader
          header={ location }
          headerLabel="Order Shipping Pickup"
          primaryButtonText="Assign"
          secondaryButtonText="Print Slip"
        />
        <Row>
          <Col lg>
            <GridTable
              rowKey="code"
              isExpandable={ false }
              disabled={ this.props.data.list[0] && this.props.data.list[0].isShipped }
              columns={ columns }
              dataSource={ data }
              updateTableData={ this.handleUpdateTableData }
            />
          </Col>
        </Row>
        <Controls
          saveButtonVisible={ this.props.data.list[0] && !this.props.data.list[0].isShipped } // items can not be shipped twice
          onSaveButtonClick={ this.handleUpdateShipData }
          saveButtonText="Save"
          // onCancelButtonClick={ this.handleCancel }
        />
      </div>
    );
  }
}

ShipTabSection.propTypes = {
  data: PropTypes.object,
  orderUpdateShipDataRequest: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(ShipTabSection);

