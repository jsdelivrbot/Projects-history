import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import Button from './index.js';

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);

stories.add('Start',
withInfo(`If we pass the prop 'type' as 'Start' and don't overwrite the styles, it wil use the default style of start button. The text prop is not required but you will always need to pass some text if needed to show on button`)(() =>
  <Button text={text('text', 'Start')} type={text('type', 'Start')} clickHandler={action('clicked')} />));
stories.add('Finish',  withInfo('With type finish and default finish style')(() => <Button text={text('text', 'Finish')} type={text('type', 'Finish')} clickHandler={action('clicked')} />))
stories.add('Custom Styled', withInfo()(() => <Button text={text('text', 'Custom Button')} styles={object('styles', { backgroundColor: 'red', width: '200px' })} clickHandler={action('clicked')} />))
stories.add('Start with Custom Styles', withInfo()(() => <Button text={text('text', 'Custom Button')} type={text('type', 'Start')} styles={object('styles', { width: '200px', height: '100px' })} clickHandler={action('clicked')} />))
stories.add('Hidden', withInfo()(() => <Button type={text('type', 'hidden')} />))
