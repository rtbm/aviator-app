import { topbarController } from './javascript/controllers/topbar-controller';
import { topbarDirective } from './javascript/directives/topbar-directive';

angular.module('ngApp.topbar', [])
  .controller('topbarController', topbarController)
  .directive('topbar', topbarDirective);
