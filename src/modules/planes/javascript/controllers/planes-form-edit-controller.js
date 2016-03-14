import { PlanesController } from './planes-controller';

class PlanesFormEditController extends PlanesController {
  constructor(PlanesService, $translate, DialogService, $state, NotifyService) {
    'ngInject';
    super(PlanesService, $translate, DialogService);

    this.$translate = $translate;
    this.$state = $state;
    this.NotifyService = NotifyService;

    this.onInit();
  }

  onInit() {
    this.action = 'update';
    this.Plane = this.get(this.$state.params.planeId);
  }

  updateAction(Plane) {
    this.update(Plane).then(
      (res) => this.handleResponse(res)
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
