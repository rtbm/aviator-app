import { timersRestService } from './javascript/services/timers-rest-service';
import { timersService } from './javascript/services/timers-service';
import { timerFilter } from './javascript/filters/timer-filter';

export default angular.module('ngApp.timers', [])
  .factory('$timersRestService', timersRestService)
  .service('$timersService', timersService)
  .filter('timer', timerFilter);
