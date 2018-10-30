/**
 * Converts aws-sdk sign up exceptions to human readable strings
 *
 * @param {Exception} ex
 *
 * @return {object}
 */
export function getSignUpErrorMessage(ex) {
  const error = ex.toString();
  let errorMessage = 'Some error occured';

  if (/UsernameExistsException/.test(error)) {
    errorMessage = 'User with such email already exists';
  } else if (/InvalidParameterException/.test(error)) {
    errorMessage = 'Password must contain at least 8 characters';
  } else if (/InvalidPasswordException/.test(error)) {
    errorMessage = 'Password must contain at least 8 characters, one lowercase, uppercase, numeric and special character';
  }

  return {
    error: errorMessage,
  }
}

/**
 * Converts aws-sdk sign in exceptions to human readable strings
 *
 * @param {Exception} ex
 *
 * @return {object}
 */
export function getSignInErrorMessage(ex) {
  const error = ex.toString();
  let errorMessage = 'Some error occured';

  if (
    /InvalidParameterException/.test(error)
    || /UserNotFoundException/.test(error)
    || /NotAuthorizedException/.test(error)
  ) {
    errorMessage = 'Please enter valid email and password';
  }

  return {
    error: errorMessage,
  }
}

export default {
  getSignUpErrorMessage,
  getSignInErrorMessage,
};