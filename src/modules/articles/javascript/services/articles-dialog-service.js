class articlesDialogService {
  constructor($q, $translate, $dialogService) {
    'ngInject';
    this.$q = $q;
    this.$translate = $translate;
    this.$dialogService = $dialogService;
  }

  _removeConfirm(translations) {
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

  removeConfirm(Article) {
    const deferred = this.$q.defer();

    this.$translate(['ARTICLES.DIALOG_REMOVE', 'CORE.OK', 'CORE.CANCEL'], { name: Article.name })
      .then(translations => this._removeConfirm(translations))
      .then(result => deferred.resolve(result)
    );

    return deferred.promise;
  }
}

export { articlesDialogService };
