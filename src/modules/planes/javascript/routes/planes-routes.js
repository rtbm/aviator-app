function PlanesRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.planesList', {
      url: '/planes/list',
      views: {
        main: {
          templateUrl: 'planes/res/layout/planes-list-view.html',
          controller: 'PlanesListController',
          controllerAs: 'PlanesListVM',
        },
      },
    })
    .state('app.planesFormCreate', {
      url: '/planes/create',
      views: {
        main: {
          templateUrl: 'planes/res/layout/planes-form-view.html',
          controller: 'PlanesFormCreateController',
          controllerAs: 'PlanesFormVM',
        },
      },
    })
    .state('app.planesFormEdit', {
      url: '/planes/edit/:planeId',
      views: {
        main: {
          templateUrl: 'planes/res/layout/planes-form-view.html',
          controller: 'PlanesFormEditController',
          controllerAs: 'PlanesFormVM',
        },
      },
    })
  ;
}

export { PlanesRoutes };
