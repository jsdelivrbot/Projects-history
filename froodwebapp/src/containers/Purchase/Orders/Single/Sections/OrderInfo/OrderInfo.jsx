import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormSupplierAutoComplete
} from 'components';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import getColorByStatus from './getColorByStatus';
import ConnectedAddress from './Address/Address';
import OrderCommonData from './OrderCommonData/OrderCommonData';
import styles from './OrderInfo.scss';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  contactUsers: state.purchaseOrder.contactUsers,
  payterms: state.commonData.payterms,
  vendorPaymentTermExist: !!state.purchaseOrder.initialValues.paymentTerms,
  shippingMethods: state.commonData.shippingMethods,
  staticData: selector(
    state,
    'date',
    'deliveryDate',
  )
});

export const OrderInfo = ({
  // state
  isNewOrder,
  disabled,

  // data
  contactUsers,
  payterms,
  vendorPaymentTermExist,
  status,
  shippingMethods,

  // form
  staticData: {
    date,
    deliveryDate
  }
}) => {

  const statusColor = getColorByStatus(status);

  return (
    <Row className={ styles.orderInfo }>
      <Col xs md={ 6 } lg={ 7 }>
        { isNewOrder &&
          <Row middle="xs">
            <Col xs md={ 8 } lg={ 5 }>
              <Field
                name="vendor"
                component={ FormSupplierAutoComplete }
              />
            </Col>
          </Row>
        }
        <ConnectedAddress disabled={ disabled } />
      </Col>
      <OrderCommonData
        isNewOrder={ isNewOrder }
        date={ date }
        deliveryDate={ deliveryDate }
        shippingMethods={ shippingMethods }
        payterms={ payterms }
        vendorPaymentTermExist={ vendorPaymentTermExist }
        contactUsers={ contactUsers }
        status={ status }
        statusColor={ statusColor }
        disabled={ disabled }
      />
    </Row>
  );
};

OrderInfo.propTypes = {
  // props
  contactUsers: PropTypes.array,
  payterms: PropTypes.array,
  vendorPaymentTermExist: PropTypes.bool.isRequired,
  shippingMethods: PropTypes.array,
  status: PropTypes.string.isRequired,

  // state
  isNewOrder: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,

  // form
  staticData: PropTypes.object,
};

export default connect(mapStateToProps)(OrderInfo);
