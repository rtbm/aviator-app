import './modules/core';
import './modules/app';
import './modules/accounts';
import './modules/planes';

const ngAppConfig = ($compileProvider, $translateProvider, Config) => {
  'ngInject';
  $compileProvider.debugInfoEnabled(false);
  $translateProvider.registerAvailableLanguageKeys(Config.languages.available);
  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage(Config.languages.fallback);
};

const ngAppRun = ($state) => {
  'ngInject';
  $state.go('app.planesList');
};

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
])
  .config(ngAppConfig)
  .run(ngAppRun);
