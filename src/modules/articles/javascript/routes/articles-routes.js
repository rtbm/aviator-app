function ArticlesRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.articlesList', {
      url: '/articles/list',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-list-view.html',
          controller: 'ArticlesListController',
          controllerAs: 'ArticlesListVM',
        },
      },
    })
    .state('app.articlesFormCreate', {
      url: '/articles/create',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-form-view.html',
          controller: 'ArticlesFormCreateController',
          controllerAs: 'ArticlesFormVM',
        },
      },
    })
    .state('app.articlesFormEdit', {
      url: '/articles/edit/:articleId',
      views: {
        main: {
          templateUrl: 'articles/res/layout/articles-form-view.html',
          controller: 'ArticlesFormEditController',
          controllerAs: 'ArticlesFormVM',
        },
      },
    })
  ;
}

export { ArticlesRoutes };
