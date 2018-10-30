import ApiToken from 'utils/apiHelpers/ApiToken';

const { describe, it, expect } = global;

describe('apiToken', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW5jeUlkIjo0NywiZXhwIjoiMTUzODEyMTE0NiIsImNvdW50cnlJZCI6N'
      + 'DcsImNvbXBhbnlJZCI6NywibmFtZSI6ImZsYXJldmljdG9yQGdtYWlsLmNvbSIsImNvbXBhbnlOYW1lIjoiVGhlIE1lYXQgQ2x1YiIsImlhdCI'
      + '6IjE1MDY1ODUxNDYiLCJhZG1pbiI6dHJ1ZSwidXNlcklkIjoxOTl9.tH6uBT-jE4VVTsPhpFwFfKViaM31YDRJ1';

  it('gets token', () => {
    const apiToken = new ApiToken(token);
    expect(apiToken.token).toEqual(token);
  });

  it('sets token', () => {
    const apiToken = new ApiToken(token);
    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW5jeUlkIjo0NywiZXhwIjoiMTUzODEyMTE0NiIsImNvdW50cnlJ'
        + 'ZCI6NDcsImNvbXBhbnlJZCI6NywibmFtZSI6ImZsYXJldmljdG9yQGdtYWlsLmNvbSIsImNvbXBhbnlOYW1lIjoiVGhlIE1lYXQgQ2x1YiIs'
        + 'ImlhdCI6IjE1MDY1ODUxNDYiLCJhZG1pbiI6dHJ1ZSwidXNlcklkIjoxOTl9.tH6uBT-jFwFfKViaM31YDRJ18v6_jy0-yI';
    const getData = {
      _payload: {
        admin: true,
        companyId: 7,
        countryId: 47,
        currencyId: 47,
        companyName: 'The Meat Club',
        exp: '1538121146',
        iat: '1506585146',
        name: 'flarevictor@gmail.com',
        userId: 199
      },
      _token: newToken
    };

    apiToken.token = newToken;

    expect(apiToken).toEqual(getData);
  });

  it('sets correct cookie in token', () => {
    const apiToken = new ApiToken(token);

    apiToken.setCookie();

    const check = apiToken.getFromCookie();

    expect(check.token).toEqual(apiToken.token);
  });

  it('getUser without token', () => {
    const apiToken = new ApiToken();

    expect(apiToken.getUser()).toBeNull();
  });

  it('getUser with token', () => {
    const apiToken = new ApiToken(token);
    const getData = {
      admin: true,
      companyId: 7,
      countryId: 47,
      currencyId: 47,
      name: 'flarevictor@gmail.com',
      token,
      userId: 199
    };

    expect(apiToken.getUser()).toEqual(getData);
  });

  it('checks expirationDate returns something (Date), when token exists', () => {
    const apiToken = new ApiToken(token);

    expect(apiToken.expirationDate).toBeTruthy();
  });

  it('checks that token is not expired', () => {
    const apiToken = new ApiToken(token);

    expect(apiToken.isExpired).toBeFalsy();
  });

  it('checks _getTokenPayload with token', () => {
    const apiToken = new ApiToken(token);
    const userData = {
      admin: true,
      companyId: 7,
      companyName: 'The Meat Club',
      countryId: 47,
      currencyId: 47,
      exp: '1538121146',
      iat: '1506585146',
      name: 'flarevictor@gmail.com',
      userId: 199
    };
    // eslint-disable-next-line
    expect(apiToken._getTokenPayload(token)).toEqual(userData);
  });

  it('checks _getTokenPayload without token', () => {
    const apiToken = new ApiToken(token);
    // eslint-disable-next-line
    expect(apiToken._getTokenPayload()).toEqual({});
  });

  it('checks deleting token from cookie', () => {
    const apiToken = new ApiToken(token);

    apiToken.removeCookie();
    // eslint-disable-next-line
    expect(apiToken._getTokenFromCookie()).toBeUndefined();
  });

  it('checks setting token in cookie', () => {
    const apiToken = new ApiToken(token);

    apiToken.removeCookie();
    apiToken.setCookie();
    // eslint-disable-next-line
    expect(apiToken._getTokenFromCookie()).toEqual(token);
  });
});
