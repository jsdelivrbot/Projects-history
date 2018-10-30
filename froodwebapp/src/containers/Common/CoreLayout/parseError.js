export default (message, status, logoutRequest) => {
  switch (status) {
    case 504:
      return 'Request Timeout';
    case 500:
      return 'Internal Server Error';
    case 401: {
      logoutRequest();
      return 'Unauthorized';
    }
    case 400:
      return message;
    default:
      return message;
  }
};
