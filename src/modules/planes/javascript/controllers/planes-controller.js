class PlanesController {
  constructor(PlanesService, $translate, DialogService) {
    'ngInject';
    this.PlanesService = PlanesService;
    this.$translate = $translate;
    this.DialogService = DialogService;
  }

  findAll() {
    return this.PlanesService.query(
      () => {},
      (err) => this.handleError(err)
    ).$promise;
  }

  get(planeId) {
    return this.PlanesService.get({ planeId },
      () => {},
      (err) => this.handleError(err)
    ).$promise;
  }

  create(Plane) {
    return this.PlanesService.save(Plane,
      () => {},
      (err) => this.handleError(err)
    ).$promise;
  }

  update(Plane) {
    return this.PlanesService.update(Plane,
      () => {},
      (err) => this.handleError(err)
    ).$promise;
  }

  remove(planeId) {
    return this.PlanesService.delete({ planeId },
      () => {},
      (err) => this.handleError(err)
    ).$promise;
  }

  handleError(err) {
    this.$translate(['PLANES.ERROR_OCCURRED', 'PLANES.OK'], { status: err.status }).then((translations) => {
      this.DialogService.show({
        text: translations['PLANES.ERROR_OCCURRED'],
        buttons: [{
          text: translations['PLANES.OK'],
        }],
      });
    });
  }
}

export { PlanesController };
