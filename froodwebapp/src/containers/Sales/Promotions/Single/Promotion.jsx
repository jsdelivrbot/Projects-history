/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { Spin } from 'antd';
import moment from 'moment';
import { Controls, ConnectedTopFormModal } from 'components';
import { reduxForm, formValueSelector } from 'redux-form';
import {
  promotionGetRequest,
  promotionSaveRequest,
  promotionUpdateRequest,
  itemInfoGetRequest,
  bundleInfoGetRequest
} from 'redux-base/actions';
import { form } from 'styles/common.scss';
import fields from './modalFields';
import {
  handleFormatterHelper,
  handleParserHelper,
  constants
} from './promotionHelpers';
import {
  InfoCard,
  ValidityCard,
  DetailsCard,
  RedemptionCard,
  OrderTypesCard,
  AppliesToCard
} from './Cards';

const topFormSelector = formValueSelector('topFormModal');
const selector = formValueSelector('promotionNewForm');
// using discount below because name="value" is not getting inititialized.
const mapStateToProps = state => ({
  loadingPage: state.promotion.loadingPage,
  promotionData: state.promotion.data,
  initialValues: {
    startTime: state.promotion.data.id ? state.promotion.data.startDate.split(' ')[1] : '00:00',
    endTime: (state.promotion.data.id && state.promotion.data.endDate)
      ? state.promotion.data.endDate.split(' ')[1] : '00:00',
    ...state.promotion.data,
  },
  skuData: state.item.itemInfo,
  bundleInfo: state.bundle.bundleInfo,
  condition: Number(selector(state, 'condition')),
  type: Number(selector(state, 'type')),
  isLimited: selector(state, 'isLimited'),
  sku: topFormSelector(state, 'sku'),
});

const mapDispatchToProps = {
  promotionGetRequest,
  promotionSaveRequest,
  promotionUpdateRequest,
  itemInfoGetRequest,
  bundleInfoGetRequest,
  push
};

const reduxFormConfig = {
  form: 'promotionNewForm',
  enableReinitialize: true,
};

export class Promotion extends Component {
  constructor(props) {
    super(props);

    const { id } = props.match.params;
    const isNewPromotion = id === 'new';

    this.state = {
      requireEndDate: false,
      hasMinPurchase: false,
      id,
      isNewPromotion,
      modalVisible: false,
      modalData: null,
    };
  }

