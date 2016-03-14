class PlanesFormEditController {
  constructor(PlanesService, $translate, $state, NotifyService, ErrorService) {
    'ngInject';
    this.$translate = $translate;
    this.$state = $state;
    this.NotifyService = NotifyService;
    this.PlanesService = PlanesService;
    this.ErrorService = ErrorService;

    this.onInit();
  }

  onInit() {
    this.action = 'update';
    this.PlanesService.get({ planeId: this.$state.params.planeId },
      (Plane) => { this.Plane = Plane },
      (err) => this.handleError(err)
    );
  }

  updateAction(Plane) {
    this.PlanesService.update(Plane,
      (res) => this.handleResponse(res),
      (err) => this.ErrorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['PLANES.UPDATED_PLANE'], { name: res.name }).then((translations) => {
      this.NotifyService.show({
        text: translations['PLANES.UPDATED_PLANE'],
      });
    });

    this.$state.go('app.planesList');
  }
}

export { PlanesFormEditController };
