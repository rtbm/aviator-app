import { articlesController } from './articles-controller';

class articlesDetailController extends articlesController {
  constructor($translate, $interval, $dialogService, $articlesService, $timersService,
              $geocodingService, $errorService, $state, $globalsService, $notifyService, config) {
    'ngInject';
    super($translate, $interval, $dialogService, $articlesService, $timersService,
      $geocodingService, $errorService);

    this.$translate = $translate;
    this.$articlesService = $articlesService;
    this.$state = $state;
    this.$globalsService = $globalsService;
    this.$notifyService = $notifyService;
    this.$errorService = $errorService;
    this.config = config;

    this.onInit();
  }

  onInit() {
    const articleId = this.$state.params.articleId;

    this.$articlesService.get({ articleId }).$promise.then(
      Article => {
        this.Article = Article;
        this.$globalsService.topbar = angular.extend(
          {}, this.$globalsService.topbar, { title: Article.name }
        );
      },
      err => this.$errorService.handleError(err)
    );

    this.$timersService.query({ articleId }).$promise.then(timers => {
      this.timers = timers;
    });
  }

  handleRemoveResponse(res) {
    this.$translate(['ARTICLES.DELETED'], { name: res.name }).then(translations => {
      this.$notifyService.show({
        text: translations['ARTICLES.DELETED'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { articlesDetailController };
