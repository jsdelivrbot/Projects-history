import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  FormInput,
  FormTextArea,
  FormSelect,
  Controls
} from 'components';
import { OpenIcon, CloseIcon } from 'icons';
import {
  itemInfoSaveRequest,
  itemInfoUpdateRequest,
  uomGetRequest,
  showErrorMessage
} from 'redux-base/actions';
import { last, map, cloneDeep } from 'lodash';
import { Spin } from 'antd';
import { getMenuItems } from 'utils';
import ProductVariants from './ProductVariants';
import {
  convertItemOptions,
  initializeItemOptions,
  initializeItemVariants,
  generateNewItemProductVariants,
  addExistingItemProductVariantsByTag,
  deleteExistingItemProductVariantsByTag
} from './mainTabHelpers';
import styles from './MainTab.scss';

const selector = formValueSelector('inventoryMainForm');

const mapStateToProps = state => ({
  // triggers
  loadingPage: state.item.loadingPage,
  loadingUoms: state.uom.loadingPage,
  // static data
  countries: state.commonData.countries,
  categories: state.commonData.categories,
  taxCategories: state.commonData.taxCategories,
  zoneTypes: state.commonData.zoneTypes,
  defaultLocations: state.commonData.defaultLocations,
  skuStatusTypes: state.commonData.skuStatusTypes,
  uoms: state.uom.data,
  // form values
  initialValues: state.item.itemInfo,
  defaultVariantColumnValues: selector(
    state,
    'taxCategoryId',
    'defaultLocationId',
    'storageConditionId',
    'statusId')
});

const mapDispatchToProps = {
  itemInfoSaveRequest,
  itemInfoUpdateRequest,
  uomGetRequest,
  push,
  showErrorMessage
};

const reduxFormConfig = {
  form: 'inventoryMainForm',
  enableReinitialize: true
};

