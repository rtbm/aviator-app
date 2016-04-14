import { articlesController } from './articles-controller';

class articlesFormCreateController extends articlesController {
  constructor($q, $translate, $interval, $dialogService, $articlesService, $timersService,
              $geocodingService, $weatherService, $errorService, $state, $notifyService) {
    'ngInject';
    super($q, $translate, $interval, $dialogService, $articlesService, $timersService,
      $geocodingService, $weatherService, $errorService);

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

  handleCreateResponse(res) {
    this.$translate(['ARTICLES.CREATED_NEW'], { name: res.name }).then(translations => {
      this.$notifyService.show({
        text: translations['ARTICLES.CREATED_NEW'],
      });
    });

    this.$state.go('app.articlesList');
  }
}

export { articlesFormCreateController };
