import { accountsService } from './javascript/services/accounts-service';
import { accountsController } from './javascript/controllers/accounts-controller';
import { accountsRoutes } from './javascript/routes/accounts-routes';

const accountsConfig = (jwtInterceptorProvider, $httpProvider) => {
  'ngInject';
  jwtInterceptorProvider.tokenGetter = (store) => {
    'ngInject';
    return store.get('jwt');
  };
  $httpProvider.interceptors.push('jwtInterceptor');
};

const accountsRun = ($rootScope, $accountsService, $state) => {
  'ngInject';
  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if (!$accountsService.user && !(!!toState.data && !!toState.data.unprotected)) {
      e.preventDefault();
      $state.go('accounts');
    }
  });
};

export default angular.module('ngApp.accounts', [])
  .factory('$accountsService', accountsService)
  .controller('accountsController', accountsController)
  .config(accountsRoutes)
  .config(accountsConfig)
  .run(accountsRun);

