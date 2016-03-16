class ArticlesListController {
  constructor(ArticlesService, $translate, NotifyService, ErrorService) {
    'ngInject';
    this.ArticlesService = ArticlesService;
    this.$translate = $translate;
    this.NotifyService = NotifyService;
    this.ErrorService = ErrorService;

    this.onInit();
  }

  onInit() {
    this.ArticlesService.query(
      (articles) => { this.articles = articles },
      (err) => this.ErrorService.handleError(err)
    );
  }

  removeAction(Article) {
    this.ArticlesService.remove({ articleId: Article._id },
      (res) => this.handleResponse(res),
      (err) => this.ErrorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['ARTICLES.DELETED'], { name: res.name }).then((translations) => {
      this.NotifyService.show({
        text: translations['ARTICLES.DELETED'],
      });
    });

    for(let i = this.articles.length - 1; i !== -1; i--) {
      if (this.articles[i]._id === res._id) {
        this.articles.splice(i, 1);
        break;
      }
    }
  }
}

export { ArticlesListController };
