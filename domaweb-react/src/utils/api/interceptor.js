
import intercept from 'superagent-intercept';
//import { store } from '../../main';
//import { httpError, errorNotify } from '../../ErrorContainer/actions';
import { STATUS_CODES } from 'http';

const extractMessage = (response) => {
  let message = 'UNKNOWN ERROR';
  if (response && response.body && response.body.messages) {
    message = response.body.messages[0].message;
  }
  console.log(message);
  return message;
}


const interceptor = intercept((err, res) => {
  if (err && !res) {
    console.log('SOMETHING WENT WRONG');
    const message = extractMessage(res);
    //console.log(window.notificationActions);
    window.notificationActions.appMessage(message, '404', 'error', true, 'error during preflight');
  }
  else if (res && res.status === 200) {
    console.log('REQUEST WAS FINE');
  } else if (res && res.status >= 400) {
    console.log('SOMETHING WENT WRONG');
    const message = extractMessage(res);
    window.notificationActions.appMessage(message, res.status, 'error', true, STATUS_CODES[res.status]);
  }
});

export default interceptor;
