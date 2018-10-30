/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tag, Card } from 'antd';
import { push } from 'react-router-redux';
import {
  FormInput,
  FormSelect,
  FormDatePicker,
  Button
} from 'components';
import {
  stockCountStartUpdateRequest,
  stockCountFinalizeUpdateRequest,
  stockCountSaveRequest,
} from 'redux-base/actions';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import styles from './StockCount.scss';

const selector = formValueSelector('singleStockCountPageForm');

const mapStateToProps = state => ({
  needRedirect: state.stockCount.needRedirect,
  users: state.stockCount.users,
  warehouses: state.stockCount.warehouses,
  stockCount: state.stockCount.stockCount,
  activeWarehouseId: selector(state, 'warehouseId')
});

const mapDispatchToProps = {
  stockCountStartUpdateRequest,
  stockCountFinalizeUpdateRequest,
  stockCountSaveRequest,
  push
};

const reduxFormConfig = {
  form: 'singleStockCountPageForm',
  enableReinitialize: true
};

export class StockCountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zones: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeWarehouseId !== this.props.activeWarehouseId && this.props.isNewStockCount) {
      const { zones } = this.props.warehouses.find(item => item.id === Number(nextProps.activeWarehouseId));
      this.setState({
        zones
      });
    }

    if (!this.props.isNewStockCount && nextProps.stockCount.zoneId) {
      const zones = [{ id: nextProps.stockCount.zoneId, name: nextProps.stockCount.zoneName }];
      this.setState({
        zones
      });
    }

    if (nextProps.stockCount.warehouses) {
      this.setState({
        zones: [{
          id: nextProps.stockCount.zoneId,
          name: nextProps.stockCount.zoneName,
        }]
      });
    }

    if (nextProps.needRedirect) {
      this.props.push('/inventory/stock-count');
    }

  }

  getButtonText = () => {
    let buttonText = 'Save';
    if (this.props.stockCount.status && !this.props.isNewStockCount) {
      buttonText = this.props.stockCount.status === 'Assigned' ? 'Start' : buttonText;
      buttonText = this.props.stockCount.status === 'In Progress' ? 'Finalize' : buttonText;
      buttonText = this.props.stockCount.status === 'Completed' ? 'Completed' : buttonText;
    }
    return buttonText;
  }

  checkAllDetailsConfirmed = () => {
    if (this.props.tableData.length > 0) {
      const pendingItem = this.props.tableData.find(item => item.status === 'Pending');
      return !!pendingItem;
    }
    return false;
  }

  handleSave = (payload) => {
    // this.props.handleSave(values);
    if (!this.props.isNewStockCount) {
      if (payload.status === 'Assigned') {
        this.props.stockCountStartUpdateRequest({
          id: payload.id
        });
      } else if (payload.status === 'In Progress') {
        this.props.stockCountFinalizeUpdateRequest({
          id: payload.id
        });
      }
    } else {
      this.props.stockCountSaveRequest({
        payload
      });
    }
  }

  render() {
    const {
      zones
    } = this.state;
    const {
      users,
      warehouses,
      isNewStockCount,
      started,
      handleSubmit,
      stockCount
    } = this.props;
    const buttonText = this.getButtonText();
    const pendingDetailsItem = this.checkAllDetailsConfirmed();
    return (
      <Card className={ styles.card }>
        <form
          onSubmit={ handleSubmit(this.handleSave) }
          className={ styles.form }
        >
          <Row middle="xs" center="xs" className={ styles.form }>
            <Col xs={ 12 } md={ 8 } lg={ 6 }>
              {(!isNewStockCount && started) && <Tag color="#F3A537" className={ styles.statusTag }>{stockCount.status}</Tag>}
              <Row className={ styles.FirstInput }>
                <Col lg={ 4 } className={ styles.label }>
                  <label>Stock Take Description</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="description"
                    type="text"
                    disabled={ !isNewStockCount }
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row className={ styles.input }>
                <Col lg={ 4 } className={ styles.label }>
                  <label>Start Date</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="startDate"
                    disabled={ !isNewStockCount }
                    component={ FormDatePicker }
                  />
                </Col>
              </Row>
              <Row className={ styles.input }>
                <Col lg={ 4 } className={ styles.label }>
                  <label>Warehouse</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="warehouseId"
                    type="select"
                    disabled={ !isNewStockCount }
                    menuItems={ warehouses.map(item => ({ key: item.id, value: item.name })) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              <Row className={ styles.input }>
                <Col lg={ 4 } className={ styles.label }>
                  <label>Zone</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="zoneId"
                    type="select"
                    disabled={ !isNewStockCount }
                    menuItems={ zones.map(item => ({ key: item.id, value: item.name })) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              <Row className={ styles.input }>
                <Col lg={ 4 } className={ styles.label }>
                  <label>Assign To</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="assignedTo"
                    type="select"
                    disabled={ !isNewStockCount }
                    menuItems={ users.map(item => ({ key: item.id, value: item.name })) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              { !pendingDetailsItem &&
                <Row end="xs">
                  <Col xs>
                    <Button
                      type="submit"
                      disabled={ buttonText === 'Completed' }
                      className={ styles.submitButton }
                    >
                      { buttonText }
                    </Button>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        </form>
      </Card>
    );
  }
}

StockCountForm.propTypes = {
  // trigger
  needRedirect: PropTypes.bool.isRequired,
  // data
  isNewStockCount: PropTypes.bool,
  started: PropTypes.bool,
  users: PropTypes.array.isRequired,
  warehouses: PropTypes.array.isRequired,
  activeWarehouseId: PropTypes.number,
  stockCount: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  // redux base
  stockCountStartUpdateRequest: PropTypes.func.isRequired,
  stockCountFinalizeUpdateRequest: PropTypes.func.isRequired,
  stockCountSaveRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(StockCountForm));
