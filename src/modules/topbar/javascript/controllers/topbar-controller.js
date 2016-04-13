class topbarController {
  constructor($globalsService, $state) {
    'ngInject';
    this.$globalsService = $globalsService;
    this.$state = $state;
  }

  goBackAction(toState) {
    this.$state.go(toState.state.name, toState.params);
  }

  toggleMenuAction() {
    this.$globalsService.menu.visible = !this.$globalsService.menu.visible;
  }
}

export { topbarController };
