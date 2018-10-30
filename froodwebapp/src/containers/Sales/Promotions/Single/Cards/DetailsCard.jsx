import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Button } from 'antd';
import { Field } from 'redux-form';
import {
  FormSelect,
  FormInput,
  FormInputNumber,
  FormCheckbox
} from 'components';
import { getMenuItems } from 'utils';
import styles from '../Promotion.scss';

const mapStateToProps = state => ({
  selectValues: state.commonData.promotionFields
});

const DetailsCard = ({
  selectValues,
  type,
  setMinPurchage,
  hasMinPurchase,
  handleFormatter,
  handleParser,
  // selectedSku,
  handleToggleModal,
  constants
}) => (
  <Col className={ styles.cardWrapper }>
    <Card className={ styles.card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Promotion Type</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="type"
            component={ FormSelect }
            props={ {
              menuItems: getMenuItems(selectValues.discountType) || []
            } }
          />
        </Col>
      </Row>
      { Number(type) === constants.freeItem &&
        <Row start="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } />
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Button id="type" onClick={ handleToggleModal }>Add SKU</Button>
          </Col>
        </Row>
      }
      { Number(type) !== constants.freeShipping &&
        <Row middle="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } />
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="value"
              placeholder={ type !== constants.freeItem ? 'Number' : 'Value' }
              step={ type === constants.valueOff ? 0.1 : 1 }
              component={ type !== constants.freeItem ? FormInputNumber : FormInput }
              formatter={ handleFormatter }
              parser={ handleParser }
              disabled={ type === constants.freeItem }
            />
          </Col>
        </Row>
      }
      { Number(type) === constants.freeItem &&
        <Row start="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } >Quantity</Col>
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="qty"
              placeholder="Quantity"
              component={ FormInputNumber }
            />
          </Col>
        </Row>
      }
      <Row middle="xs" className={ styles.floatLeft }>
        <Col md={ 4 } lg={ 4 } />
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="requireMinumumPurchase"
            text="Required minimum purchase"
            onChange={ setMinPurchage }
            component={ FormCheckbox }
          />
        </Col>
      </Row>
      { hasMinPurchase &&
        <Row middle="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 } >
            Minimum purchase
          </Col>
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="minumumPurchase"
              step={ 0.1 }
              placeholder={ type !== 2 ? 'Number' : 'Value' }
              component={ type !== 2 ? FormInputNumber : FormInput }
            />
          </Col>
        </Row>
      }
    </Card>
  </Col>
);

DetailsCard.propTypes = {
  selectValues: PropTypes.object.isRequired,
  type: PropTypes.number,
  setMinPurchage: PropTypes.func,
  handleFormatter: PropTypes.func,
  handleParser: PropTypes.func,
  handleToggleModal: PropTypes.func,
  hasMinPurchase: PropTypes.bool,
  constants: PropTypes.object,
};

export default connect(mapStateToProps)(DetailsCard);
