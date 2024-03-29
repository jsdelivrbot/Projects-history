/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PiwikReactRouter from 'piwik-react-router';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import * as NotificationActionsCreators from './ErrorContainer/actions';
import 'sanitize.css/sanitize.css';
import FontFaceObserver from 'fontfaceobserver';

// Import third

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/font.scss';
import './assets/styles/global.scss';
// Import root app
import App from './App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from './App/selectors';

// Import Language Provider
import LanguageProvider from './LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/images/favicon.ico';
import '!file-loader?name=[name].[ext]!./assets/images/brand/domacare_favicon_48x48.png';
import '!file-loader?name=[name].[ext]!./assets/images/brand/domacare_favicon_96x96.png';
import '!file-loader?name=[name].[ext]!./assets/images/brand/domacare_favicon_144x144.png';
import '!file-loader?name=[name].[ext]!./assets/images/brand/domacare_favicon_192x192.png';

import '!file-loader?name=[name].[ext]!./manifest.json';
// import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import 'normalize.css/normalize.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/global.scss';

// Import root routes
import createRoutes from './routes';

import './assets/styles/variables.scss';
import { bindActionCreators } from 'redux';

// Create redux store with history
// this uses the singleton hashHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const hashHistory = useRouterHistory(createhashHistory)();`
const initialState = {};
const store = configureStore(initialState, hashHistory);
window.notificationActions = bindActionCreators(NotificationActionsCreators, store.dispatch);
// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

/* Piwik code */
const piwik = new PiwikReactRouter({
  url: '//analytics.domacare.fi/piwik/',
  siteId: 2,
  trackErrors: true,
});


const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={piwik.connectToHistory(history)}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('domaApp'),
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

else if (process.env.NODE_ENV === 'staging') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
