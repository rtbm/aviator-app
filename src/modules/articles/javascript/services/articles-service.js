class articlesService {
  constructor(config, $q, $articlesRestService, $errorService) {
    'ngInject';
    this.config = config;
    this.$q = $q;
    this.$articlesRestService = $articlesRestService;
    this.$errorService = $errorService;
  }

  processArticle(Article) {
    const article = Article;

    article.thumbnail = `${this.config.api}/thumbnails/${article.image}`;

    if (article.timer) {
      article.timer.createdAt = new Date(article.timer.createdAt);
    }

    return article;
  }

  findAll() {
    const deferred = this.$q.defer();
    const req = this.$articlesRestService.query().$promise;

    req.then(
      articles => {
        for (let n = articles.length - 1; n !== -1; n--) {
          let article = articles[n];
          article = this.processArticle(article);
        }

        deferred.resolve(articles);
      },
      err => this.$errorService.handleError(err)
    );

    return deferred.promise;
  }

  create(Article) {
    const req = this.$articlesRestService.save(Article).$promise;

    req.then(
      res => {},
      err => this.$errorService.handleError(err)
    );

    return req;
  }

  findOneById(articleId) {
    const deferred = this.$q.defer();
    const req = this.$articlesRestService.get({ articleId }).$promise;

    req.then(
      res => {
        const article = this.processArticle(res);
        deferred.resolve(article);
      },
      err => this.$errorService.handleError(err)
    );

    return deferred.promise;
  }

  update(Article) {
    const req = this.$articlesRestService.update(Article).$promise;

    req.then(
      res => {},
      err => this.$errorService.handleError(err)
    );

    return req;
  }

  remove(Article) {
    const req = this.$articlesRestService.remove({ articleId: Article._id }).$promise;

    req.then(
      res => {},
      err => this.$errorService.handleError(err)
    );

    return req;
  }
}

export { articlesService };
