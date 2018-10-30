import { take, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getSingleMedication, getMedicationListSuccess, getMedicationList, updateFormValueLazy} from './actions';
import { getMedicationListSaga } from '../../../sharedComponents/Medication/sagas';
import { selectCurrentUser, selectMedicationTemplate, selectFormFields } from './selectors';
import { COMPOUND_ACTION, UPDATE_FORM_VALUE, VALIDATE_ALL, SUBMIT, INIT_INFO } from './constants';
import { updateFormValue, updateRequired } from './actions';
import rules from './formRules';
import approve from 'approvejs';
import { postMedication } from './addNewMedicationApi';

// Individual exports for testing
export function* addNewMedicationRootSaga() {
  const compoundActionWatcher = yield takeEvery(COMPOUND_ACTION, compoundCreator);
  const validationWatcher = yield takeLatest(UPDATE_FORM_VALUE, validate);
  const validateAllWatcher = yield takeEvery(VALIDATE_ALL, validateAllSaga);
  const submitWatcher = yield takeLatest(SUBMIT, submitNewMedicationSaga);
  const initWatcher = yield takeLatest(INIT_INFO, initSaga);
}

export function* initSaga({ customer }) {
  yield put(updateFormValue('customer', { 'id': customer }));
  yield put(updateFormValue('customerId', customer));
}

export function* defaultMedicationSaga() {
  // See example in containers/HomePage/sagas.js
  const data = {
    success: getMedicationListSuccess,
  };
  console.log('worked');
  yield getMedicationListSaga(data);
}

export function* testSaga() {
  console.log('worked');
}

export function* compoundCreator ({ data }) {
  const { vnrId, fullName } = data;
  yield put(updateFormValue('medicationCode', vnrId));
  yield put(updateFormValue('name', fullName));
}

export function* validateAllSaga() {
  const form = yield select(selectFormFields());
  for (let item of Object.keys(form)) {
    try {
      console.log(item);
      const result = approve.value(form[item], rules[item]);
      if (!result.approved) {
        yield put(updateRequired(item, true));
      } else {
        yield put(updateRequired(item, false));
      }
    } catch(error) {
      console.log(error);
    }
  }
}

export function* validate({ fragment, value }) {
  yield delay(500);
  try {
    console.log('started after delay');
    const result = approve.value(value, rules[fragment]);
    console.log(result);
    if (!result.approved) {
      yield put(updateRequired(fragment, true));
    } else {
      yield put(updateRequired(fragment, false));
    }
  } catch(error) {
    console.log(error);
  }
}

export function* submitNewMedicationSaga({ customerId }) {
  const { id, firstName, lastName } = yield select(selectCurrentUser());
  yield put(updateFormValueLazy('adderInfo', `${firstName}, ${lastName}`));
  yield put(updateFormValueLazy('addingUserId', id));
  const form = yield select(selectFormFields());
  try {
    const result = yield call(postMedication, customerId, form);
    console.log(result);
  } catch(error) {
    console.error(error);
  }
}

// All sagas to be loaded
export default [
  defaultMedicationSaga,
];
