import { timersService } from './javascript/services/timers-service';

export default angular.module('ngApp.timers', [])
  .service('$timersService', timersService);
