function articlesRestService(config, $resource) {
  'ngInject';
  return $resource(`${config.api}/v1/articles/:articleId`, {
    articleId: '@_id',
  }, {
    update: {
      method: 'PUT',
    },
  });
}

export { articlesRestService };
