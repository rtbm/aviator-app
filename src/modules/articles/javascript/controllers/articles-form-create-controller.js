class ArticlesFormCreateController {
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
    this.action = 'create';
  }

  createAction(Articles) {
    this.ArticlesService.save(Articles,
      (res) => this.handleResponse(res),
      (err) => this.ErrorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['ARTICLES.CREATED_NEW'], { name: res.name }).then((translations) => {
      this.NotifyService.show({
        text: translations['ARTICLES.CREATED_NEW'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { ArticlesFormCreateController };
