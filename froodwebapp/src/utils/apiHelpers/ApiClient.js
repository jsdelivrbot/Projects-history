import axios from 'axios';
import ApiToken from 'utils/apiHelpers/ApiToken';
import config from 'config';

class ApiClient {
  constructor() {
    ['get', 'post', 'put', 'patch', 'delete']
      .forEach((method) => {
        this[method] = (endpoint, ...rest) => {
          // send api token in headers with every request to API
          // token will be taken from app state
          const apiToken = new ApiToken(this.token);

          // check we are not making request to login
          const whiteListEndpoints
            = ['login'].map(whiteListEndpoint => `${config.api.url}/${whiteListEndpoint}`);

          if (!whiteListEndpoints.find(end => end.includes(endpoint)) && apiToken.isExpired) {
            return Promise.reject(new Error({
              status: 401,
              message: 'Token is expired'
            }));
          }

          const instance = axios.create({
            timeout: config.apiTimeout,
            headers: { 'X-Token': apiToken.token },
            validateStatus: status => status >= 200 && status <= 400,
          });

          return instance[method](`${config.api.url}/${endpoint}`, ...rest);
        };
      });
  }

  getTokenFromState(user) {
    this.token = user ? user.token : null;
    return this;
  }
}

export default ApiClient;
