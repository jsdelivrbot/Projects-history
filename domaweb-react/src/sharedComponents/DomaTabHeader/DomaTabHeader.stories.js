import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object, array } from '@storybook/addon-knobs';

import DomaTabHeader from './index.js';

const stories = storiesOf('DomaTabHeader', module);
stories.addDecorator(withKnobs);

const storyItems1 = [
  {
    name: 'Item 1',
    value: 'item1',
  },
  {
    name: 'Item 2',
    value: 'item2',
  },
  {
    name: 'Item 3',
    value: 'item3',
  },
  {
    name: 'Item 4',
    value: 'item4',
  },
  {
    name: 'Item 5',
    value: 'item5',
  },
];

stories.add('Default DomaTabHeader',
withInfo(
  `DomaTabHeader will render a header with a list of items so users can select.\n
  On desktop screen will render max. 3 items (the items are divided into set of 3 items max.) at a time
  and users click on the unselected item to activate it, use arrow buttons to navigate between the pages.\n
  On mobile screen the users use the arrow button navigate between the previous and next items.\n
  USAGE:\n
  Pass an array of objects to 'items' props.
  Use 'displayProp' to indicate which property in the object to display on the header.\n
  Use 'valueProps' to indicate which property in the object can be used as the value to be emitted.\n
  Remember to attach a handler to 'onChangeItem'.`,
)(() =>
  <DomaTabHeader
    items={object('items', storyItems1)}
    displayProp={text('displayProp', 'name')}
    valueProp={text('valueProp', 'value')}
    onChangeItem={action('onChangeHandler')}
  />,
));

const storyItems2 = [
  {
    name: 'Item',
    value: 'item1',
  },
  {
    name: '',
    value: 'item2',
  },
];

stories.add('DomaTabHeader with custom text with item with no name',
withInfo(
  `By default item with no name (e.g. 'undefined', 'null' or empty string)
  will be rendered with the text "Unnamed item'".\n
  Use 'noDisplayNameText' to apply your own text in this case.`,
)(() =>
  <DomaTabHeader
    items={object('items', storyItems2)}
    displayProp={text('displayProp', 'name')}
    noDisplayNameText={text('noDisplayNameText', 'I have no name')}
    valueProp={text('valueProp', 'value')}
    onChangeItem={action('onChangeHandler')}
  />,
));
