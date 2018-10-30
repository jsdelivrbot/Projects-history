import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Button } from 'antd';
import { Field } from 'redux-form';
import { FormSelect, FormInput, FormInputNumber } from 'components';
import { getMenuItems } from 'utils';
import styles from '../Promotion.scss';

const mapStateToProps = state => ({
  selectValues: state.commonData.promotionFields,
  categories: state.commonData.categories,
});

const AppliesToCard = ({
  selectValues,
  condition,
  handleToggleModal,
  categories,
  constants
}) => (
  <Col className={ styles.cardWrapper }>
    <Card className={ styles.card }>
      <Row middle="xs">
        <Col xs={ 12 } md={ 4 } lg={ 4 }>Applies to</Col>
        <Col xs={ 12 } md={ 5 } lg={ 5 }>
          <Field
            name="condition"
            component={ FormSelect }
            props={ {
              menuItems: getMenuItems(selectValues.conditionType) || []
            } }
          />
        </Col>
      </Row>
      { (Number(condition) === constants.itemBundle || Number(condition) === constants.itemSku) &&
        <div>
          <Row start="xs">
            <Col xs={ 12 } md={ 4 } lg={ 4 } />
            <Col xs={ 12 } md={ 5 } lg={ 5 }>
              <Button id="condition" onClick={ handleToggleModal }>Add
                {Number(condition) === constants.itemBundle ? ' Bundle' : ' Sku'}
              </Button>
            </Col>
          </Row>
          <Row start="xs">
            <Col xs={ 12 } md={ 4 } lg={ 4 } />
            <Col xs={ 12 } md={ 5 } lg={ 5 }>
              <Field
                name="conditionValue"
                placeholder="Value"
                component={ FormInput }
                disabled
              />
            </Col>
          </Row>
          <Row start="xs">
            <Col xs={ 12 } md={ 4 } lg={ 4 } >Quantity</Col>
            <Col xs={ 12 } md={ 5 } lg={ 5 }>
              <Field
                name="conditionQty"
                placeholder="Quantity"
                component={ FormInputNumber }
              />
            </Col>
          </Row>
        </div>
      }
      { condition === constants.productCat &&
        <Row middle="xs">
          <Col xs={ 12 } md={ 4 } lg={ 4 }>Product Categories</Col>
          <Col xs={ 12 } md={ 5 } lg={ 5 }>
            <Field
              name="conditionValue"
              component={ FormSelect }
              props={ {
                menuItems: getMenuItems(categories) || [],
              } }
            />
          </Col>
        </Row>
      }
    </Card>
  </Col>
);

AppliesToCard.propTypes = {
  selectValues: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  condition: PropTypes.number,
  handleToggleModal: PropTypes.func,
  constants: PropTypes.object,
};

export default connect(mapStateToProps)(AppliesToCard);
