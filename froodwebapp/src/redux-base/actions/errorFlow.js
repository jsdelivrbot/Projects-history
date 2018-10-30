// ------------------------Action constants---------------
export const ERROR = 'ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const REMOVE_WARNING_NOTIFICATION = 'REMOVE_WARNING_NOTIFICATION';
export const ADD_WARNING_NOTIFICATIONS = 'ADD_WARNING_NOTIFICATIONS';

// ------------------------Action creators---------------
export const showErrorMessage = data => ({
  type: ERROR,
  data
});

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR
});

export const removeWarningNotification = id => ({
  type: REMOVE_WARNING_NOTIFICATION,
  id
});

export const addWarningNotifications = notifications => ({
  type: ADD_WARNING_NOTIFICATIONS,
  notifications
});
