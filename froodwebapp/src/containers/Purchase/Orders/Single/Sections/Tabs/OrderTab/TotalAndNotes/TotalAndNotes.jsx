import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FormInputNumber, FormTextArea } from 'components';
import { toFixed2, moneyParser, getFormatterByCurrency } from 'utils';
import styles from './TotalAndNotes.scss';

const selector = formValueSelector('newPurchaseOrderForm');

const mapStateToProps = state => ({
  data: selector(state, 'details'),
  shipping: selector(state, 'shipping'),
  adjustment: selector(state, 'adjustment')
});

const getTotals = data => (
  data && data.reduce((prevValue, currValue) => ({
    price: Number(prevValue.price) + Number(currValue.price * currValue.qty),
    tax: Number(prevValue.tax) + Number(currValue.tax),
    discount: Number(prevValue.discount) + Number(currValue.discount),
    subTotal: Number(prevValue.total) + Number((currValue.price * currValue.qty) - ((currValue.price * currValue.qty) * (currValue.discount / 100))),
    total: Number(prevValue.total) + Number(((currValue.price * currValue.qty) - ((currValue.price * currValue.qty) * (currValue.discount / 100))) + currValue.tax)
  }), {
    price: 0, tax: 0, discount: 0, shippingCharge: 0, total: 0
  })
);

export const TotalAndNotes = ({
  data,
  shipping,
  adjustment,
  currency,
  disabled
}) => {
  const formatter = getFormatterByCurrency(currency);
  const total = getTotals(data);

  return (
    <Row className={ styles.statsRow }>
      <Col xs={ 12 } md={ 6 }>
        <Row middle="xs" end="xs">
          <Col xs={ 12 } md={ 6 } lg={ 3 }>
            <strong>Supplier Notes</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 9 }>
            <Field
              name="vendorNotes"
              placeholder="Any text"
              component={ FormTextArea }
              disabled={ disabled }
            />
          </Col>
        </Row>
        <Row middle="xs" end="xs">
          <Col xs={ 12 } md={ 6 } lg={ 3 }>
            <strong>Internal Notes</strong>
          </Col>
          <Col xs={ 12 } md={ 6 } lg={ 9 }>
            <Field
              name="internalNotes"
              placeholder="Any text"
              component={ FormTextArea }
              disabled={ disabled }
            />
          </Col>
        </Row>
      </Col>
      <Col xs={ 12 } mdOffset={ 2 } md={ 4 } className={ styles.stats } >
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Sub Total (Before Tax)</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${currency}${toFixed2(total.subTotal)}` }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Taxes</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${currency}${toFixed2(total.tax)}` }</strong>
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Shipping</strong>
          </Col>
          <Col xs={ 4 }>
            <Field
              name="shipping"
              parser={ moneyParser }
              formatter={ formatter }
              component={ FormInputNumber }
              disabled={ disabled }
            />
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Adjustment</strong>
          </Col>
          <Col xs={ 4 }>
            <Field
              name="adjustment"
              parser={ moneyParser }
              formatter={ formatter }
              component={ FormInputNumber }
              disabled={ disabled }
            />
          </Col>
        </Row>
        <Row className={ styles.total }>
          <Col xs={ 8 }>
            <strong>Total</strong>
          </Col>
          <Col xs={ 4 }>
            <strong>{ total && `${currency}${toFixed2(total.total + Number(shipping) + Number(adjustment))}` }</strong>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

TotalAndNotes.propTypes = {
  data: PropTypes.array,
  shipping: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  adjustment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  currency: PropTypes.string,
  disabled: PropTypes.bool
};

export default connect(mapStateToProps)(TotalAndNotes);

