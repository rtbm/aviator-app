class topbarService {
  constructor($globalsService) {
    'ngInject';
    this.$globalsService = $globalsService;
  }

  setTitle(title) {
    this.$globalsService.topbar = angular.extend({}, this.$globalsService.topbar, { title });
  }
}

export { topbarService };
