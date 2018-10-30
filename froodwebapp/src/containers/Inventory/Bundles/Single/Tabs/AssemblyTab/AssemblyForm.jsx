/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import {
  FormInputNumber,
  Button,
} from 'components';
import {
  bundleAssembliesGetRequest,
  bundleAssembliesUpdateRequest,
} from 'redux-base/actions';
import { reduxForm, Field } from 'redux-form';
import { form } from 'styles/common.scss';
import { assembledButton, disassembledButton } from './AssemblyForm.scss';

const reduxFormConfig = {
  form: 'itemBundleAssemblyForm',
  enableReinitialize: true
};

const mapStateToProps = state => ({
  initialValues: state.bundle.bundleAssemblies
});

const mapDispatchToProps = {
  bundleAssembliesGetRequest,
  bundleAssembliesUpdateRequest,
};

export class AssemblyForm extends Component {
  handleUpdate = (values) => {
    const doAssemble = this.props.initialValues.assembledQty === 0;
    const payload = {
      qty: doAssemble ? values.assembledQty : values.disassembledQty,
      operation: doAssemble ? 'assemble' : 'disassemble'
    };

    if (doAssemble) {
      payload.id = this.props.initialValues.id;
    }

    this.props.bundleAssembliesUpdateRequest({
      id: this.props.bundleId,
      payload
    });
  }

  render() {
    const {
      initialValues,
      handleSubmit
    } = this.props;

    const showAssemble = initialValues.assembledQty === 0;

    return (
      <div>
        <form
          onSubmit={ handleSubmit(this.handleUpdate) }
          className={ form }
        >
          <Row bottom="xs">
            <Col xs={ 12 } lg={ 5 }>
              <Row middle="xs" center="xs">
                <Col xs={ 5 }>
                  <label>Max Bundle Quantity</label>
                </Col>
                <Col xs={ 7 }>
                  <Field
                    name="maxBundleQty"
                    min={ 0 }
                    disabled
                    component={ FormInputNumber }
                  />
                </Col>
              </Row>
              <Row middle="xs" center="xs">
                <Col xs={ 5 }>
                  <label>Assembled Bundle Quantity</label>
                </Col>
                <Col xs={ 7 }>
                  <Field
                    name="assembledQty"
                    disabled={ !showAssemble }
                    max={ initialValues.maxBundleQty }
                    min={ 0 }
                    component={ FormInputNumber }
                  />
                </Col>
              </Row>
              { !showAssemble &&
                <Row middle="xs" center="xs">
                  <Col xs={ 5 }>
                    <label>Disassembled Bundle Quantity</label>
                  </Col>
                  <Col xs={ 7 }>
                    <Field
                      name="disassembledQty"
                      max={ initialValues.assembledQty }
                      min={ 0 }
                      component={ FormInputNumber }
                    />
                  </Col>
                </Row>
              }
            </Col>
            <Col lg={ 2 }>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    className={ showAssemble ? assembledButton : disassembledButton }
                  >
                    { showAssemble ? 'Assemble' : 'Disassemble' }
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

AssemblyForm.propTypes = {
  // redux-form related props
  handleSubmit: PropTypes.func.isRequired,
  // props
  bundleId: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  // redux-base
  bundleAssembliesUpdateRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormConfig)(AssemblyForm));
