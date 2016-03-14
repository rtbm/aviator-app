import { PlanesController } from './planes-controller';

class PlanesFormCreateController extends PlanesController {
  constructor(PlanesService, $translate, DialogService, $state, NotifyService) {
    'ngInject';
    super(PlanesService, $translate, DialogService);

    this.$translate = $translate;
    this.$state = $state;
    this.NotifyService = NotifyService;

    this.onInit();
  }

  onInit() {
    this.action = 'create';
  }

  createAction(Plane) {
    this.create(Plane).then(
      (res) => this.handleResponse(res)
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
