import { appRoutes } from './javascript/routes/app-routes';

const appConfig = ($translateProvider, $httpProvider, config) => {
  'ngInject';
  $translateProvider
    .useSanitizeValueStrategy('sanitize')
    .registerAvailableLanguageKeys(config.languages.available)
    .fallbackLanguage(config.languages.fallback)
    .determinePreferredLanguage();

  const httpProvider = $httpProvider;

  httpProvider.defaults = angular.extend({}, $httpProvider.defaults, {
    defaults: {
      headers: {
        get: {
          'If-Modified-Since': 'Thu, 1 Jan 1970 00:00:00 GMT',
          'Cache-Control': 'no-cache',
        },
      },
    },
  });
};

const appRun = ($rootScope, $translate, $globalsService) => {
  'ngInject';
  const globalsService = $globalsService;

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    if (toState.data && toState.data.prev) {
      globalsService.prevState = { state: { name: toState.data.prev } };
    } else if (!fromState.abstract) {
      globalsService.prevState = { state: fromState, params: fromParams };
    } else {
      globalsService.prevState = false;
    }

    const titleKey = toState.data && toState.data.title;

    if (titleKey) {
      $translate(titleKey).then(title => {
        globalsService.topbar = angular.extend({}, globalsService.topbar, { title });
      });
    } else {
      globalsService.topbar = angular.extend({}, globalsService.topbar, { title: '' });
    }
  });
};

export default angular.module('ngApp.app', [])
  .config(appRoutes)
  .config(appConfig)
  .run(appRun);
