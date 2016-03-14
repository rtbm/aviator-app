class ErrorService {
  constructor($translate, DialogService) {
    'ngInject';
    this.$translate = $translate;
    this.DialogService = DialogService;
  }

  handleError(err) {
    this.$translate(['CORE.ERROR_OCCURRED', 'CORE.OK'], { status: err.status }).then((translations) => {
      this.DialogService.show({
        text: translations['CORE.ERROR_OCCURRED'],
        buttons: [{
          text: translations['CORE.OK'],
        }],
      });
    });
  }
}

export { ErrorService };
