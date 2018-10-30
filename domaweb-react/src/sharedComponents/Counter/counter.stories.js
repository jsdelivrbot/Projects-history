import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import Counter from './index.js';

const stories = storiesOf('Counter', module);
stories.addDecorator(withKnobs);

stories.add('Forward Counter',
withInfo(`There are two modes of counter, one in normal mode and the other is reverse countdown.
  You will need to pass the time in minutes. The onFinished prop call back function can be passed.
  It will call for normal counter when the page will change and for reverse counter when it will finish.
  StartMinutes prop is mendatory`)(() =>
  <Counter startMinutes={45} />));
stories.add('Forard Counter with custom style',  withInfo(`There is no style added with counter.
Two ways we can add styles, one with inline style prop and other className`)(() => <Counter startMinutes={45} style={{ color: 'red' }} />));
stories.add('Forard Counter with custom format', withInfo('The default format is in minute is \'mm:ss\' and when the time is more than one hour is \'HH:mm:ss\'')(() => <Counter startMinutes={45} format={'HH:mm'} />))
stories.add('Reverse counter', withInfo('Supports all the props of forward counter')(() => <Counter startMinutes={45} reverse />));
