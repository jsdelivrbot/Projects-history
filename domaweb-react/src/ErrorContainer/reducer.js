/*
 *
 * ErrorContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  APP_MESSAGE_SHOW,
  APP_MESSAGE_DISMISS,
  APP_MESSAGE_NOTIFY,
} from './constants';

const initialState = fromJS({
  message: {},
  notifytype: '',
  statuscode: '',
  show: false,
  explanation: '',
  timer: 4000
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case APP_MESSAGE_SHOW:
      return state
        .set('message', fromJS(action.msg))
        .set('statuscode', fromJS(action.code))
        .set('notifytype', fromJS(action.notifytype))
        .set('show', fromJS(action.notifystatus))
        .set('explanation', fromJS(action.description))
        .set('timer');
    case APP_MESSAGE_DISMISS:
      return state.set('show', false);

    default:
      return state;
  }
}

export default notificationReducer;
