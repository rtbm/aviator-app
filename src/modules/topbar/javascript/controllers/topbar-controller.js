class topbarController {
  constructor($globalsService) {
    'ngInject';
    this.$globalsService = $globalsService;
  }

  toggleMenu() {
    this.$globalsService.menu.visible = !this.$globalsService.menu.visible;
  }
}

export { topbarController };
