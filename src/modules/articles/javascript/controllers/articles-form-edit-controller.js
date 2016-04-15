class articlesFormEditController {
  constructor(config, $state, $articlesService, $articlesNotifyService) {
    'ngInject';
    this.config = config;
    this.$state = $state;
    this.$articlesService = $articlesService;
    this.$articlesNotifyService = $articlesNotifyService;

    this.onInit();
  }

  onInit() {
    const articleId = this.$state.params.articleId;

    this.action = 'update';

    this.$articlesService.findOneById(articleId).then(article => {
      this.Article = article;
      this.Article.thumbnail = `${this.config.api}/thumbnails/${this.Article.image}`;
    });
  }

  updateAction(Article) {
    this.$articlesService.update(Article).then(article => {
      this.$articlesNotifyService.updateNotify(Article);
      this.$state.go('app.articlesDetail', { articleId: article._id });
    });
  }
}

export { articlesFormEditController };
