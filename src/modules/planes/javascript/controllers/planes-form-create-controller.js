class PlanesFormCreateController {
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
    this.action = 'create';
  }

  createAction(Plane) {
    this.PlanesService.save(Plane,
      (res) => this.handleResponse(res),
      (err) => this.ErrorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['PLANES.CREATED_NEW_PLANE'], { name: res.name }).then((translations) => {
      this.NotifyService.show({
        text: translations['PLANES.CREATED_NEW_PLANE'],
      });
    });

    this.$state.go('app.planesList');
  }
}

export { PlanesFormCreateController };
