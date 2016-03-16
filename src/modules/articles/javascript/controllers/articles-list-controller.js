class articlesListController {
  constructor($translate, $articlesService, $notifyService, $errorService) {
    'ngInject';
    this.$translate = $translate;
    this.$articlesService = $articlesService;
    this.$notifyService = $notifyService;
    this.$errorService = $errorService;

    this.onInit();
  }

  onInit() {
    this.$articlesService.query(
      (articles) => { this.articles = articles; },
      (err) => this.$errorService.handleError(err)
    );
  }

  removeAction(Article) {
    this.$articlesService.remove({ articleId: Article._id },
      (res) => this.handleResponse(res),
      (err) => this.$errorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['ARTICLES.DELETED'], { name: res.name }).then((translations) => {
      this.$notifyService.show({
        text: translations['ARTICLES.DELETED'],
      });
    });

    for (let i = this.articles.length - 1; i !== -1; i--) {
      if (this.articles[i]._id === res._id) {
        this.articles.splice(i, 1);
        break;
      }
    }
  }
}

export { articlesListController };
