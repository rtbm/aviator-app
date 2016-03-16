import { articlesService } from './javascript/services/articles-service';
import { articlesListController } from './javascript/controllers/articles-list-controller';
import { articlesFormCreateController } from './javascript/controllers/articles-form-create-controller';
import { articlesFormEditController } from './javascript/controllers/articles-form-edit-controller';
import { articlesRoutes } from './javascript/routes/articles-routes';

export default angular.module('ngApp.articles', [])
  .factory('$articlesService', articlesService)
  .controller('articlesListController', articlesListController)
  .controller('articlesFormCreateController', articlesFormCreateController)
  .controller('articlesFormEditController', articlesFormEditController)
  .config(articlesRoutes);
