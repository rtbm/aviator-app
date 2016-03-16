function accountsRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('accounts', {
      url: '/signin',
      templateUrl: 'accounts/res/layout/accounts-view.html',
      controller: 'accountsController',
      controllerAs: 'accountsVM',
      data: {
        unprotected: true,
      },
    });
}

export { accountsRoutes };
