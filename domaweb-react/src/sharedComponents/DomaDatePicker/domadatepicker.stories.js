import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import DatePicker from './index.js';
import TimePicker from '../DomaTimePicker';

const stories = storiesOf('Time and Date Pickers', module);
stories.addDecorator(withKnobs);

stories.add('DomaDatePicker', withInfo(`The onChange call back function is required. If the startDate prop is not provided the current date will be used.
  The default format for date passed to onChange call back function is 'YYYY-MM-DD'. It can be changed by passing any of the moment date formate`)(
    () => <DatePicker format={'MMM Do YY'} startDate={'2017-01-05'} onChange={action('clicked')} />),
  );
stories.add('DomaTimePicker', withInfo(`The time picker will use the curent time unless the default value is provided. The default return time format is 'HH:mm'. You can overwrite it by passing the moment format string to format prop`)(
  () => <TimePicker format={'HH:mm:ss'} width={number('width', 200)} onChange={action('clicked')} />),
);
