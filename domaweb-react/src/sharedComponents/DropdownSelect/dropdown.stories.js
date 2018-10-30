import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import DropdownSelect from './index.js';

const stories = storiesOf('Dropdown', module);
stories.addDecorator(withKnobs);

stories.add('DropdownSelect', withInfo(`The onChange call back function is not required.
 You can pass both array of strings or array of objects to date prop, but you should pass at least [],
 if there no data for options`)(
    () =>
      <DropdownSelect
        name={'field name'}
        defaultvalue={3}
        data={[]}
        onchange={action('clicked')}
      />),
);
