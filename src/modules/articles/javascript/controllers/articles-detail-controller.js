import { articlesController } from './articles-controller';

class articlesDetailController extends articlesController {
  constructor($translate, $dialogService, $articlesService, $state, $notifyService, $errorService,
    config) {
    'ngInject';
    super($translate, $dialogService, $articlesService, $errorService);

    this.$translate = $translate;
    this.$articlesService = $articlesService;
    this.$state = $state;
    this.$notifyService = $notifyService;
    this.$errorService = $errorService;
    this.config = config;

    this.onInit();
  }

  onInit() {
    this.$articlesService.get({ articleId: this.$state.params.articleId },
      (Article) => { this.Article = Article; },
      (err) => this.$errorService.handleError(err)
    );
  }

  handleRemoveResponse(res) {
    this.$translate(['ARTICLES.DELETED'], { name: res.name }).then((translations) => {
      this.$notifyService.show({
        text: translations['ARTICLES.DELETED'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { articlesDetailController };
