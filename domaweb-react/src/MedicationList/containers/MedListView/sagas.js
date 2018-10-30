import { take, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { selectMedListViewDomain, makeSelectMedListView, makeSelectTabs, selectAddNewModal } from './selectors'
import { toggleMedView, setModalStatus, resetTabs, setAddNewModalStatus } from './actions';

// Individual exports for testing
export function* medListViewSaga() {
  // See example in containers/HomePage/sagas.js
  const { modal } = yield select(makeSelectMedListView());
  console.log(modal);
  //reverses the boolean value in actions
  yield put(setModalStatus(modal));
}

export function* toggleTabsSaga(action) {
  const tabs = yield select(makeSelectTabs());
  const { active } = action;
  Object.keys(tabs).forEach(element => {
    if (element === active) {
      console.log('was true');
      tabs[element] = true;
    } else {
      tabs[element] = false;
    }
  });
  yield put(resetTabs(tabs));
}

export function* toggleAddNewModalSaga() {
  const modal = yield select(selectAddNewModal());
  yield put(setAddNewModalStatus(modal));
}

// All sagas to be loaded
export default [
  //medListRootSaga,
];
