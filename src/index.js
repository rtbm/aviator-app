import './modules/core';
import './modules/app';
import './modules/menu';
import './modules/accounts';
import './modules/articles';
import './modules/topbar';
import './modules/timers';

const ngAppConfig = ($compileProvider, $translateProvider, config) => {
  'ngInject';
  $compileProvider.debugInfoEnabled(false);
  $translateProvider.registerAvailableLanguageKeys(config.languages.available);
  $translateProvider.determinePreferredLanguage();
  $translateProvider.fallbackLanguage(config.languages.fallback);
  $translateProvider.useSanitizeValueStrategy('sanitize');
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
  'ngApp.menu',
  'ngApp.accounts',
  'ngApp.articles',
  'ngApp.topbar',
  'ngApp.timers',
]).config(ngAppConfig)
  .run(ngAppRun);
