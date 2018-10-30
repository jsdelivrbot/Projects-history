import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import { Form, Field, FormSpy } from 'react-final-form';

import { Textarea, Input, Select, Checkbox, RadioParent } from './index.js';
import RadioButton from '../RadioButton/index.js';
import RadioGroup from '../RadioGroup';

const listWithProps = [{name: 'Cheese'}, {name: 'Apple'}, {name: 'Reaper'}]
const listWithoutProps = ['banana', 'car', 'pinecone'];
const collection = [{ label: 'Huawei', value: '0' }, { label: 'Motorola', value: '1' }, { label: 'Apple', value: '02' }];

const stories = storiesOf('Final Form components', module);
stories.addDecorator(withKnobs);

const onSubmit = (values) => window.alert(`the form you posted: ${values}`);

const Full = ({children}) => <Col lg={12} md={12} sm={12} xs={12}>{children}</Col>
const Half = ({children}) => <Col lg={6} md={6} sm={6} xs={6}>{children}</Col>

const containsNoNumbers = (string) => {
    const test = /\d/.test(string);
    if (test) {
      return 'The field should not containn numbers or cock magic';
    }
    return undefined;
  }

stories.add('Basic usage', withInfo(`Reusable (soon reconfigurable) components to be used with final form`)(() =>
  <Grid>
      <Row>
    <Form
          onSubmit={onSubmit}
          initialValues={{ duck: 'yes' }}
          subscription={{submitting: true, pristine: true}}
          render={({handleSubmit, reset, submitting, pristine, values, validating}) => {
            return (
              <form id="newRequestForm" onSubmit={handleSubmit}>
                <Half>
                    <Field
                        name="name"
                        component={Input}
                        type="text"
                        validate={containsNoNumbers}
                        maxLength={50}
                        placeholder={'My god what have i done'}
                        label={'Customer awesomeness'}
                        >
                    </Field>
                </Half>
                <Half>
                    <Field
                        name="area"
                        component={Textarea}
                        type="text"
                        validate={containsNoNumbers}
                        label={'Customer ramblings'}
                        >
                    </Field>
                </Half>
                <Half>
                    <Field
                        name="select"
                        component={Select}
                        type="text"
                        validate={containsNoNumbers}
                        options={[{label: 'Tomato', value: '0'}, {label: 'Pear', value: 'cat hahah'}]}
                        label={'Eino'}
                        >
                        Customer pets
                    </Field>
                </Half>
                <Half>
                    <Field
                        name="check"
                        component={Checkbox}
                        type="text"
                        style={{width: '100px'}}
                        >
                        Customer takes alcohol
                    </Field>
                </Half>
                <Half>
                    <Field
                        name="radio"
                        component={RadioParent}
                        type="text"
                        style={{width: '100px'}}
                        >
                        <RadioButton value={'Horrible'} text={'Horrible'} />
                        <RadioButton value={'Fantastic'} text={'Fantastic'} />
                    </Field>
                </Half>
                <Half>
                  <FormSpy subscription={{ values: true }}>
                    {({values}) =>
                        <div>
                            {JSON.stringify(values)}
                        </div>
                    }
                  </FormSpy>
                </Half>
              </form>
            )
          }}
        />
        </Row>
  </Grid>
));