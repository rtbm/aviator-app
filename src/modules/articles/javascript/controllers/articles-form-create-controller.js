class articlesFormCreateController {
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
    this.action = 'create';
  }

  createAction(Articles) {
    this.$articlesService.save(Articles,
      (res) => this.handleResponse(res),
      (err) => this.$errorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['ARTICLES.CREATED_NEW'], { name: res.name }).then((translations) => {
      this.$notifyService.show({
        text: translations['ARTICLES.CREATED_NEW'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { articlesFormCreateController };
