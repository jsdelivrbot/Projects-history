/* eslint-disable no-underscore-dangle, class-methods-use-this */
import cookies from 'js-cookie';
import config from 'config';

// class for working with JWT tokens
// http://jwt.io/
export default class ApiToken {
  constructor(tokenString) {
    this._setToken(tokenString);
  }

  // -----------PROPERTIES------------

  // just getter for property
  get token() {
    return this._token;
  }

  // setter for changing token in existing class instance
  set token(newToken) {
    this._setToken(newToken);
  }

  get isExpired() {
    // if token and payload is not set, expiration date will be 'Invalid Date'
    return new Date() > this.expirationDate;
  }

  get expirationDate() {
    return new Date(this._payload.exp * 1000);
  }

  // -----PRIVATE METHODS (of course they are public in fact, but let's put _ in the beginnig to mark it as private)------------

  _setToken(token) {
    this._token = token;
    this._payload = this._getTokenPayload(this._token);
  }

  _getTokenFromCookie() {
    return cookies.get(config.apiTokenCookieName);
  }

  _getTokenPayload(token) {
    // TODO: maybe replase atob with some package that works in all browsers
    return token ? JSON.parse(atob(token.split('.')[1])) : {};
  }

  // -------------PUBLIC METHODS----------------

  getUser() {
    if (!this._token) {
      return null;
    }

    return {
      name: this._payload.name,
      userId: this._payload.userId,
      countryId: this._payload.countryId,
      currencyId: this._payload.currencyId,
      companyId: this._payload.companyId,
      admin: this._payload.admin,
      token: this.token,
    };
  }

  getFromCookie() {
    const token = this._getTokenFromCookie();
    this._setToken(token);

    return this;
  }

  setCookie() {
    cookies.set(config.apiTokenCookieName, this._token, { expires: this.expirationDate });

    return this;
  }

  removeCookie() {
    cookies.remove(config.apiTokenCookieName);
  }
}
