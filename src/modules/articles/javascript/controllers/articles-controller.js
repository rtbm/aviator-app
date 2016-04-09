class articlesController {
  constructor($translate, $dialogService, $articlesService, $timersService, $errorService) {
    'ngInject';
    this.$translate = $translate;
    this.$dialogService = $dialogService;
    this.$articlesService = $articlesService;
    this.$timersService = $timersService;
    this.$errorService = $errorService;
  }

  createAction(Article) {
    this.$articlesService.save(Article).$promise.then(
      res => this.handleCreateResponse(res),
      err => this.$errorService.handleError(err)
    );
  }

  updateAction(Article) {
    this.$articlesService.update(Article).$promise.then(
      res => this.handleUpdateResponse(res),
      err => this.$errorService.handleError(err)
    );
  }

  removeAction(Article) {
    this.$translate(['ARTICLES.DIALOG_REMOVE', 'CORE.OK', 'CORE.CANCEL'], { name: Article.name })
      .then(translations => this.removeConfirmationDialog(translations).then(response => {
        if (response === 'OK') { this.remove(Article); }
      }));
  }

  removeConfirmationDialog(translations) {
    return this.$dialogService.show({
      text: translations['ARTICLES.DIALOG_REMOVE'],
      buttons: [{
        text: translations['CORE.OK'],
        response: 'OK',
      }, {
        text: translations['CORE.CANCEL'],
        response: 'CANCEL',
      }],
    });
  }

  remove(Article) {
    this.$articlesService.remove({ articleId: Article._id }).$promise.then(
      res => this.handleRemoveResponse(res),
      err => this.$errorService.handleError(err)
    );
  }

  startTimerAction(Article) {
    this.$timersService.save({ articleId: Article._id }, {}).$promise.then(
      timer => {
        if (!this.activeTimers) return;
        this.activeTimers.push(timer.articleId);
      },
      err => this.$errorService.handleError(err)
    );
  }

  stopTimerAction(Article) {
    this.$timersService.update({ articleId: Article._id }, {}).$promise.then(
      timer => {
        if (!this.activeTimers) return;
        const index = this.activeTimers.indexOf(timer.articleId);
        this.activeTimers.splice(index, 1);
      },
      err => this.$errorService.handleError(err)
    );
  }
}

export { articlesController };
