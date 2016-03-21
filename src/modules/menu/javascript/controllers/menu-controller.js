class menuController {
  constructor($globalsService, $state) {
    'ngInject';
    this.$globalsService = $globalsService;
    this.$state = $state;

    this.$globalsService = angular.extend($globalsService, {
      menu: {
        visible: false,
        items: [{
          name: 'MENU.CREATE_NEW_ARTICLE',
          sref: 'app.articlesFormCreate',
        }, {
          name: 'MENU.ARTICLES',
          sref: 'app.articlesList',
        }],
      },
    });
  }

  clickAction(item) {
    this.$state.go(item.sref);
    this.$globalsService.menu.visible = false;
  }
}

export { menuController };
