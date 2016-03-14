import { AccountsService } from './javascript/services/accounts-service';
import { AccountsController } from './javascript/controllers/accounts-controller';
import { AccountsRoutes } from './javascript/routes/accounts-routes';

const AccountsConfig = (jwtInterceptorProvider, $httpProvider) => {
  'ngInject';
  jwtInterceptorProvider.tokenGetter = (store) => {
    'ngInject';
    return store.get('jwt');
  };
  $httpProvider.interceptors.push('jwtInterceptor');
};

const AccountsRun = ($rootScope, AccountsService, $state) => {
  'ngInject';
  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if (!AccountsService.user && !(!!toState.data && !!toState.data.unprotected)) {
      e.preventDefault();
      $state.go('accounts');
    }
  });
};

export default angular.module('ngApp.accounts', [])
  .factory('AccountsService', AccountsService)
  .controller('AccountsController', AccountsController)
  .config(AccountsRoutes)
  .config(AccountsConfig)
  .run(AccountsRun);

