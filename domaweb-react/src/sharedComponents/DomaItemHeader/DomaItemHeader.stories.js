import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object, array } from '@storybook/addon-knobs';

import DomaItemHeader from './index.js';

const stories = storiesOf('DomaItemHeader', module);
stories.addDecorator(withKnobs);

stories.add('Default DomaItemHeader',
withInfo(
  `DomaItemHeader will render a header with a date, display name, and modify & remove buttons (optional)\n
  NOTE: Only display properly within project, not in storybook`,
)(() =>
  <DomaItemHeader
    date={text('date', '08.11.2017 11:20')}
    name={text('name', 'Tester')}
    value={text('value', 'Some value')}
    onEdit={action('onEditHandler')}
    onRemove={action('onRemoveHandler')}
  />,
));

stories.add('DomaItemHeader with custom blackground color and text color',
withInfo(
  `Use 'blackgroundColor' and 'textColor' props to define color but background and text.\n
  NOTE: Only display properly within project, not in storybook`,
)(() =>
  <DomaItemHeader
    date={text('date', '08.11.2017 11:20')}
    name={text('name', 'Tester')}
    value={text('value', 'Some value')}
    onEdit={action('onEditHandler')}
    onRemove={action('onRemoveHandler')}
    backgroundColor={text('backgroundColor', 'yellow')}
    textColor={text('textColor', 'black')}
  />,
));
