function articlesRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.articlesList', {
      url: '/articles/list',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-list-view.html',
          controller: 'articlesListController',
          controllerAs: 'articlesListVM',
        },
      },
    })

    .state('app.articlesFormCreate', {
      url: '/articles/create',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-form-view.html',
          controller: 'articlesFormCreateController',
          controllerAs: 'articlesFormVM',
        },
      },
    })

    .state('app.articlesFormEdit', {
      url: '/articles/edit/:articleId',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-form-view.html',
          controller: 'articlesFormEditController',
          controllerAs: 'articlesFormVM',
        },
      },
    })

    .state('app.articlesDetail', {
      url: '/articles/:articleId',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-detail-view.html',
          controller: 'articlesDetailController',
          controllerAs: 'articlesDetailVM',
        },
      },
    });
}

export { articlesRoutes };
