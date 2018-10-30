import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { Col, Row } from 'react-bootstrap';

import ExpandableHeader from './index.js';

const stories = storiesOf('ExpandableHeader', module);
stories.addDecorator(withKnobs);

stories.add('ExpandableHeader', withInfo(`This component can be used to implement
accordion -like behaviour. Children are rendered, when the header is clicked, and hidden when it is clicked again.
The header gets optional (but very helpful) props named: text, color and number. Text defines the text displayed next to the + button.
Color is a color code string that is implemented into the component as style prop. If a number prop is given, it is
displayed as a floating element in the right corner of the component.`)(
    () =>
      <div>
      <ExpandableHeader text={'Nice text'} color={'#ee1f79'} number={'5'}>
       <div>Cock magic</div>
      </ExpandableHeader>
      <ExpandableHeader text={'Different color and no number'} color={'#00AEEF'}>
        <div>list item 1</div>
        <div>list item 2</div>
      </ExpandableHeader>  
      </div>
    )
  );