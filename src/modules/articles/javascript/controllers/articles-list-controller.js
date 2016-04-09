import { articlesController } from './articles-controller';

class articlesListController extends articlesController {
  constructor($translate, $q, $dialogService, $articlesService, $timersService, $notifyService,
              $errorService, config) {
    'ngInject';
    super($translate, $dialogService, $articlesService, $timersService, $errorService);

    this.$translate = $translate;
    this.$articlesService = $articlesService;
    this.$notifyService = $notifyService;
    this.$dialogService = $dialogService;
    this.$errorService = $errorService;
    this.config = config;

    this.onInit();
  }

  onInit() {
    this.$articlesService.query(
      articles => { this.articles = articles; },
      err => this.$errorService.handleError(err)
    );

    this.$timersService.query(
      activeTimers => { this.activeTimers = activeTimers; },
      err => this.$errorService.handleError(err)
    );
  }

  handleRemoveResponse(res) {
    this.$translate(['ARTICLES.DELETED'], { name: res.name }).then(translations => {
      this.$notifyService.show({
        text: translations['ARTICLES.DELETED'],
      });
    });

    for (let i = this.articles.length - 1; i !== -1; i--) {
      if (this.articles[i]._id === res._id) {
        this.articles = this.articles.splice(i, 1);
        break;
      }
    }
  }
}

export { articlesListController };
