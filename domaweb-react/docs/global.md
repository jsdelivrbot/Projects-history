# Global Reducers and sagas

The usual way is local, not global.

Usually we want to contain our sagas and reducers into specific routes.
This makes it possible for us to split our code into chunks. Webpack builds our app into
separated chunks, that are loaded from the server on cue. This reduces initial load time
and especially code parsing time which is the most CPU / time consuming part of starting the app.
Benefits of this approach increase along with app size.

## Here is the usual way: reducers and sagas injected at routes.js file
```javascript

return [
  {
    path: '/login',
    name: 'login',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('Login/containers/Login/reducer'),
        import('Login/containers/Login/sagas'),
        import('Login/containers/Login/'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([reducer, sagas, component]) => {
        injectReducer('login', reducer.default);
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  },
]
```

However, we have many features that are by design global. They need to be available
from any part of the app. This is the only way to handle for an example, authorization logic,
but also many features like the medication list or wallet are accessible from many different
features.

## Global reducers
at - [src/reducers](src/reducers.js)

We import the reducers we want to be able to catch actions globally, and we use
combineReducers function to compose them together.
```javascript

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'LanguageProvider/reducer';
import medicationListReducer from 'MedicationList/containers/MedicationList/reducer';
import authRequiredReducer from 'sharedComponents/AuthRequired/reducer';
import notificationReducer from 'ErrorContainer/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    auth: authRequiredReducer,
    language: languageProviderReducer,
    medicationList: medicationListReducer,
    notifications: notificationReducer,
    ...asyncReducers,
  });
}

```
## Global sagas
at - [src/globalSagas](src/globalSagas.js)

We import necessary root sagas from our features, and yield them as functions
in our global root saga
```javascript

import { take, all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { authRootSaga } from './sharedComponents/AuthRequired/sagas';
import { medicationRootSaga } from './MedicationList/containers/MedicationList/sagas';

// Individual exports for testing
export function* globalRootSaga() {
  // ADD ALL GLOBAL SAGAS INSIDE YIELD
  yield [
    authRootSaga(),
    medicationRootSaga(),
  ];
  //const globalWatcher = yield all([authRootSaga(), medicationRootSaga()]);
}

// All sagas to be loaded
export default [
  globalRootSaga,
];

```
The yielded sagas are basically other root sagas that yield watchers or other root
sagas

example:

```javascript
export function* medicationRootSaga() {
  // See example in containers/HomePage/sagas.js
  console.log('medication saga');
  const modalStateWatcher = yield takeEvery(TOGGLE_MED_VIEW, medListViewSaga);
  console.log('modalstatewatcher');
  const toggleTabsWatcher = yield takeEvery(TOGGLE_TABS, toggleTabsSaga);
  const addNewModalWatcher = yield takeEvery(TOGGLE_ADD_NEW_MODAL, toggleAddNewModalSaga);
  const initWatcher = yield takeLatest(INIT_MEDICATION_LIST, getAllMeds);
  const getMedListWatcher = yield takeLatest(TOGGLE_MED_VIEW, defaultMedicationSaga);
  const testWatcher = yield takeEvery(TEST, testSaga);
  //you can also straight yield other root sagas. Easy to compose
  yield addNewMedicationRootSaga();
}
```

[Back to Main Documentation Page] (../README.md)
