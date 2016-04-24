class menuController {
  constructor($globalsService, $state) {
    'ngInject';
    this.$globalsService = $globalsService;
    this.$state = $state;

    this.$globalsService = angular.extend($globalsService, {
      menu: {
        visible: false,
        items: [{
          name: 'MENU.SHOW_COLLECTION',
          sref: 'app.articlesList',
        }, {
          name: 'MENU.CREATE_NEW',
          sref: 'app.articlesFormCreate',
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
