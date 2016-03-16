class errorService {
  constructor($translate, $dialogService) {
    'ngInject';
    this.$translate = $translate;
    this.$dialogService = $dialogService;
  }

  handleError(err) {
    this.$translate(['CORE.ERROR_OCCURRED', 'CORE.OK'], { status: err.status })
      .then((translations) => {
        this.$dialogService.show({
          text: translations['CORE.ERROR_OCCURRED'],
          buttons: [{
            text: translations['CORE.OK'],
          }],
        });
      });
  }
}

export { errorService };
