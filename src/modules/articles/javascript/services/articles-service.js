function ArticlesService(Config, $resource) {
  'ngInject';
  return $resource(`${Config.api}/v1/articles/:articleId`, {
    articleId: '@_id',
  }, {
    update: {
      method: 'PUT',
    },
  });
}

export { ArticlesService };