export class MainTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productVariantsVisible: false,
      productOptions: [],
      productVariants: []
    };
  }

  componentDidMount() {
    if (this.props.isNewSkuItem) {
      this.props.uomGetRequest();
    }
  }

  componentWillReceiveProps(nextProps) {
    // when we create price list redirect to edit page
    if (nextProps.initialValues.id && nextProps.isNewSkuItem) {
      this.props.push('/inventory/all-items');
    } else if (!nextProps.isNewSkuItem && nextProps.initialValues.options) {
      this.setState({
        productOptions: initializeItemOptions(nextProps.initialValues.options),
        productVariants: initializeItemVariants(nextProps.initialValues.variants, nextProps.initialValues.options)
      });
    }
  }

  handleSaveNewItem = (formData) => {
    this.props.itemInfoSaveRequest({
      payload: {
        name: formData.name,
        sku: formData.sku,
        brand: formData.brand,
        categoryId: formData.categoryId,
        taxCategoryId: formData.taxCategoryId,
        uomId: formData.uomId,
        defaultLocationId: formData.defaultLocationId,
        originCountryId: formData.originCountryId,
        options: this.state.productOptions.map(po => ({
          key: po.key,
          values: po.values.map(obj => obj.value)
        })),
        variants: this.state.productVariants.map(pv => ({
          name: pv.name,
          sku: pv.sku,
          options: pv.name.split('/')
        }))
      }
    });
  }

  handleSaveExistingItem = (formData) => {
    this.props.itemInfoUpdateRequest({
      payload: {
        id: formData.id,
        name: formData.name,
        brand: formData.brand,
        categoryId: formData.categoryId,
        taxCategoryId: formData.taxCategoryId,
        uomId: formData.uomId,
        defaultLocationId: formData.defaultLocationId,
        originCountryId: formData.originCountryId,
        storageConditionId: formData.storageConditionId,
        statusId: formData.statusId,
        description: formData.description,
        options: this.state.productOptions.map(po => ({
          id: po.id,
          key: po.key,
          values: po.values.map(obj => obj.value)
        })),
        variants: this.state.productVariants.map(variant => ({
          id: variant.id,
          name: variant.name,
          originCountryId: variant.originCountryId,
          options: variant.options,
          defaultLocationId: variant.defaultLocationId,
          sku: variant.sku,
          statusId: variant.statusId,
          storageConditionId: variant.storageConditionId,
          taxCategoryId: variant.taxCategoryId
        }))
      }
    });
  }

  handleAddProductOptionRow = () => {
    const productOptions = [...this.state.productOptions];
    const lastItem = last(productOptions);
    productOptions.push({
      id: (lastItem && lastItem.id + 1) || 1,
      key: '',
      values: []
    });

    this.setState({
      productOptions
    });
  }

  handleUpdateProductOptionsKeys = (updatedProductOptions, rowIndex, action) => {
    if (action === 'delete' && this.props.isNewSkuItem) {
      this.setState({
        productOptions: updatedProductOptions,
        productVariants: generateNewItemProductVariants(updatedProductOptions)
      });
      // check if option key is unique on all rows
    } else if (action === 'add' && updatedProductOptions.find((po, index) => Number(rowIndex) !== index && po.key.toLowerCase() === updatedProductOptions[rowIndex].key.toLowerCase())) {
      this.props.showErrorMessage({ message: 'Option key must be unique' });
    } else {
      this.setState({ // update option keys
        productOptions: updatedProductOptions
      });
    }
  }

  handleUpdateProductOptionsValues = (updatedProductOptions, action, tag, updatedRowIndex) => {
    if (action === 'uniqError' // check for option row and cross option rows uniqness
      || (action === 'add' && this.state.productOptions.find((po, index) => po.values.find(obj => updatedRowIndex === index && obj.value.toLowerCase() === tag.toLowerCase())))) {
      this.props.showErrorMessage({ message: 'Option values must be unique' });
    } else {

      const { productVariants } = this.state;
      let newProductVariants;

      const { isNewSkuItem } = this.props;

      if (action === 'add') {
        // make new tag closable in updated options
        const convertedProductOptions = convertItemOptions(updatedProductOptions, tag, updatedRowIndex);

        if (isNewSkuItem) { // generate items for new item
          newProductVariants = generateNewItemProductVariants(convertedProductOptions);
        } else { // generate items for exisiting item

          const { defaultVariantColumnValues } = this.props; // used to initialize new variant column values
          const notIncludeExistingVariants = this.state.productOptions.some(po => po.values.length === 0);

          newProductVariants = addExistingItemProductVariantsByTag(
            defaultVariantColumnValues,
            convertedProductOptions,
            tag,
            notIncludeExistingVariants,
            productVariants
          );
        }

        this.setState({
          productOptions: updatedProductOptions,
          productVariants: newProductVariants
        });

      } else if (action === 'delete') {
        const productOptions = map(this.state.productOptions, cloneDeep);

        const newValues = productOptions[updatedRowIndex].values.filter(obj => obj.value !== tag.value);
        productOptions[updatedRowIndex].values = newValues;

        newProductVariants = deleteExistingItemProductVariantsByTag(
          productVariants,
          tag.value
        );

        this.setState({
          productOptions,
          productVariants: newProductVariants
        });
      }
    }
  }

  handleUpdateProductVariants = (updatedProductVariants, rowIndex, action) => {
    if (action === 'delete') {
      const productOptions = map(this.state.productOptions, cloneDeep);
      const productVariants = map(this.state.productVariants, cloneDeep);

      const variantOptions = productVariants[rowIndex].options; // get deleted variant options

      // check if one of the options in the deleted variant exists on other variant, if no delete this option value form product options
      variantOptions.forEach((value) => {
        const exisitingVariantsByOptionValue = updatedProductVariants.filter(pv => pv.options.includes(value));
        if (exisitingVariantsByOptionValue.length === 0) {

          const option = productOptions.find(po => po.values.find(pov => pov.value === value));

          const indexOfOption = productOptions.indexOf(option);
          const newValues = productOptions[indexOfOption].values.filter(obj => obj.value !== value);
          productOptions[indexOfOption].values = newValues;
        }
      });

      this.setState({
        productOptions,
        productVariants: updatedProductVariants
      });
    } else {
      this.setState({
        productVariants: updatedProductVariants
      });
    }
  }

  handleToggleProductVariants = () => {
    this.setState({
      productVariantsVisible: !this.state.productVariantsVisible
    });
  }

  render() {
    const {
      productVariantsVisible,
      productOptions,
      productVariants
    } = this.state;

    const {
      // form
      handleSubmit,
      // triggers
      loadingPage,
      loadingUoms,
      isNewSkuItem,
      hasInitialProductVariants = false,
      productKeyColumnDisabled = false,
      // static data
      categories,
      taxCategories,
      uoms,
      defaultLocations,
      countries,
      zoneTypes,
      skuStatusTypes
    } = this.props;
    return (
      <Spin spinning={ loadingPage || loadingUoms }>
        <form
          className={ styles.form }
          onSubmit={ handleSubmit(isNewSkuItem ? this.handleSaveNewItem : this.handleSaveExistingItem) }
        >
          <Row>
            <Col xs md lg={ 6 }>
              <Row end="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Product Name</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="name"
                    placeholder="Required"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              <Row end="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>SKU</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="sku"
                    placeholder="Autogenerated or Manual (Required)"
                    component={ FormInput }
                    disabled={ !isNewSkuItem }
                  />
                </Col>
              </Row>
              <Row end="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Brand</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="brand"
                    placeholder="Optional"
                    component={ FormInput }
                  />
                </Col>
              </Row>
              { !hasInitialProductVariants &&
              <Row end="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Country Of Origin</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="originCountryId"
                    placeholder="Choose country"
                    component={ FormSelect }
                    menuItems={ getMenuItems(countries) }
                  />
                </Col>
              </Row>
              }
              <Row end="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Product Category</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="categoryId"
                    placeholder="Add new category if not found"
                    component={ FormSelect }
                    menuItems={ getMenuItems(categories) }
                  />
                </Col>
              </Row>
              { !hasInitialProductVariants &&
              <Row end="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Tax Category</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="taxCategoryId"
                    placeholder="Add new category if not found"
                    component={ FormSelect }
                    menuItems={ getMenuItems(taxCategories) }
                  />
                </Col>
              </Row>
              }
            </Col>
            <Col xs md lg={ 6 }>
              <Row start="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Default Sell UOM</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="uomId"
                    component={ FormSelect }
                    placeholder="Choose UOM"
                    menuItems={ getMenuItems(uoms) }
                  />
                </Col>
              </Row>
              { !hasInitialProductVariants &&
              <Row start="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Default Location</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="defaultLocationId"
                    component={ FormSelect }
                    placeholder="Choose location"
                    menuItems={ getMenuItems(defaultLocations) }
                  />
                </Col>
              </Row>
              }
              { !isNewSkuItem && !hasInitialProductVariants &&
              <Row start="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Storage Conditions</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="storageConditionId"
                    component={ FormSelect }
                    placeholder="Choose storage condition"
                    menuItems={ getMenuItems(zoneTypes) }
                  />
                </Col>
              </Row>
              }
              { !isNewSkuItem && !hasInitialProductVariants &&
              <Row start="xs" middle="xs">
                <Col xs md={ 2 } lg={ 3 }>
                  <label>Status</label>
                </Col>
                <Col xs md={ 6 } lg={ 5 }>
                  <Field
                    name="statusId"
                    component={ FormSelect }
                    placeholder="Choose storage condition"
                    menuItems={ getMenuItems(skuStatusTypes) }
                  />
                </Col>
              </Row>
              }
              { !isNewSkuItem &&
                <Row start="xs" middle="xs">
                  <Col xs md={ 2 } lg={ 3 }>
                    <label>Description</label>
                  </Col>
                  <Col xs md={ 6 } lg={ 5 }>
                    <Field
                      name="description"
                      placeholder="Description"
                      component={ FormTextArea }
                    />
                  </Col>
                </Row>
              }
            </Col>
          </Row>
          { isNewSkuItem &&
          <Row start="xs" middle="xs">
            <Col xs md={ 2 } lg={ 5 }>
              <div className={ styles.addProductVariantsTitle }>
                { productVariantsVisible &&
                  <CloseIcon
                    onClick={ this.handleToggleProductVariants }
                  />
                }
                { !productVariantsVisible &&
                  <OpenIcon
                    onClick={ this.handleToggleProductVariants }
                  />
                }
                <span className={ styles.productVariantsTitle }>
                  { `${productVariants.length === 0 ? 'Add' : 'Edit'} Product Variants` }
                </span>
              </div>
            </Col>
            <Col xs md={ 6 } lg={ 3 } />
          </Row>
          }
          { isNewSkuItem && productVariantsVisible &&
          <Row>
            <Col xs md lg>
              A product can have one or multiple variants, eg. multiple sizes or colors. Each variant has its own
              set of prices, stock levels, tax options, etc.
              Create variants by defining attributes
            </Col>
          </Row>
          }
          { (productVariantsVisible || hasInitialProductVariants) &&
            <ProductVariants
              isNewSkuItem={ isNewSkuItem }
              hasInitialProductVariants={ hasInitialProductVariants }
              productKeyColumnDisabled={ productKeyColumnDisabled }
              productOptions={ productOptions }
              productVariants={ productVariants }
              handleAddProductOptionRow={ this.handleAddProductOptionRow }
              handleUpdateProductOptionsKeys={ this.handleUpdateProductOptionsKeys }
              handleUpdateProductOptionsValues={ this.handleUpdateProductOptionsValues }
              handleUpdateProductVariants={ this.handleUpdateProductVariants }
            />
          }
          <Controls
            submitButtonVisible
            cancelButtonVisible={ false }
          />
        </form>
      </Spin>
    );
  }
}

MainTab.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  loadingUoms: PropTypes.bool.isRequired,
  isNewSkuItem: PropTypes.bool.isRequired,
  hasInitialProductVariants: PropTypes.bool,
  productKeyColumnDisabled: PropTypes.bool,
  // data
  defaultVariantColumnValues: PropTypes.object.isRequired,
  // static data
  countries: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  taxCategories: PropTypes.array.isRequired,
  defaultLocations: PropTypes.array.isRequired,
  zoneTypes: PropTypes.array.isRequired,
  skuStatusTypes: PropTypes.array.isRequired,
  uoms: PropTypes.array.isRequired,
  // redux-base
  itemInfoSaveRequest: PropTypes.func.isRequired,
  itemInfoUpdateRequest: PropTypes.func.isRequired,
  uomGetRequest: PropTypes.func.isRequired,
  showErrorMessage: PropTypes.func.isRequired,
  // redux-form
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(MainTab));
