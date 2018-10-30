import React from 'react';
//import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';


import Snackbar from './index.js';


const stories = storiesOf('Snackbar', module);
stories.addDecorator(withKnobs)

stories.add('Snackbar', withInfo(`This component can be used to show error notifications.`)(
    () =>
      <div>
        <Snackbar />
      </div>
    )
  );
