class articlesController {
  constructor($translate, $dialogService, $articlesService, $errorService) {
    'ngInject';
    this.$translate = $translate;
    this.$dialogService = $dialogService;
    this.$articlesService = $articlesService;
    this.$errorService = $errorService;
  }

  createAction(Articles) {
    this.$articlesService.save(Articles,
      (res) => this.handleCreateResponse(res),
      (err) => this.$errorService.handleError(err)
    );
  }

  updateAction(Article) {
    this.$articlesService.update(Article,
      (res) => this.handleUpdateResponse(res),
      (err) => this.$errorService.handleError(err)
    );
  }

  removeAction(Article) {
    this.$translate(['ARTICLES.DIALOG_REMOVE', 'CORE.OK', 'CORE.CANCEL'], {
      name: Article.name,
    }).then(
      (translations) => this.removeConfirmationDialog(translations).then(
        (response) => {
          if (response === 'OK') { this.remove(Article); }
        }
      )
    );
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
    this.$articlesService.remove({ articleId: Article._id },
      (res) => this.handleRemoveResponse(res),
      (err) => this.$errorService.handleError(err)
    );
  }
}

export { articlesController };
