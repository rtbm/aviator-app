function appRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/res/layout/app-view.html',
    });
}

export { appRoutes };
