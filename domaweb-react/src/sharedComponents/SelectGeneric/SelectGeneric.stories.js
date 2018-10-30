import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { Row, Col } from 'react-bootstrap';

import Select from './index.js';

const listWithProps = [{name: 'Cheese'}, {name: 'Apple'}, {name: 'Reaper'}]
const listWithoutProps = ['banana', 'car', 'pinecone'];
const collection = [{ label: 'Huawei', value: '0' }, { label: 'Motorola', value: '1' }, { label: 'Apple', value: '02' }];

const stories = storiesOf('Select', module);
stories.addDecorator(withKnobs);
const changeValue = (value) => {
  console.log(value);
}

stories.add('Basic usage', withInfo(`Select component that takes options (an array), defaultMessage for empty selection and a text
uses fieldRequired internally so can take a required prop (boolean). Can be used to render a plain array, array of objects with specific
accessor properties, or a basic array of objects with value and label properties`)(() =>
  <div>
    <div>Rendering a plain array</div>
    <br />
    <Select defaultMessage={'--make a selection--'} text={'Useful everyday objects'} options={listWithoutProps} />
  </div>
));

stories.add('Special cases 1', withInfo(`You might receive a JSON from server which has fields you have no
control over. In this case you can use propertyName and propertyValue props to decide which properties you want to
pass back on select, and which properties you want to display in the box`)(() =>
  <div>
    <div>Rendering a specialized array</div>
    <br />
    <Select defaultMessage={'--nothing has been chosen--'} options={listWithProps} propertyName={'name'} propertyValue={'value'} required text={'Customers'} />
  </div>
));

stories.add('Special cases 2: collection', withInfo(`Maybe you want to render form elements declaratively (with a HOC) out of a self made collection?
you can use the collection prop for this. When collection prop is on, Select automatically uses value and label properties of an object.
Label is the displayed name, and value is passed in the callback`)(() =>
  <div>
    <div>Rendering a collection</div>
    <br />
    <Select required options={collection} collection text={'Phones'} defaultMessage={'-choose a nice phone-'} />
  </div>
));