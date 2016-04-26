class articlesNotifyService {
  constructor($translate, $notifyService) {
    'ngInject';
    this.$translate = $translate;
    this.$notifyService = $notifyService;
  }

  _removeNotify(translations) {
    this.$notifyService.show({ text: translations['ARTICLES.DELETED'] });
  }

  removeNotify(Article) {
    this.$translate(['ARTICLES.DELETED'], { name: Article.name }).then(
      translations => this._removeNotify(translations)
    );
  }

  _updateNotify(translations) {
    this.$notifyService.show({ text: translations['ARTICLES.UPDATED'] });
  }

  updateNotify(Article) {
    this.$translate(['ARTICLES.UPDATED'], { name: Article.name }).then(
      translations => this._updateNotify(translations)
    );
  }

  _createNotify(translations) {
    this.$notifyService.show({ text: translations['ARTICLES.CREATED_NEW'] });
  }

  createNotify(Article) {
    this.$translate(['ARTICLES.CREATED_NEW'], { name: Article.name }).then(
      translations => this._createNotify(translations)
    );
  }

  _tagNotify(translations) {
    this.$notifyService.show({ text: translations['ARTICLES.TAG_HAS_BEEN_WRITTEN'] });
  }

  tagNotify(Article) {
    this.$translate(['ARTICLES.TAG_HAS_BEEN_WRITTEN'], { name: Article.name }).then(
      translations => this._tagNotify(translations)
    );
  }

}

export { articlesNotifyService };
