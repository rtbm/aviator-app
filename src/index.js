import './modules/core';
import './modules/accounts';

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
  'ngApp.accounts',
]).config(($compileProvider, Config, $translateProvider, $httpProvider, jwtInterceptorProvider) => {
  'ngInject';
  $compileProvider.debugInfoEnabled(false);
  $translateProvider.registerAvailableLanguageKeys(Config.languages.available);
  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage(Config.languages.fallback);

  /*jwtInterceptorProvider.tokenGetter = (store) => {
    'ngInject';
    return store.get('jwt');
  };

  $httpProvider.interceptors.push('jwtInterceptor');*/
}).run(($state) => {
  $state.go('accounts');
});
