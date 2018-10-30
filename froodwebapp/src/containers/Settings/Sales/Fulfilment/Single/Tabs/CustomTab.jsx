import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { reduxForm, Field } from 'redux-form';
import { PageHeader, FormTextArea, Controls } from 'components';
import {
  extrasUpdateRequest
} from 'redux-base/actions';
import { form } from 'styles/common.scss';

const mapStateToProps = state => ({
  initialValues: state.transporters.extras,
  loadingPage: state.transporters.loadingPage
});

const mapDispatchToProps = {
  extrasUpdateRequest
};

const reduxFormConfig = {
  form: 'fulfilmentCustomTab',
  enableReinitialize: true
  // validate: fulfilmentCustomTabFormValidation
};

export class CustomTab extends Component {

  handleSave = (formValues) => {
    this.props.extrasUpdateRequest({
      id: this.props.fulfilmentId,
      payload: formValues
    });
  }

  render() {
    const {
      handleSubmit,
      readonly,
      loadingPage
    } = this.props;

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <PageHeader
            bigText="Custom Text"
          />
          <form
            onSubmit={ handleSubmit(this.handleSave) }
            className={ form }
          >
            <Row>
              <Col lg>
                <strong>Label</strong>
              </Col>
            </Row>
            <Row>
              <Col lg>
                <Field
                  name="customNotes"
                  placeholder="Any text that will appear in shopping card"
                  disabled={ readonly }
                  component={ FormTextArea }
                />
              </Col>
            </Row>
            { !readonly && <Controls
              submitButtonVisible
              cancelButtonVisible={ false }
            /> }
          </form>
        </Spin>
      </div>
    );
  }
}

CustomTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // state
  readonly: PropTypes.bool.isRequired,
  // data
  fulfilmentId: PropTypes.string.isRequired,
  // redux-base
  extrasUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(CustomTab));
