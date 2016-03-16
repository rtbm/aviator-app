import './modules/core';
import './modules/app';
import './modules/accounts';
import './modules/articles';

const ngAppConfig = ($compileProvider, $translateProvider, config) => {
  'ngInject';
  $compileProvider.debugInfoEnabled(false);
  $translateProvider.registerAvailableLanguageKeys(config.languages.available);
  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage(config.languages.fallback);
};

const ngAppRun = ($state) => {
  'ngInject';
  $state.go('app.articlesList');
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
  'ngApp.articles',

]).config(ngAppConfig)
  .run(ngAppRun);
