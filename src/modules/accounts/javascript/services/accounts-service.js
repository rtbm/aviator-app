function accountsService(config, $translate, $q, $resource, store, jwtHelper, $notifyService) {
  'ngInject';
  const jwt = store.get('jwt');
  const user = !!jwt ? jwtHelper.decodeToken(jwt) : null;

  return {
    user,

    $resource: $resource(`${config.api}/v1/accounts`, null, {
      signin: {
        url: `${config.api}/v1/accounts/signin`,
        method: 'POST',
      },
      signup: {
        url: `${config.api}/v1/accounts/signup`,
        method: 'POST',
      },
    }),

    signin: function signin(User) {
      return this.$resource.signin(User,
        (res) => this.handleResponse(res),
        (err) => this.handleError(err)
      ).$promise;
    },

    signup: function signup(User) {
      return this.$resource.signup(User,
        (res) => this.handleResponse(res),
        (err) => this.handleError(err)
      ).$promise;
    },

    signout: function signout() {
      const deferred = $q.defer();
      store.remove('jwt');
      deferred.resolve();
      return deferred.promise;
    },

    handleResponse: function handleResponse(res) {
      store.set('jwt', res.id_token);
      this.user = jwtHelper.decodeToken(res.id_token);
    },

    handleError: function handleError(err) {
      let message;

      switch (err.status) {
        case 409: {
          message = 'ACCOUNTS.ERROR_409';
          break;
        }
        case 422: {
          message = 'ACCOUNTS.ERROR_422';
          break;
        }
        default: {
          message = 'ACCOUNTS.ERROR_DEFAULT';
        }
      }

      $translate([message]).then(
        (translations) => $notifyService.show({
          text: translations[message],
        })
      );
    },
  };
};

export { accountsService };
