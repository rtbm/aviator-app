class articlesFormEditController {
  constructor($translate, $state, $articlesService, $notifyService, $errorService) {
    'ngInject';
    this.$translate = $translate;
    this.$state = $state;
    this.$articlesService = $articlesService;
    this.$notifyService = $notifyService;
    this.$errorService = $errorService;

    this.onInit();
  }

  onInit() {
    this.action = 'update';

    this.$articlesService.get({ articleId: this.$state.params.articleId },
      (Article) => { this.Article = Article; },
      (err) => this.handleError(err)
    );
  }

  updateAction(Article) {
    this.$articlesService.update(Article,
      (res) => this.handleResponse(res),
      (err) => this.$errorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['ARTICLES.UPDATED'], { name: res.name }).then((translations) => {
      this.$notifyService.show({
        text: translations['ARTICLES.UPDATED'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { articlesFormEditController };
