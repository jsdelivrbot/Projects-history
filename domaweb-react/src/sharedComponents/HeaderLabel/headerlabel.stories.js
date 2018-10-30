import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import HeaderLabel from './index.js';

const stories = storiesOf('Header Label', module);
stories.addDecorator(withKnobs);

stories.add('Header label and text', withInfo(`Set header color and text via props`)(() =>
  <div>
    <HeaderLabel
      headercolor={'#0071BC'}
      labeltext={"Booking"}
    />
  </div>
));
