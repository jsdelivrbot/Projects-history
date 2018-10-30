import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';

import SearchBar from './index.js';

const stories = storiesOf('SearchBar', module);
stories.addDecorator(withKnobs);

stories.add('Default SearchBar',
withInfo(
  `SearchBar will render an input field with the placeholder text "Search..." by default.\n
  A callback is required for onChange props.\n
  By default it will emit the value 500ms after the last keystroke.`,
)(() =>
  <SearchBar onChange={action('onChangeHandler')} />,
));

stories.add('SearchBar with custom wait interval',
withInfo(
  "Use the 'waitInterval' props to set custom wait interval for onChange event.",
)(() =>
  <SearchBar
    onChange={action('onChangeHandler')}
    waitInterval={number('waitInterval', 2000)}
  />,
));

stories.add('SearchBar with instant emitted value',
withInfo(
  `Use 'instant' props so that the value will be emitted with every keystroke.\n
  Warning: This will omit the 'waitInterval' props.`,
)(() =>
  <SearchBar
    onChange={action('onChangeHandler')}
    instant
  />,
));

stories.add('SearchBar with custom styles and props',
withInfo(
  `Use 'styles' props to set custom styles for SearchBar.\n
  SearchBar accepts any attributes that are native to <input> element.`,
)(() =>
  <SearchBar
    onChange={action('onChangeHandler')}
    styles={object('styles', {
      backgroundColor: 'yellow',
    })}
    placeholder={text('placeholder', 'Search 5 letters max...')}
    maxLength={number('maxLength', 5)}
  />,
));
