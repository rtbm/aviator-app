import { articlesController } from './articles-controller';

class articlesListController extends articlesController {
  constructor($q, $translate, $interval, $dialogService, $articlesService, $timersService,
              $geocodingService, $weatherService, $errorService, $notifyService, config) {
    'ngInject';
    super($q, $translate, $interval, $dialogService, $articlesService, $timersService,
      $geocodingService, $weatherService, $errorService);

    this.$translate = $translate;
    this.$dialogService = $dialogService;
    this.$articlesService = $articlesService;
    this.$errorService = $errorService;
    this.$notifyService = $notifyService;
    this.config = config;

    this.onInit();
  }

  onInit() {
    this.$articlesService.query().$promise.then(
      result => {
        const articles = result;

        for (let n = articles.length - 1; n !== -1; n--) {
          const article = articles[n];

          if (article.timer) {
            article.timer.createdAt = new Date(article.timer.createdAt);
          }
        }

        this.articles = articles;
      },
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
        this.articles.splice(i, 1);
        break;
      }
    }
  }
}

export { articlesListController };
