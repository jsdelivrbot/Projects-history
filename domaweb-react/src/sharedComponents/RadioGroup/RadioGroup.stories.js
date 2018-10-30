import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { Row, Col } from 'react-bootstrap';

import RadioGroup from './index.js';
import RadioButton from '../RadioButton/index.js';

const stories = storiesOf('RadioGroup & RadioButton', module);
stories.addDecorator(withKnobs);
const changeValue = (value) => {
  console.log(value);
}

stories.add('Basic usage', withInfo(`RadioGroup is a Higher order component that takes RadioButtons as it's children
and uses a callback function when a child is clicked. DefaultValue can be set using the value prop on RadioGroup`)(() =>
  <div>
    <RadioGroup value={'CONTINUOUS'} onChange={(value) => console.log(value)}>
      <RadioButton value={'CONTINUOUS'} text={'Continuous'} />
      <RadioButton value={'TEMPORARY'} text={'Temporary'} />
      <RadioButton value={'WHEN_NEEDED'} text={'When needed'} />
    </RadioGroup>
  </div>
));

stories.add('Color and size', withInfo(`Color and size can be set from the RadioGroup component via props`)(() =>
  <div>
    <p>Different color and size</p>

    <RadioGroup color={'red'} size={'60px'} value={'CONTINUOUS'} onChange={(value) => console.log(value)}>
      <RadioButton value={'CONTINUOUS'} text={'Continuous'} />
      <RadioButton value={'TEMPORARY'} text={'Temporary'} />
      <RadioButton value={'WHEN_NEEDED'} text={'When needed'} />
    </RadioGroup>
  </div>
));