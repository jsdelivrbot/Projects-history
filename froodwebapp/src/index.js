/* eslint-disable
  react/jsx-filename-extension,
  global-require,
  import/no-extraneous-dependencies
*/
import React from 'react';
import { render } from 'react-dom';
import config from 'config';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from 'redux-base/configureStore';
import AppRootComponent from './AppRootComponent';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const history = createHistory();
const store = configureStore(history);

if (!config.isProduction) {
  render(
    <AppContainer>
      <AppRootComponent store={ store } history={ history } />
    </AppContainer>,
    document.getElementById('root')
  );
} else {
  render(
    <AppRootComponent store={ store } history={ history } />,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./AppRootComponent', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./AppRootComponent').default;

    render(
      <AppContainer>
        <NextApp store={ store } history={ history } />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
