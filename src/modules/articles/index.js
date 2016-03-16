import { ArticlesService } from './javascript/services/articles-service';
import { ArticlesListController } from './javascript/controllers/articles-list-controller';
import { ArticlesFormCreateController } from './javascript/controllers/articles-form-create-controller';
import { ArticlesFormEditController } from './javascript/controllers/articles-form-edit-controller';
import { ArticlesRoutes } from './javascript/routes/articles-routes';

export default angular.module('ngApp.articles', [])
  .factory('ArticlesService', ArticlesService)
  .controller('ArticlesListController', ArticlesListController)
  .controller('ArticlesFormCreateController', ArticlesFormCreateController)
  .controller('ArticlesFormEditController', ArticlesFormEditController)
  .config(ArticlesRoutes);
