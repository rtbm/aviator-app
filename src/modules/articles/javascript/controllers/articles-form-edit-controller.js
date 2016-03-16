class ArticlesFormEditController {
  constructor(ArticlesService, $translate, $state, NotifyService, ErrorService) {
    'ngInject';
    this.$translate = $translate;
    this.$state = $state;
    this.NotifyService = NotifyService;
    this.ArticlesService = ArticlesService;
    this.ErrorService = ErrorService;

    this.onInit();
  }

  onInit() {
    this.action = 'update';

    this.ArticlesService.get({ articleId: this.$state.params.articleId },
      (Article) => { this.Article = Article },
      (err) => this.handleError(err)
    );
  }

  updateAction(Article) {
    this.ArticlesService.update(Article,
      (res) => this.handleResponse(res),
      (err) => this.ErrorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['ARTICLES.UPDATED'], { name: res.name }).then((translations) => {
      this.NotifyService.show({
        text: translations['ARTICLES.UPDATED'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { ArticlesFormEditController };
