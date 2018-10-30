import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Spin, Card } from 'antd';
import { reduxForm, Field } from 'redux-form';
import { FormInput, Controls } from 'components';
import {
  extrasUpdateRequest
} from 'redux-base/actions';
import { form, card } from 'styles/common.scss';

const mapStateToProps = state => ({
  initialValues: state.transporters.extras,
  loadingPage: state.transporters.loadingPage
});

const mapDispatchToProps = {
  extrasUpdateRequest
};

const reduxFormConfig = {
  form: 'fulfilmentApiInfoTab',
  enableReinitialize: true
  // validate: fulfilmentApiInfoTabFormValidation
};

export class ApiInfoTab extends Component {

  handleSave = (formValues) => {
    this.props.extrasUpdateRequest({
      id: this.props.fulfilmentId,
      payload: formValues
    });
  }

  render() {
    const {
      handleSubmit,
      loadingPage
    } = this.props;

    return (
      <div>
        <Spin spinning={ loadingPage }>
          <form
            onSubmit={ handleSubmit(this.handleSave) }
            className={ form }
          >
            <Row>
              <Col xs={ 12 } mdOffset={ 4 } md={ 4 } lgOffset={ 4 } lg={ 4 }>
                <Card className={ card }>
                  <Row middle="xs" center="xs">
                    <Col xs={ 4 } md={ 4 } lg={ 4 }>
                      <label>API Key</label>
                    </Col>
                    <Col xs={ 8 } md={ 8 } lg={ 8 }>
                      <Field
                        name="apiKey"
                        component={ FormInput }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs" center="xs">
                    <Col xs={ 4 } md={ 4 } lg={ 4 }>
                      <label>Customer Id</label>
                    </Col>
                    <Col xs={ 8 } md={ 8 } lg={ 8 }>
                      <Field
                        name="customerId"
                        component={ FormInput }
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={ 12 } mdOffset={ 4 } md={ 4 } lgOffset={ 4 } lg={ 4 }>
                <Controls
                  submitButtonVisible
                  cancelButtonVisible={ false }
                />
              </Col>
            </Row>
          </form>
        </Spin>
      </div>
    );
  }
}

ApiInfoTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  fulfilmentId: PropTypes.string.isRequired,
  // redux-base
  extrasUpdateRequest: PropTypes.func.isRequired,
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(ApiInfoTab));
