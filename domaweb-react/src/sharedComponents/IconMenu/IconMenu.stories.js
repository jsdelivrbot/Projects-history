import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { IntlProvider } from 'react-intl';

import IconMenu from './';

const stories = storiesOf('Menu', module);
stories.addDecorator(withKnobs);

stories.add('Icon Menu not selected',
withInfo(
  'Icon Menu component',
)(() =>
  <IntlProvider locale="en">
    <div style={{ width: '300px' }}>
      <IconMenu />
    </div>
  </IntlProvider>,
));

stories.add('Icon Menu selected',
withInfo(
  'Icon Menu component',
)(() =>
  <IntlProvider locale="en">
    <div style={{ width: '300px' }}>
      <IconMenu iconBackground="red" selected />
    </div>
  </IntlProvider>,
));