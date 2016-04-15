class articlesFormCreateController {
  constructor($state, $articlesService) {
    'ngInject';
    this.$state = $state;
    this.$articlesService = $articlesService;

    this.onInit();
  }

  onInit() {
    this.action = 'create';
  }

  createAction(Article) {
    this.$articlesService.create(Article).then(article => {
      this.$state.go('app.articlesDetail', { articleId: article._id });
    });
  }
}

export { articlesFormCreateController };
