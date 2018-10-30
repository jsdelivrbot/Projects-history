/* eslint-disable global-require, no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import config from 'config';
import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = (!config.isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();
  const rtMiddleware = routerMiddleware(history);

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(rtMiddleware, sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
