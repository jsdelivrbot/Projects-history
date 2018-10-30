import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js';

import config from './config';
import userPool from './userPool';

/**
 * Handles cognito user sign up
 *
 * @param {string} email
 * @param {string} password
 * @param {function} callback
 */
export function signUp(email, password, callback) {
  const attributeList = [];
  const attributeEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });

  attributeList.push(attributeEmail);
  userPool.signUp(email, password, attributeList, null, callback);
}

/**
 * Handles cognito user sign in
 *
 * @param {string} email
 * @param {string} password
 * @param {function} callback
 */
export function signIn(email, password, callback) {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, callback);
}

/**
 * Handles cognito user sign out
 */
export function signOut() {
  const cognitoUser = userPool.getCurrentUser();
  cognitoUser.signOut();
  // @todo: clear cookies here
  localStorage.removeItem('awsCredentials');
  localStorage.removeItem('isLoggedIn');
}

export function loginCallbackFactory(callbacks, ctx) {
  return {
    onSuccess: (result) => {
      console.log('result:', result);

      const loginCred = 'cognito-idp.' + config.region + '.amazonaws.com/' + config.UserPoolId;

      let credJson = {};
      let Login = {};

      Login[loginCred] = result.getIdToken().getJwtToken();
      credJson['IdentityPoolId'] = config.IdentityPoolId;
      credJson['Logins'] = Login;

      AWS.config.region = config.region;
      AWS.config.credentials = new CognitoIdentityCredentials(credJson);

      AWS.config.credentials.get((error) => {
        if (error) {
          console.log(error);
          return;
        }

        const {
          accessKeyId,
          secretAccessKey,
          sessionToken,
        } = AWS.config.credentials;

        const awsCredentials = {
          accessKeyId,
          secretAccessKey,
          sessionToken,
        };

        // @todo: replace with cookies
        localStorage.setItem('awsCredentials', JSON.stringify(awsCredentials));
        localStorage.setItem('isLoggedIn', true);

        callbacks.onSuccess.call(ctx, {
          loginStatus: true,
        });
      });
    },

    onFailure: (error) => {
      const errorMessage = error.toString();
      console.log(errorMessage);
      callbacks.onFailure.call(ctx, displayError);
    },
  };
}

export default {
  signUp,
  signIn,
  signOut,
};