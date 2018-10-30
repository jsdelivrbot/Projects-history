import ApiClient from 'utils/apiHelpers/ApiClient';

const { describe, it, expect } = global;

describe('apiClient', () => {
  it('gets token', () => {
    const apiClient = new ApiClient();
    const user = {
      name: 'Flarevictor',
      token: 'some token'
    };

    expect(apiClient.getTokenFromState(user).token).toEqual(user.token);
  });
});
