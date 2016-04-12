import { timerFilter } from './javascript/filters/timer-filter';
import { timersService } from './javascript/services/timers-service';

export default angular.module('ngApp.timers', [])
  .service('$timersService', timersService)
  .filter('timer', timerFilter);
