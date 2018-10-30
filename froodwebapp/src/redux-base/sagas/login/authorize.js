/* eslint-disable no-constant-condition */
import { take, put, call } from 'redux-saga/effects';
import ApiToken from 'utils/apiHelpers/ApiToken';
import apiRequest from 'redux-base/common/apiRequest';
import {
  LOGIN,
  loginSuccess,
  showErrorMessage
} from 'redux-base/actions';

export default function* authorize() {
  // put all saga body in try-catch to handle CancelationException
  while (true) {
    try {
      // make api request and get token
      const { email, password } = yield take(LOGIN.REQUEST);

      const loginUrl = 'login';

      const { response, error } =
        yield call(apiRequest, apiClient => apiClient.post(loginUrl, { userName: email, password }));

      if (response) {

        const { data: { 'X-TOKEN': xToken } } = response;

        const apiToken = new ApiToken(xToken);
        const user = apiToken.getUser();

        // dispatch LOGIN_SUCCESS action
        yield put(loginSuccess(user));

        yield call(::apiToken.setCookie);

      } else {
        yield put(showErrorMessage(error));
      }

    } catch (error) {
      yield put(showErrorMessage(error));
    }
  }
}