  componentWillMount() {
    const { id, isNewPromotion } = this.state;

    if (!isNewPromotion) {
      this.props.promotionGetRequest({ id });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    const isNewPromotion = id === 'new';

    this.setState({
      id,
      isNewPromotion
    });

    if (nextProps.promotionData.id && isNewPromotion) {
      this.props.push('/sales/promotions');
    }

    if (nextProps.promotionData !== this.props.promotionData) {
      this.setState({
        requireEndDate: nextProps.promotionData.requireEndDate,
        hasMinPurchase: nextProps.promotionData.requireMinumumPurchase,
      });
    }
    /**
    /* modifying form values when type or condition is changed.
    /* need to change value and conditionValue to null for some cases.
    /* type and condition uses different set of values. so whenever type
    /* or condition is changed we put value or conditionValue as null.
    */
    if (nextProps.type !== this.props.type && this.props.type) {
      const condition = nextProps.type === constants.freeItem;
      this.handleTypeOrConditionChage(condition, 'value', 'qty');
    }

    if (nextProps.condition !== this.props.condition && this.props.condition) {
      const condition = nextProps.condition === constants.itemBundle || nextProps.condition === constants.itemSku;
      this.handleTypeOrConditionChage(condition, 'conditionValue', 'conditionQty');
    }

    // if modal is open and we edit new sku
    if (this.state.modalVisible) {
      let getReq = '';
      let reqResData = '';
      // checking if sku or bundle modal is open
      if (this.state.isSkuModal) {
        getReq = 'itemInfoGetRequest';
        reqResData = 'skuData';
      } else {
        getReq = 'bundleInfoGetRequest';
        reqResData = 'bundleInfo';
      }

      if (nextProps.sku.id && nextProps.sku.id !== this.props.sku.id) {
        // when we change sku in modal - load its corresponding data
        this.props[getReq]({
          id: nextProps.sku.id,
        });
      } else if (nextProps[reqResData].id) {
        // when sku data is loaded - update modal data
        this.setState({
          modalData: {
            id: 1,
            sku: {
              id: nextProps[reqResData].id,
              name: nextProps[reqResData].name,
            },
            productName: nextProps[reqResData].name,
          },
        });
      }
    }
  }

  // TODO refactor this
  setNoEndDate = () => {
    this.setState({
      requireEndDate: !this.state.requireEndDate
    }, () => {
      if (this.state.requireEndDate) {
        this.props.change('endDate', moment());
      }
    });
  }

  // TODO refactor this
  setMinPurchage = () => {
    this.setState({
      hasMinPurchase: !this.state.hasMinPurchase
    });
  }

  handleTypeOrConditionChage = (condition, value, qty) => {
    this.props.change(value, null);
    if (condition) {
      this.props.change(qty, 1);
    } else {
      this.props.change(qty, null);
    }
  }

  handleFormatter = value => (
    handleFormatterHelper(value, this.props.type)
  );

  handleParser = value => (
    handleParserHelper(value, this.props.type)
  );

  handleToggleModal = (e) => {
    const data = {};
    if (e) {
      data.currentType = e.target.id;
    }
    this.setState({
      isSkuModal: this.props.condition !== constants.itemBundle || false,
      modalVisible: !this.state.modalVisible,
      modalData: {
        id: 1
      },
      ...data
    });
  }

  handleModalSave = () => {
    if (this.state.currentType === 'type') {
      this.props.change('value', this.state.modalData.sku.id);
    } else if (this.state.currentType === 'condition') {
      this.props.change('conditionValue', this.state.modalData.sku.id);
    }
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: {}
    });
  }

  handleSave = (values) => {
    const newPromotion = values;
    if (this.state.requireEndDate) {
      newPromotion.endDate = `${moment(values.endDate).format('DD-MMMM-YYYY')} ${values.endTime}`;
    } else {
      newPromotion.endDate = null;
    }
    newPromotion.startDate = `${moment(values.startDate).format('DD-MMMM-YYYY')} ${values.startTime}`;
    // checkbox doesnt give false value so converting it
    newPromotion.forFirstPurchase = newPromotion.forFirstPurchase || false;
    newPromotion.forSingleTime = newPromotion.forSingleTime || false;
    newPromotion.requireMinumumPurchase = newPromotion.requireMinumumPurchase || false;
    newPromotion.requireEndDate = newPromotion.requireEndDate || false;
    // discount is not accepted in api.
    if (this.state.isNewPromotion) {
      this.props.promotionSaveRequest({
        payload: {
          ...newPromotion,
          id: undefined,
        }
      });
    } else {
      this.props.promotionUpdateRequest({
        payload: newPromotion
      });
    }
  }

  render() {
    const {
      handleSubmit,
      condition,
      type,
      isLimited,
      loadingPage
    } = this.props;

    const {
      requireEndDate,
      isNewPromotion,
      hasMinPurchase,
      modalVisible,
      modalData,
      isSkuModal
    } = this.state;
    return (
      <Spin spinning={ loadingPage }>
        <ConnectedTopFormModal
          title={ isSkuModal ? 'Select SKU' : 'Select Bundle' }
          loading={ loadingPage }
          buttonText="Add"
          buttonVisible={ false }
          handleSave={ this.handleModalSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(isSkuModal) }
        />
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          <Row center="xs">
            <Col md={ 6 }>
              <InfoCard isNewPromotion={ isNewPromotion } />
              <DetailsCard
                type={ type }
                condition={ condition }
                setMinPurchage={ this.setMinPurchage }
                hasMinPurchase={ hasMinPurchase }
                handleFormatter={ this.handleFormatter }
                handleParser={ this.handleParser }
                handleToggleModal={ this.handleToggleModal }
                constants={ constants }
              />
              <OrderTypesCard />
              <AppliesToCard
                condition={ condition }
                handleToggleModal={ this.handleToggleModal }
                constants={ constants }
              />
              <RedemptionCard
                isLimited={ isLimited }
              />
              <ValidityCard
                requireEndDate={ requireEndDate }
                setNoEndDate={ this.setNoEndDate }
              />
            </Col>
          </Row>
          <Row center="xs">
            <Col md={ 6 }>
              <Controls
                submitButtonVisible
                cancelButtonVisible={ false }
                submitButtonText={ isNewPromotion ? 'Save' : 'Update' }
              />
            </Col>
          </Row>
        </form>
      </Spin>
    );
  }
}

Promotion.propTypes = {
  // redux-base
  promotionGetRequest: PropTypes.func.isRequired,
  promotionSaveRequest: PropTypes.func.isRequired,
  promotionUpdateRequest: PropTypes.func.isRequired,
  itemInfoGetRequest: PropTypes.func.isRequired,
  bundleInfoGetRequest: PropTypes.func.isRequired,

  // data
  loadingPage: PropTypes.bool.isRequired,
  condition: PropTypes.number,
  skuData: PropTypes.object,
  bundleInfo: PropTypes.object,
  sku: PropTypes.object,
  bundleId: PropTypes.string,
  type: PropTypes.number,
  isLimited: PropTypes.bool,
  promotionData: PropTypes.object,

  // form
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  change: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(Promotion)));
