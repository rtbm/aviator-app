class articlesFormCreateController {
  constructor($state, $articlesService, $articlesNotifyService) {
    'ngInject';
    this.$state = $state;
    this.$articlesService = $articlesService;
    this.$articlesNotifyService = $articlesNotifyService;

    this.onInit();
  }

  onInit() {
    this.action = 'create';
  }

  createAction(Article) {
    this.$articlesService.create(Article).then(article => {
      this.$articlesNotifyService.createNotify(Article);
      this.$state.go('app.articlesDetail', { articleId: article._id });
    });
  }
}

export { articlesFormCreateController };
