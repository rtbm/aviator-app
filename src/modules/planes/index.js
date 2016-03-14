import { PlanesService } from './javascript/services/planes-service';
import { PlanesListController } from './javascript/controllers/planes-list-controller';
import { PlanesFormCreateController } from './javascript/controllers/planes-form-create-controller';
import { PlanesFormEditController } from './javascript/controllers/planes-form-edit-controller';
import { PlanesRoutes } from './javascript/routes/planes-routes';

export default angular.module('ngApp.planes', [])
  .factory('PlanesService', PlanesService)
  .controller('PlanesListController', PlanesListController)
  .controller('PlanesFormCreateController', PlanesFormCreateController)
  .controller('PlanesFormEditController', PlanesFormEditController)
  .config(PlanesRoutes);
