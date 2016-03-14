class PlanesListController {
  constructor(PlanesService, $translate, NotifyService, ErrorService) {
    'ngInject';
    this.PlanesService = PlanesService;
    this.$translate = $translate;
    this.NotifyService = NotifyService;
    this.ErrorService = ErrorService;

    this.onInit();
  }

  onInit() {
    this.PlanesService.query(
      (planes) => { this.planes = planes },
      (err) => this.ErrorService.handleError(err)
    );
  }

  removeAction(Plane) {
    this.PlanesService.remove({ planeId: Plane._id },
      (res) => this.handleResponse(res),
      (err) => this.ErrorService.handleError(err)
    );
  }

  handleResponse(res) {
    this.$translate(['PLANES.DELETED_PLANE'], { name: res.name }).then((translations) => {
      this.NotifyService.show({
        text: translations['PLANES.DELETED_PLANE'],
      });
    });

    for(let i = this.planes.length - 1; i !== -1; i--) {
      if (this.planes[i]._id === res._id) {
        this.planes.splice(i, 1);
        break;
      }
    }
  }
}

export { PlanesListController };
