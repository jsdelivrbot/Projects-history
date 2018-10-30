import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { Row, Col, Button } from 'react-bootstrap';

import FieldRequired from './index.js';

const listWithProps = [{name: 'Cheese'}, {name: 'Apple'}, {name: 'Reaper'}]
const listWithoutProps = ['banana', 'car', 'pinecone'];
const collection = [{ label: 'Huawei', value: '0' }, { label: 'Motorola', value: '1' }, { label: 'Apple', value: '02' }];

const stories = storiesOf('FieldRequired', module);
const Component = ({ required, component }) =>
  <div>
    {!component && <span>input with required field</span>}
    {component && <span>input with FieldRequired as an injected button component</span>}
    <FieldRequired required component={component} />
    <br />
    <input value={''} />
  </div>;
stories.addDecorator(withKnobs);

stories.add('Basic usage', withInfo(`Can be used to represent required fields when making custom components. Displays as a red "*" as default, but can be given a component to render instead`)(() =>
  <div>
    Smart component that uses FieldRequired
    <Component required />
    <br />
    <Component required component={<Button>WHAT</Button>} />
    <br />
    Plain fieldRequired in use
    <FieldRequired required />
  </div>
));