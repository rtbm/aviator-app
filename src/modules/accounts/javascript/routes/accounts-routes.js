function AccountsRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('accounts', {
      url: '/signin',
      templateUrl: 'accounts/res/layout/accounts-view.html',
      controller: 'AccountsController',
      controllerAs: 'AccountsVM',
      data: {
        unprotected: true,
      },
    });
}

export { AccountsRoutes };
