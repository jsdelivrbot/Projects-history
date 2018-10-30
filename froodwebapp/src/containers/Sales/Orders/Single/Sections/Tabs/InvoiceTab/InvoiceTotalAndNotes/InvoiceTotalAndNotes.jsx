import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { toFixed2 } from 'utils';
import styles from './InvoiceTotalAndNotes.scss';

const Notes = ({ value }) => (
  <div className={ styles.notes }>
    { value }
  </div>
);

Notes.propTypes = {
  value: PropTypes.string
};

export const InvoiceTotalAndNotes = ({ data }) => (
  <Row className={ styles.statsRow }>
    { /* <Col xs={ 12 } md={ 6 } lg={ 6 }>
      <Row end="xs" className={ styles.row }>
        <Col xs={ 12 } md={ 6 } lg={ 3 }>
          <strong>Customer Notes</strong>
        </Col>
        <Col xs={ 12 } md={ 6 } lg={ 9 }>
          <Notes value={ data.notes } />
        </Col>
      </Row>
      <Row end="xs">
        <Col xs={ 12 } md={ 6 } lg={ 3 }>
          <strong>Terms & Conditions</strong>
        </Col>
        <Col xs={ 12 } md={ 6 } lg={ 9 }>
          <Notes value={ data.terms } />
        </Col>
      </Row>
    </Col> */ }
    <Col xs={ 12 } md={ 8 } lg={ 8 } />
    <Col xs={ 12 } md={ 4 } lg={ 4 } className={ styles.stats } >
      <Row className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Sub Total</strong>
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.subTotal) }</strong>
        </Col>
      </Row>
      <Row className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Taxes</strong>
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.tax) }</strong>
        </Col>
      </Row>
      <Row className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Shipping</strong>
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.shipping) }</strong>
        </Col>
      </Row>
      <Row middle="xs" className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Promotion</strong>
          <Input
            disabled
            value={ data && data.promoCode }
            style={ {
              width: 'auto',
              marginLeft: '0.5rem'
            } }
          />
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.promotion) }</strong>
        </Col>
      </Row>
      <Row className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Recur Discounts</strong>
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.discount) }</strong>
        </Col>
      </Row>
      <Row className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Customer Credit</strong>
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.customerCredit) }</strong>
        </Col>
      </Row>
      <Row className={ styles.total }>
        <Col xs={ 8 }>
          <strong>Total (SGD)</strong>
        </Col>
        <Col xs={ 2 }>
          <strong>{ data && toFixed2(data.total) }</strong>
        </Col>
      </Row>
    </Col>
  </Row>
);

InvoiceTotalAndNotes.propTypes = {
  data: PropTypes.object
};

export default InvoiceTotalAndNotes;

