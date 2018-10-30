import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  bundleInfoSaveRequest,
  bundleInfoUpdateRequest,
  bundleUomLocationsGetParallelRequest
} from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import {
  FormInput,
  FormTextArea,
  Controls,
  FormSelect,
  FormRadioButtonGroup,
} from 'components';
import { Spin } from 'antd';
import { reduxForm, Field } from 'redux-form';
import { getMenuItems } from 'utils';
import { form, radioGroup } from 'styles/common.scss';

const mapStateToProps = state => ({
  loadingPage: state.bundle.loadingPage,
  initialValues: state.bundle.bundleInfo,
  uoms: state.uom.data,
  locations: state.locations.locations,
  taxCategories: state.commonData.taxCategories,
  allocationTypes: state.commonData.allocationTypes,
  productCategories: state.commonData.categories,
  skuStatusTypes: state.commonData.skuStatusTypes,
});

const mapDispatchToProps = {
  bundleInfoSaveRequest,
  bundleInfoUpdateRequest,
  bundleUomLocationsGetParallelRequest,
  push
};

const reduxFormConfig = {
  form: 'bundleForm',
  enableReinitialize: true
};

export class MainTab extends Component {
  componentDidMount() {
    if (this.props.isNewBundle) {
      this.props.bundleUomLocationsGetParallelRequest();
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues.id && this.props.isNewBundle) {
      this.props.push('/inventory/item-bundles');
    }
  }

  handleSave = (payload) => {
    if (this.props.isNewBundle) {
      this.props.bundleInfoSaveRequest({
        payload
      });
    } else {
      this.props.bundleInfoUpdateRequest({
        payload: {
          id: payload.id,
          allocTypeId: payload.allocTypeId,
          categoryId: payload.categoryId,
          description: payload.description,
          name: payload.name,
          statusId: payload.statusId,
          taxCategoryId: payload.taxCategoryId,
        }
      });
    }
  }

  render() {
    const {
      // trigger
      loadingPage,
      // props
      isNewBundle,
      // data
      uoms,
      locations,
      // static data
      allocationTypes,
      taxCategories,
      productCategories,
      skuStatusTypes,
      // form
      handleSubmit
    } = this.props;

    const allocationTypesOptions = allocationTypes.map(item => ({
      value: item.id,
      text: item.name,
      disabled: item.name === 'Manual'
    }));

    return (
      <Spin spinning={ loadingPage }>
        <form
          className={ form }
          onSubmit={ handleSubmit(this.handleSave) }
        >
          <Row>
            <Col xs={ 12 } lg={ 6 }>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Bundle SKU</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="sku"
                    disabled={ !isNewBundle }
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Bundle Name</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="name"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Allocations</label>
                </Col>
                <Col xs={ 8 }>
                  <div>
                    <Field
                      name="allocTypeId"
                      radioButtonValues={ allocationTypesOptions }
                      className={ radioGroup }
                      component={ FormRadioButtonGroup }
                    />
                  </div>
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Product Category</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="categoryId"
                    type="select"
                    menuItems={ getMenuItems(productCategories) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Tax Category</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="taxCategoryId"
                    type="select"
                    menuItems={ getMenuItems(taxCategories) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={ 12 } lg={ 6 }>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Description</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="description"
                    component={ FormTextArea }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Location</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="defaultLocationId"
                    disabled={ !isNewBundle }
                    type="select"
                    menuItems={ getMenuItems(locations) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>UOM</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="uomId"
                    disabled={ !isNewBundle }
                    type="select"
                    menuItems={ getMenuItems(uoms) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 4 }>
                  <label>Status</label>
                </Col>
                <Col xs={ 8 }>
                  <Field
                    name="statusId"
                    type="select"
                    menuItems={ getMenuItems(skuStatusTypes) }
                    component={ FormSelect }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Controls
            submitButtonVisible
          />
        </form>
      </Spin>
    );
  }
}

MainTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // props
  isNewBundle: PropTypes.bool,
  // data
  initialValues: PropTypes.object,
  uoms: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  // static data
  allocationTypes: PropTypes.array.isRequired,
  taxCategories: PropTypes.array.isRequired,
  productCategories: PropTypes.array.isRequired,
  skuStatusTypes: PropTypes.array.isRequired,
  // redux-base
  bundleInfoSaveRequest: PropTypes.func.isRequired,
  bundleInfoUpdateRequest: PropTypes.func.isRequired,
  bundleUomLocationsGetParallelRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(MainTab));
