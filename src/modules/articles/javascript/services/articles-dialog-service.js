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

  _nfcWriteNotify(translations) {
    return this.$dialogService.show({
      text: translations['ARTICLES.TAP_THE_TAG'],
      buttons: [{
        text: translations['CORE.CANCEL'],
        response: 'CANCEL',
      }],
    });
  }

  nfcWriteNotify(Article) {
    const deferred = this.$q.defer();
    let notify;

    this.$translate(['ARTICLES.TAP_THE_TAG', 'CORE.CANCEL'], { name: Article.name })
      .then(translations => {
        notify = this._nfcWriteNotify(translations);
        return notify;
      })
      .then(result => deferred.resolve(result));

    deferred.promise.cancel = () => {
      notify.cancel();
    };

    return deferred.promise;
  }

  _nfcDisabledNotify(translations) {
    return this.$dialogService.show({
      text: translations['ARTICLES.NFC_IS_DISABLED'],
      buttons: [{
        text: translations['CORE.OK'],
        response: 'OK',
      }],
    });
  }

  nfcDisabledNotify() {
    const deferred = this.$q.defer();

    this.$translate(['ARTICLES.NFC_IS_DISABLED', 'CORE.OK'])
      .then(translations => this._nfcWriteNotify(translations));

    return deferred.promise;
  }
}

export { articlesDialogService };
