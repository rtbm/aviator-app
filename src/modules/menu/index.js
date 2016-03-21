import { menuController } from './javascript/controllers/menu-controller';
import { menuDirective } from './javascript/directives/menu-directive';

export default angular.module('ngApp.menu', [])
  .controller('menuController', menuController)
  .directive('menu', menuDirective);
