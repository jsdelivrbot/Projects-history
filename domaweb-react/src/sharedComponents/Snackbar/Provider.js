import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from '../../store';

const store = configureStore(browserHistory, {});

const Provider = (story) => {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  );
};

export default Provider;
