import { articlesController } from './articles-controller';

class articlesFormCreateController extends articlesController {
  constructor($translate, $interval, $dialogService, $state, $articlesService, $timersService,
              $notifyService, $errorService) {
    'ngInject';
    super($translate, $interval, $dialogService, $articlesService, $timersService, $errorService);

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
