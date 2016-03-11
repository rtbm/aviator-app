import { AccountsService } from './javascript/services/accounts-service';
import { AccountsController } from './javascript/controllers/accounts-controller';
import { AccountsRoutes } from './javascript/routes/accounts-routes';

export default angular.module('ngApp.accounts', [])
  .factory('AccountsService', AccountsService)
  .controller('AccountsController', AccountsController)
  .config(AccountsRoutes);
