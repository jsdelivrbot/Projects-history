import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import getRoutes from 'routes';
import { ConnectedRouter } from 'react-router-redux';

const AppRootComponent = ({ store, history }) => (
  <Provider store={ store } >
    <ConnectedRouter history={ history }>
      { getRoutes(store.getState) }
    </ConnectedRouter>
  </Provider>
);

AppRootComponent.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
};

export default AppRootComponent;
