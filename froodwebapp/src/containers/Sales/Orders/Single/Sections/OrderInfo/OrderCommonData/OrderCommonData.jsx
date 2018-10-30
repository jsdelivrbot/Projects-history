import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  FormDatePicker,
  FormSelect,
  FormInput,
  ColouredStatus
} from 'components';
import { Field, formValueSelector } from 'redux-form';
import { deliveryInfoParallelRequest } from 'redux-base/actions';
import { getMenuItems } from 'utils';
import getColorByStatus from './getColorByStatus';

const selector = formValueSelector('newOrderForm');

const mapStateToProps = state => ({
  payterms: state.commonData.payterms,
  deliveryMethods: state.commonData.deliveryMethods,
  deliveryMethodInfo: state.commonData.deliveryMethodInfo,
  deliverySlotsInfo: state.commonData.deliverySlotsInfo,
  status: state.order.initialValues.status,
  channelId: state.order.initialValues.channel.id,
  defaultCustomerAddress: state.order.defaultCustomerAddress,
  customerName: selector(state, 'customer.name'),
  deliveryDate: selector(state, 'deliveryDate'),
  deliveryMethodId: selector(state, 'deliveryMethodId')
});

const mapDispatchToProps = { deliveryInfoParallelRequest };

export class OrderCommonData extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      disabled,
      deliveryMethodId,
      deliveryDate,
      defaultCustomerAddress,
      customerName
    } = nextProps;


    if (!disabled) {
      // load slots and delivery days when delivery method is selected
      if (deliveryMethodId
        && deliveryMethodId !== this.props.deliveryMethodId) {
        this.props.deliveryInfoParallelRequest({
          params: [{
            id: deliveryMethodId
          }, {
            id: deliveryMethodId
          }]
        });
      }

      // Reset delivery slot on delivery date change
      if (this.props.deliveryDate
        && deliveryDate !== this.props.deliveryDate) {
        this.props.onFieldChange('deliverySlotId', null);
      }

      // initialize shipping and billing address when default customer address loaded
      if (defaultCustomerAddress
       && defaultCustomerAddress.id !== this.props.defaultCustomerAddress.id) {
        this.props.onFieldChange('shippingAddress', {
          id: defaultCustomerAddress.id,
          name: customerName,
          address: defaultCustomerAddress
        });
        this.props.onFieldChange('billingAddress', {
          id: defaultCustomerAddress.id,
          name: customerName,
          address: defaultCustomerAddress
        });
      }
    }
  }

  render() {
    const {
      // form
      status,
      channelId,
      deliveryMethodId,
      deliveryDate,
      // static data
      deliveryMethods,
      deliveryMethodInfo,
      deliverySlotsInfo,
      payterms,
      // state
      disabled
    } = this.props;

    let deliveryMethodsMenuItems = [];
    let slotsMenuItems = [];
    let paymentTermsMenuItems = [];
    let firstActiveDeliveryDate = null;
    let lastActiveDeliveryDate = null;


    if (disabled) {
      // load all select data, even disabled or not active so select values can be populated
      deliveryMethodsMenuItems = getMenuItems(deliveryMethods);
      paymentTermsMenuItems = getMenuItems(payterms);
      slotsMenuItems = getMenuItems(deliveryMethods.find(dm => dm.id === deliveryMethodId).slots);
    } else {
      deliveryMethodsMenuItems = getMenuItems(deliveryMethods.filter(dm => dm.isActive));

      // get slots by delivery date
      if (deliveryMethodId && deliveryDate) {
        const deliveryInfo = deliverySlotsInfo.find(dm => dm.id === moment(deliveryDate, 'DD-MMMM-YYYY').isoWeekday());
        if (deliveryInfo && deliveryInfo.slots) {
          slotsMenuItems = deliveryInfo.slots.map(slot => ({
            key: slot.id,
            value: `${slot.from} - ${slot.to}`
          }));
        }
      }

      // get delivery days by delivery method
      if (deliveryMethodId && deliveryMethodInfo.calLeadDays) {
        const { calLeadDays, calVisibleDays } = deliveryMethodInfo;

        firstActiveDeliveryDate = moment().add(calLeadDays, 'd').startOf('day');
        lastActiveDeliveryDate = moment().add(calLeadDays + calVisibleDays, 'd').startOf('day');
      }

      // get payment terms by channel
      paymentTermsMenuItems = getMenuItems(payterms.filter(pt => pt.channels && pt.channels.includes(channelId)));
    }

    const statusColor = getColorByStatus(status);

    return (
      <div>
        <Row middle="xs">
          <Col xs sm md lg>
            <ColouredStatus
              color={ statusColor }
              status={ status }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col xs>
            <strong>
              Order Channel
            </strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="channel.name"
              disabled
              component={ FormInput }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col xs>
            <strong>
              Channel Ref
            </strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="channelRefNo"
              disabled
              component={ FormInput }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col xs>
            <strong>Order Date</strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="orderDate"
              disabled={ disabled }
              activeFromToday
              component={ FormDatePicker }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col>
            <strong>Payment Terms</strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="paymentTerms.id"
              placeholder="Payment Term"
              component={ FormSelect }
              menuItems={ paymentTermsMenuItems }
              disabled={ disabled }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col>
            <strong>Delivery Method</strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="deliveryMethodId"
              placeholder="Delivery Method"
              component={ FormSelect }
              menuItems={ deliveryMethodsMenuItems }
              disabled={ disabled }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col>
            <strong>
              Expected Delivery Date
            </strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="deliveryDate"
              firstActiveDate={ firstActiveDeliveryDate }
              lastActiveDate={ lastActiveDeliveryDate }
              component={ FormDatePicker }
              disabled={ disabled || !deliveryMethodId }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col>
            <strong>Delivery Slot</strong>
          </Col>
          <Col xs md={ 8 } lg={ 4 }>
            <Field
              name="deliverySlotId"
              placeholder="Delivery Slot"
              component={ FormSelect }
              menuItems={ slotsMenuItems }
              disabled={ disabled || !deliveryDate }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

OrderCommonData.propTypes = {
  // static data
  payterms: PropTypes.array,
  deliveryMethods: PropTypes.array,
  deliveryMethodInfo: PropTypes.object,
  deliverySlotsInfo: PropTypes.array,

  // props
  defaultCustomerAddress: PropTypes.object,

  // form data
  channelId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  deliveryMethodId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  deliveryDate: PropTypes.string,
  customerName: PropTypes.string,
  // redux-form
  onFieldChange: PropTypes.func.isRequired,
  // redux-base
  deliveryInfoParallelRequest: PropTypes.func.isRequired,
  // state data
  disabled: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCommonData);
