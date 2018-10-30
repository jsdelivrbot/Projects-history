import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Spin, Card } from 'antd';
import { reduxForm, Field } from 'redux-form';
import { PageHeader,
  FormInputNumber,
  FormTimePicker,
  FormSwitch,
  Controls
} from 'components';
import {
  extrasUpdateRequest
} from 'redux-base/actions';
import { card } from 'styles/common.scss';

const mapStateToProps = state => ({
  initialValues: state.transporters.extras,
  loadingPage: state.transporters.loadingPage
});

const mapDispatchToProps = {
  extrasUpdateRequest
};

const reduxFormConfig = {
  form: 'fulfilmentCutOffTab',
  enableReinitialize: true
  // validate: fulfilmentCutOffFormValidation
};

export class CutOffTab extends Component {

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
            bigText="Delivery Cutoffs"
          />
          <form onSubmit={ handleSubmit(this.handleSave) }>
            <Row>
              <Col xs={ 12 } md={ 6 } lg={ 6 }>
                <Card className={ card }>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 3 } lg={ 3 }>Same Day delivery</Col>
                    <Col xs={ 12 } md={ 4 } lg={ 4 }>
                      <Field
                        name="sameDay.isActive"
                        checkedText="ON"
                        unCheckedText="OFF"
                        disabled={ readonly }
                        component={ FormSwitch }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 2 } lg={ 2 }>Cutoff time</Col>
                    <Col xs={ 12 } md={ 6 } lg={ 6 }>
                      <Field
                        name="sameDay.time"
                        timeFormat="HH:mm"
                        disabled={ readonly }
                        component={ FormTimePicker }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 12 } lg={ 12 }>
                      Minimum time between ordering and delivery
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 2 } lg={ 2 }>In Minutes</Col>
                    <Col xs={ 12 } md={ 6 } lg={ 6 }>
                      <Field
                        name="sameDay.interval"
                        disabled={ readonly }
                        component={ FormInputNumber }
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={ 12 } md={ 6 } lg={ 6 }>
                <Card className={ card }>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 3 } lg={ 3 }>Next Day delivery</Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 2 } lg={ 2 }>Cutoff time</Col>
                    <Col xs={ 12 } md={ 6 } lg={ 6 }>
                      <Field
                        name="nextDay.time"
                        timeFormat="HH:mm"
                        disabled={ readonly }
                        component={ FormTimePicker }
                      />
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 12 } lg={ 12 }>
                      Minimum time between ordering and delivery
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 2 } lg={ 2 }>In Days</Col>
                    <Col xs={ 12 } md={ 6 } lg={ 6 }>
                      <Field
                        name="nextDay.interval"
                        disabled={ readonly }
                        component={ FormInputNumber }
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 } md={ 6 } lg={ 6 }>
                <Card className={ card }>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 8 } lg={ 8 }>
                      Lead days to show calendar for delivery acceptance
                    </Col>
                  </Row>
                  <Row middle="xs">
                    <Col xs={ 12 } md={ 2 } lg={ 2 }>In Days</Col>
                    <Col xs={ 12 } md={ 6 } lg={ 6 }>
                      <Field
                        name="calLeadDays"
                        disabled={ readonly }
                        component={ FormInputNumber }
                      />
                    </Col>
                  </Row>
                </Card>
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

CutOffTab.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(CutOffTab));
