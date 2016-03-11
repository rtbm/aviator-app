function AccountsService(Config, $resource) {
  'ngInject';
  return $resource(`${Config.api}/v1/accounts`, null, {
    signin: {
      url: `${Config.api}/v1/accounts/signin`,
      method: 'POST'
    },
    signup: {
      url: `${Config.api}/v1/accounts/signup`,
      method: 'POST'
    }
  });
}

export { AccountsService };
