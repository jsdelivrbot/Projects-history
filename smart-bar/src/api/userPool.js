import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from './config';

const userPool = new CognitoUserPool({
  UserPoolId: config.UserPoolId,
  ClientId: config.ClientId,
});

export default userPool;
