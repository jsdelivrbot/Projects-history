import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { Row, Col } from 'react-bootstrap';

import DomaAutocomplete from './index.js';

const list = [{name: 'Cheese'}, {name: 'Apple'}, {name: 'Reaper'}]
const defaultValue = 'Mars';
const defaultObjectValue = {name: 'Uranus'};

const stories = storiesOf('Autocomplete', module);
stories.addDecorator(withKnobs);
const changeValue = (value) => {
  console.log(value);
}

stories.add('Basic usage', withInfo(`Autocomplete that has required props of list, and propName.
List is the list tyou are searching from, and propName is the property of the object you want to access, in this example it is: name.
Element width is always 100% so make it the size you want by wrapping into Col or equivalent.
NOTE: Items can be navigated via keyboard also`)(() =>
  <div>
    <DomaAutocomplete text={'Cosmological phenomena'} onChange={changeValue} required list={list} propName={'name'} />
  </div>
));

stories.add('Default value and return types', withInfo(`You can rig the field to receive a default value upon mounting.
This value can be either an object, or a plain string. If you use an object, make sure to include returnObject prop
into the component. When returnObject is true, the field also returns and object as it's callback. When it is false,
it returns a plain string. Giving a default value as an object without returnObject results in an error`)(() =>
  <div>
    Default value as plain string
    <DomaAutocomplete text={'Jupiter'} onChange={changeValue} value={defaultValue} required list={list} propName={'name'} />
    <br />
    Default value as an object
    <DomaAutocomplete text={'Jupiter'} returnObject onChange={changeValue} value={defaultObjectValue} required list={list} propName={'name'} />
  </div>
));

/*stories.add('Start',
withInfo(`If we pass the prop 'type' as 'Start' and don't overwrite the styles, it wil use the default style of start DomaAutocomplete. The text prop is not required but you will always need to pass some text if needed to show on DomaAutocomplete`)(() =>
  <DomaAutocomplete text={text('text', 'Start')} type={text('type', 'Start')} clickHandler={action('clicked')} />));
stories.add('Finish',  withInfo('With type finish and default finish style')(() => <DomaAutocomplete text={text('text', 'Finish')} type={text('type', 'Finish')} clickHandler={action('clicked')} />))
stories.add('Custom Styled', withInfo()(() => <DomaAutocomplete text={text('text', 'Custom DomaAutocomplete')} styles={object('styles', { backgroundColor: 'red', width: '200px' })} clickHandler={action('clicked')} />))
stories.add('Start with Custom Styles', withInfo()(() => <DomaAutocomplete text={text('text', 'Custom DomaAutocomplete')} type={text('type', 'Start')} styles={object('styles', { width: '200px', height: '100px' })} clickHandler={action('clicked')} />))
stories.add('Hidden', withInfo()(() => <DomaAutocomplete type={text('type', 'hidden')} />))*/
