import { call, select } from 'redux-saga/effects';
import ApiClient from 'utils/apiHelpers/ApiClient';

export default function* apiRequest(promise) {
  const apiClient = new ApiClient();

  const user = yield select(state => state.login.user);
  // inject token from state instead of reading each time from cookies
  apiClient.getTokenFromState(user);

  try {
    const response = yield call(promise, apiClient);

    if (response.data.errorMsg) {
      return {
        response: null,
        error: {
          status: response.status,
          message: response.data.errorMsg
        }
      };
    }
    return { response };

  } catch (error) {
    return {
      error: {
        status: error.status,
        message: error.message
      }
    };
  }
}
