import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import CheckboxTree from './';


const stories = storiesOf('CheckboxTree', module);
stories.addDecorator(withKnobs);

const nodes = [
  {
    label: 'unit 1',
    value: 'unit_1',
    disabled: false,
    children: [
      {
        label: 'customer 2 customer 2',
        value: 'customer_2',
      },
    ],
  },
  {
    label: 'unit 2',
    value: 'unit_2',
    disabled: false,
    children: [
      {
        label: 'customer 11 customer 11',
        value: 'customer_11',
      },
    ],
  },
];

stories.add('CheckboxTree', withInfo('Checkbox Tree component demo')(() =>
  <CheckboxTree nodes={nodes} checked={['customer_2']} onCheckChange={action('Check change')} onExpandNode={action('on expand node')} />,
));
