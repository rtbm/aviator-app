function articlesRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.articlesList', {
      url: '/articles/list',
      data: {
        title: 'ARTICLES.COLLECTION',
      },
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
      data: {
        title: 'ARTICLES.CREATE',
        prev: 'app.articlesList',
      },
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
      data: {
        title: 'ARTICLES.EDIT',
      },
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
      data: {
        prev: 'app.articlesList',
      },
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
