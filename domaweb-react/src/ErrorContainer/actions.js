/*
 *
 * ErrorContainer actions
 *
 */

import {
  APP_MESSAGE_SHOW,
  APP_MESSAGE_NOTIFY,
  APP_MESSAGE_DISMISS
} from './constants';

export function appMessage(message, statuscode, notifytype, show, explanation) {
  return {
    type: APP_MESSAGE_SHOW,
    msg: message,
    notifytype: notifytype,
    code: statuscode,
    notifystatus: show,
    description: explanation,
  };
}

export function messageDismiss() {
  return {
    type: APP_MESSAGE_DISMISS,
  }
}
