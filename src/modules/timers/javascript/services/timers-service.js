class timersService {
  constructor($timersRestService, $errorService, $interval) {
    'ngInject';
    this.$timersRestService = $timersRestService;
    this.$errorService = $errorService;
    this.$interval = $interval;

    this.currDate = new Date();
    this.interval = this.$interval(() => this.refreshCurrDate(), 1000);
  }

  findAll(query) {
    const req = this.$timersRestService.query(query).$promise;
    return req;
  }

  refreshCurrDate() {
    this.currDate = new Date();
  }

  startTimerAction(Article) {
    const article = Article;
    const req = this.$timersRestService.save({ articleId: Article._id }, {}).$promise;

    req.then(
      timer => {
        this.refreshCurrDate();
        article.timer = timer;
        article.timer.createdAt = new Date(article.timer.createdAt);
      },
      err => this.$errorService.handleError(err)
    );

    return req;
  }

  stopTimerAction(Article) {
    const article = Article;
    const req = this.$timersRestService.update({ _id: Article.timer._id }).$promise;

    req.then(
      () => { article.timer = null; },
      err => this.$errorService.handleError(err)
    );

    return req;
  }
}

export { timersService };
