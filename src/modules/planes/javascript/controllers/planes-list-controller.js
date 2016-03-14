import { PlanesController } from './planes-controller';

class PlanesListController extends PlanesController {
  constructor(PlanesService, $translate, DialogService) {
    'ngInject';
    super(PlanesService, $translate, DialogService);

    this.onInit();
  }

  onInit() {
    this.findAll().then((res) => this.planes = res);
  }

  removeAction(Plane) {
    this.remove(Plane._id).then((res) => {
      for(let i = this.planes.length - 1; i !== -1; i--) {
        if (this.planes[i]._id === res._id) {
          this.planes.splice(i, 1);
          break;
        }
      }
    });
  }
}

export { PlanesListController };
