import { articlesController } from './articles-controller';

class articlesFormEditController extends articlesController {
  constructor($q, $translate, $interval, $dialogService, $articlesService, $timersService,
              $geocodingService, $weatherService, $errorService, $notifyService, $state, config) {
    'ngInject';
    super($q, $translate, $interval, $dialogService, $articlesService, $timersService,
      $geocodingService, $weatherService, $errorService);

    this.$translate = $translate;
    this.$state = $state;
    this.$articlesService = $articlesService;
    this.$notifyService = $notifyService;
    this.$errorService = $errorService;
    this.config = config;

    this.onInit();
  }

  onInit() {
    this.action = 'update';

    this.$articlesService.get({ articleId: this.$state.params.articleId },
      Article => {
        this.Article = Article;
        this.Article.thumbnail = `${this.config.api}/thumbnails/${Article.image}`;
      },
      err => this.handleError(err)
    );
  }

  handleUpdateResponse(res) {
    this.$translate(['ARTICLES.UPDATED'], { name: res.name }).then(translations => {
      this.$notifyService.show({
        text: translations['ARTICLES.UPDATED'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { articlesFormEditController };
