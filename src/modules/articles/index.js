import { articlesRestService } from './javascript/services/articles-rest-service';
import { articlesService } from './javascript/services/articles-service';
import { articlesDialogService } from './javascript/services/articles-dialog-service';
import { articlesNotifyService } from './javascript/services/articles-notify-service';
import { articlesNfcService } from './javascript/services/articles-nfc-service';
import { articlesListController } from './javascript/controllers/articles-list-controller';
import { articlesFormCreateController } from './javascript/controllers/articles-form-create-controller';
import { articlesFormEditController } from './javascript/controllers/articles-form-edit-controller';
import { articlesDetailController } from './javascript/controllers/articles-detail-controller';
import { articlesRoutes } from './javascript/routes/articles-routes';

export default angular.module('ngApp.articles', [])
  .factory('$articlesRestService', articlesRestService)
  .service('$articlesService', articlesService)
  .service('$articlesDialogService', articlesDialogService)
  .service('$articlesNotifyService', articlesNotifyService)
  .service('$articlesNfcService', articlesNfcService)
  .controller('articlesListController', articlesListController)
  .controller('articlesFormCreateController', articlesFormCreateController)
  .controller('articlesFormEditController', articlesFormEditController)
  .controller('articlesDetailController', articlesDetailController)
  .config(articlesRoutes);
