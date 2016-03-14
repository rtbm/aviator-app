import './modules/core';
import './modules/app';
import './modules/accounts';
import './modules/planes';

angular.module('ngApp', [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'pascalprecht.translate',
  'angular-jwt',
  'angular-storage',
  'ngApp.config',
  'ngApp.strings',
  'ngApp.layouts',
  'ngApp.core',
  'ngApp.app',
  'ngApp.accounts',
  'ngApp.planes',
]).config(($compileProvider, Config, $translateProvider, $httpProvider, jwtInterceptorProvider) => {
  'ngInject';
  $compileProvider.debugInfoEnabled(false);
  $translateProvider.registerAvailableLanguageKeys(Config.languages.available);
  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage(Config.languages.fallback);

  jwtInterceptorProvider.tokenGetter = (store) => {
    'ngInject';
    return store.get('jwt');
  };

  $httpProvider.interceptors.push('jwtInterceptor');
}).run(($state, $rootScope, store) => {
  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if (!store.get('jwt') && !(!!toState.data && !!toState.data.unprotected)) {
      e.preventDefault();
      $state.go('accounts');
    }
  });

  $state.go('app.planesList');
});
