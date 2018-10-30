import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import icon from '../../assets/images/newSVG/ic_done_white.svg';

import CheckboxCommon from './index.js';

let value = true;

const stories = storiesOf('CheckboxCommon', module);
stories.addDecorator(withKnobs);

stories.add('Checkbox', withInfo('Cannot load image so its a bit hard to explain anything')(() => 
  <CheckboxCommon text={'Nice box'} value={value}  />
));

/*stories.add('Start',
withInfo(`If we pass the prop 'type' as 'Start' and don't overwrite the styles, it wil use the default style of start CheckboxCommon. The text prop is not required but you will always need to pass some text if needed to show on CheckboxCommon`)(() =>
  <CheckboxCommon text={text('text', 'Start')} type={text('type', 'Start')} clickHandler={action('clicked')} />));
stories.add('Finish',  withInfo('With type finish and default finish style')(() => <CheckboxCommon text={text('text', 'Finish')} type={text('type', 'Finish')} clickHandler={action('clicked')} />))
stories.add('Custom Styled', withInfo()(() => <CheckboxCommon text={text('text', 'Custom CheckboxCommon')} styles={object('styles', { backgroundColor: 'red', width: '200px' })} clickHandler={action('clicked')} />))
stories.add('Start with Custom Styles', withInfo()(() => <CheckboxCommon text={text('text', 'Custom CheckboxCommon')} type={text('type', 'Start')} styles={object('styles', { width: '200px', height: '100px' })} clickHandler={action('clicked')} />))
stories.add('Hidden', withInfo()(() => <CheckboxCommon type={text('type', 'hidden')} />))
*/