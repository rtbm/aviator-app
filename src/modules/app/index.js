import { appRoutes } from './javascript/routes/app-routes';

export default angular.module('ngApp.app', [])
  .config(appRoutes)
  .config($httpProvider => {
    'ngInject';
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Thu, 1 Jan 1970 00:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
  });
