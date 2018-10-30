// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import {
  ActionButton,
  FormInput,
  FormTextArea,
  FormInputNumber,
  FormSelect,
  FormRadioButtonGroup,
  FormCheckbox,
  FormTimePicker,
  FormDatePicker,
  FormSkuAutoComplete,
  FormBundleAutoComplete,
  FormSupplierAutoComplete
} from 'components';
import { Field, reduxForm } from 'redux-form';
import { form } from 'styles/common.scss';
import { topFormButton, modal } from './TopFormModal.scss';

type TopFormModalProps = {
  // triggers
  loading?: boolean,
  // modal
  title: string,
  okText?: string,
  // modal button
  buttonVisible?: boolean,
  buttonText?: string,
  // redux-form
  initialValues: Object,
  handleSubmit: Function,
  // handlers
  handleSave: Function,
  handleToggleModal: Function,
  // field obj
  fields: Array<{
    name: string,
    header?: string,
    text?: string,
    editableForExistingItem?: boolean,
    editableForNewItem?: boolean,
    // autocomplete
    filterByLocationId?: number,
    // table
    columns?: Array<Object>,
    data?: Array<Object>,
    pagination?: boolean,
    // input number props
    min?: Number,
    max?: Number,
    formatter?: Function,
    parser?: Function,
    // select props
    menuItems?: Array<{
      key: string,
      value: string
    }>,
    // radioButtonGroup
    radioButtonValues?: Array<Object>
  }>,
  // triggers
  visible: boolean,
}

const reduxFormConfig = {
  form: 'topFormModal',
  enableReinitialize: true
};

export class TopFormModal extends Component<TopFormModalProps> {
  handleSave = (values: Object) => {
    this.props.handleSave(values);
  }

  handleCancel = () => {
    this.props.handleToggleModal();
  }

  render() {
    const {
      title,
      buttonVisible = true,
      buttonText,
      okText = 'Save',
      fields,
      handleSubmit,
      initialValues,
      visible,
      loading
    } = this.props;

    return (
      <div>
        { buttonVisible &&
          <ActionButton
            className={ topFormButton }
            onClick={ this.props.handleToggleModal }
          >
            { buttonText }
          </ActionButton>
        }
        <Modal
          className={ modal }
          confirmLoading={ loading }
          visible={ visible }
          title={ title }
          okText={ okText }
          onOk={ handleSubmit(this.handleSave) }
          onCancel={ this.handleCancel }
        >
          <form className={ form }>
            { fields.map(field => (
              <Row start="xs" key={ field.name }>
                <Col lg>
                  { field.header &&
                    <div>
                      <strong>
                        { field.header }
                      </strong>
                    </div>
                  }
                  { field.type === 'text' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormInput }
                    />
                  }
                  { field.type === 'textarea' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormTextArea }
                    />
                  }
                  { field.type === 'number' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      min={ field.min }
                      max={ field.max }
                      parser={ field.parser }
                      formatter={ field.formatter }
                      component={ FormInputNumber }
                    />
                  }
                  { field.type === 'checkbox' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      text={ field.text }
                      component={ FormCheckbox }
                    />
                  }
                  { field.type === 'select' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      menuItems={ field.menuItems }
                      component={ FormSelect }
                    />
                  }
                  { field.type === 'timePicker' &&
                    <Field
                      name={ field.name }
                      timeFormat="HH:mm"
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormTimePicker }
                    />
                  }
                  { field.type === 'datePicker' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormDatePicker }
                    />
                  }
                  { field.type === 'radioButtonGroup' &&
                    <Field
                      name={ field.name }
                      radioButtonValues={ field.radioButtonValues }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormRadioButtonGroup }
                    />
                  }
                  { field.type === 'skuAutoComplete' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormSkuAutoComplete }
                    />
                  }
                  { field.type === 'bundleAutoComplete' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      component={ FormBundleAutoComplete }
                    />
                  }
                  { field.type === 'table' && // TODO Change to FormGridTable
                  <Field
                    name={ field.name }
                    columns={ field.columns }
                    dataSource={ field.data }
                    pagination={ field.pagination }
                    disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                    component={ Table }
                  />
                  }
                  { field.type === 'supplierAutoComplete' &&
                    <Field
                      name={ field.name }
                      disabled={ (initialValues && !!initialValues.id && !field.editableForExistingItem) || !field.editableForNewItem }
                      filterByLocationId={ field.filterByLocationId }
                      component={ FormSupplierAutoComplete }
                    />
                  }
                </Col>
              </Row>))}
          </form>
        </Modal>
      </div>
    );
  }
}

TopFormModal.propTypes = {
  // triggers
  loading: PropTypes.bool.isRequired,
  // props
  title: PropTypes.string.isRequired,
  buttonVisible: PropTypes.bool,
  buttonText: PropTypes.string,
  okText: PropTypes.string,
  fields: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  // handlers
  handleSave: PropTypes.func.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  // redux-form
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default reduxForm(reduxFormConfig)(TopFormModal);
