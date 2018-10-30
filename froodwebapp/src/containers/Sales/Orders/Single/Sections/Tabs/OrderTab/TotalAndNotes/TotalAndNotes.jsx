import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector, getFormInitialValues } from 'redux-form';
import { connect } from 'react-redux';
import {
  FormTextArea,
  FormPromotionAutoComplete
} from 'components';
import { promotionGetRequest } from 'redux-base/actions';
import { toFixed2 } from 'utils';
import styles from './TotalAndNotes.scss';

const selector = formValueSelector('newOrderForm');
const initialValuesSelector = getFormInitialValues('newOrderForm');

const mapStateToProps = state => ({
  promotionInfo: state.promotion.data,
  skuDetails: selector(state, 'skuDetails'),
  initialSkuDetails: initialValuesSelector(state).skuDetails,
  promotionDiscount: selector(state, 'promotionDiscount'),
  shippingCharge: selector(state, 'shippingCharge'),
  customerCredit: selector(state, 'customerCredit'),
  promotion: selector(state, 'promotion'),
});

const mapDispatchToProps = { promotionGetRequest };

const getDifference = (a, b) => {
  if (a > b) {
    return <span className={ styles.plus }> (+)</span>;
  } else if (a < b) {
    return <span className={ styles.minus }> (-)</span>;
  }

  return '';
};

const getTotals = skuDetails => skuDetails.reduce((prevValue, currValue) => ({
  price: Number(prevValue.price) + Number(currValue.price * currValue.qty),
  tax: Number(prevValue.tax) + Number(currValue.tax),
  discount: Number(prevValue.discount) + Number(currValue.qty * currValue.price * (currValue.discount / 100)),
  total: Number(prevValue.total) + Number((currValue.price * currValue.qty) - currValue.discount) + Number(currValue.tax)
}), {
  price: 0,
  tax: 0,
  discount: 0,
  total: 0
});


export class TotalAndNotes extends Component {
  componentWillReceiveProps(nextProps) {
    // get promotionInfo details when promocode is selected
    if (nextProps.promotion
    && this.props.promotion
    && nextProps.promotion.id
    && nextProps.promotion.id !== this.props.promotion.id) {
      this.props.promotionGetRequest({ id: nextProps.promotion.id });
    }

    // reset promotionDiscount when promotionInfo code is removed
    if (nextProps.promotion
    && this.props.promotion
    && nextProps.promotion.code !== this.props.promotion.code
    && nextProps.promotionDiscount !== 0) {
      this.props.onFieldChange('promotionDiscount', 0);
    }

    // initialize promotionDiscount when promotionInfo is loaded
    if (nextProps.promotionInfo.id !== this.props.promotionInfo.id
     && nextProps.promotion.id
     && nextProps.promotionDiscount === 0) {
      if (nextProps.promotionInfo.type === 4) { // value off
        this.props.onFieldChange('promotionDiscount', nextProps.promotionInfo.value);
      } else if (nextProps.promotionInfo.type === 3) { // percentage off
        const totals = getTotals(nextProps.skuDetails);
        const promotionDiscount = totals.price * (nextProps.promotionInfo.value / 100);
        this.props.onFieldChange('promotionDiscount', promotionDiscount);
      }
    }
  }

  render() {
    const {
      skuDetails,
      initialSkuDetails,
      promotionDiscount,
      shippingCharge,
      customerCredit,
      currency,
      disabled
    } = this.props;

    const totals = getTotals(skuDetails);
    const initialTotals = getTotals(initialSkuDetails);

    return (
      <Row>
        <Col xs md={ 6 } lg={ 6 }>
          <Row top="xs" end="xs">
            <Col xs md={ 6 } lg={ 3 }>
              <strong>Customer Notes</strong>
            </Col>
            <Col xs md={ 6 } lg={ 8 }>
              <Field
                name="customerNotes"
                placeholder="Any text"
                component={ FormTextArea }
              />
            </Col>
          </Row>
        </Col>
        <Col xs md={ 6 } lg={ 6 }>
          <Row end="xs">
            <Col lg={ 8 }>
              <div className={ styles.stats }>
                <Row start="xs">
                  <Col lg={ 8 }>
                    <strong>
                      Sub Total (Excl Tax)
                      { getDifference(totals.price, initialTotals.price) }
                    </strong>
                  </Col>
                  <Col lg={ 4 }>
                    <strong id="totals">
                      { `${currency}${toFixed2(totals.price)}` }
                    </strong>
                  </Col>
                </Row>
                <Row start="xs">
                  <Col lg={ 8 }>
                    <strong>
                      Taxes
                      { getDifference(totals.tax, initialTotals.tax) }
                    </strong>
                  </Col>
                  <Col lg={ 4 }>
                    <strong id="totals">
                      { `${currency}${toFixed2(totals.tax)}` }
                    </strong>
                  </Col>
                </Row>
                <Row start="xs">
                  <Col lg={ 8 }>
                    <strong>
                      Shipping
                      { getDifference(totals.shippingCharge, initialTotals.shippingCharge) }
                    </strong>
                  </Col>
                  <Col lg={ 4 }>
                    <strong id="totals">
                      { `${currency}${toFixed2(shippingCharge)}` }
                    </strong>
                  </Col>
                </Row>
                <Row start="xs" middle="xs">
                  <Col lg={ 3 }>
                    <strong>
                      Promotion
                      { getDifference(totals.promotionInfo, initialTotals.promotionInfo) }
                    </strong>
                  </Col>
                  <Col lg={ 6 }>
                    <Field
                      name="promotion"
                      disabled={ disabled }
                      component={ FormPromotionAutoComplete }
                    />
                  </Col>
                  <Col lg={ 3 }>
                    <strong id="totals">
                      { `${currency}${toFixed2(promotionDiscount)}` }
                    </strong>
                  </Col>
                </Row>
                <Row start="xs">
                  <Col lg={ 8 }>
                    <strong>
                      Recur Discounts
                      { getDifference(totals.discount, initialTotals.discount) }
                    </strong>
                  </Col>
                  <Col lg={ 4 }>
                    <strong id="totals">
                      { `${currency}${toFixed2(totals.discount)}` }
                    </strong>
                  </Col>
                </Row>
                <Row start="xs">
                  <Col lg={ 8 }>
                    <strong>
                      Customer Credit
                      { getDifference(customerCredit, customerCredit) }
                    </strong>
                  </Col>
                  <Col lg={ 4 }>
                    <strong id="totals">{ `${currency}${toFixed2(customerCredit)}` }</strong>
                  </Col>
                </Row>
                <Row start="xs">
                  <Col lg={ 8 }>
                    <strong>
                      Total (SGD)
                      { getDifference(totals.total - promotionDiscount, initialTotals.total) }
                    </strong>
                  </Col>
                  <Col lg={ 4 }>
                    <strong id="totals">{ `${currency}${toFixed2((totals.total + shippingCharge) - promotionDiscount)}` }</strong>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

TotalAndNotes.propTypes = {
  // props
  skuDetails: PropTypes.array,
  initialSkuDetails: PropTypes.array,
  promotionInfo: PropTypes.object,
  promotionDiscount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  shippingCharge: PropTypes.number,
  customerCredit: PropTypes.number,
  promotion: PropTypes.object,
  currency: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  // redux-base
  promotionGetRequest: PropTypes.func.isRequired,
  // redux-form
  onFieldChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalAndNotes);

