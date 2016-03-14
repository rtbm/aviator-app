function AccountsService(Config, $q, $resource, store, jwtHelper, $translate, NotifyService) {
  'ngInject';
  const jwt = store.get('jwt');
  const user = !!jwt ? jwtHelper.decodeToken(jwt) : null;

  return {
    user,

    $resource: $resource(`${Config.api}/v1/accounts`, null, {
      signin: {
        url: `${Config.api}/v1/accounts/signin`,
        method: 'POST',
      },
      signup: {
        url: `${Config.api}/v1/accounts/signup`,
        method: 'POST',
      },
    }),

    signin: function(User) {
      return this.$resource.signin(User,
        (res) => this.handleResponse(res),
        (err) => this.handleError(err)
      ).$promise;
    },

    signup: function(User) {
      return this.$resource.signup(User,
        (res) => this.handleResponse(res),
        (err) => this.handleError(err)
      ).$promise;
    },

    signout: function() {
      const deferred = $q.defer();
      store.remove('jwt');
      deferred.resolve();
      return deferred.promise;
    },

    handleResponse: function(res) {
      store.set('jwt', res.id_token);
      this.user = jwtHelper.decodeToken(res.id_token);
    },

    handleError: function(err) {
      let message = 'ACCOUNTS.ERROR_DEFAULT';

      switch(err.status) {
        case 409:
        {
          message = 'ACCOUNTS.ERROR_409';
          break;
        }
        case 422:
        {
          message = 'ACCOUNTS.ERROR_422';
          break;
        }
      }

      $translate([message]).then(
        (translations) => NotifyService.show({
          text: translations[message],
        })
      );
    },
  };
};

export { AccountsService };
