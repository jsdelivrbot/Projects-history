import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { FormInput } from 'components';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'antd';
import {
  prodCatSaveRequest
} from 'redux-base/actions';
import { form } from 'styles/common.scss';

const mapDispatchToProps = {
  prodCatSaveRequest
};

const reduxFormConfig = {
  form: 'newProductCategoryForm',
};

export class NewCategory extends Component {
  handleSave = (values) => {
    this.props.prodCatSaveRequest({
      payload: {
        name: values.name,
        parentId: 0
      }
    });
  }

  render() {
    const { handleSubmit, pristine } = this.props;

    return (
      <form
        className={ form }
        onSubmit={ handleSubmit(this.handleSave) }
      >
        <Row middle="xs" center="xs">
          <Col>
            <h3>No product categories found</h3>
          </Col>
        </Row>
        <Row middle="xs" center="xs">
          <Col xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
            <Field
              name="name"
              placeholder="Add your first parent category"
              component={ FormInput }
            />
          </Col>
        </Row>
        <Row middle="xs" center="xs">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={ pristine }
            >
              Add
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

NewCategory.propTypes = {
  // form triggers
  pristine: PropTypes.bool.isRequired,
  // redux-base
  prodCatSaveRequest: PropTypes.func.isRequired,
  // form handleSubmit
  handleSubmit: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(reduxForm(reduxFormConfig)(NewCategory));
