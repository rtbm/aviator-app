import { topbarService } from './javascript/services/topbar-service';
import { topbarController } from './javascript/controllers/topbar-controller';
import { topbarDirective } from './javascript/directives/topbar-directive';

angular.module('ngApp.topbar', [])
  .service('$topbarService', topbarService)
  .controller('topbarController', topbarController)
  .directive('topbar', topbarDirective);
