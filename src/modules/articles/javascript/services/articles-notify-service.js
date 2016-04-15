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
    this.$translate(['ARTICLES.DELETED'], { name: Article.name }).then(translations => {
      this._removeNotify(translations);
    });
  }
}

export { articlesNotifyService };
