import { deviceReadyService } from './javascript/services/device-ready-service';
import { globalsService } from './javascript/services/globals-service';
import { notifyService } from './javascript/services/notify-service';
import { dialogService } from './javascript/services/dialog-service';
import { geolocationService } from './javascript/services/geolocation-service';
import { lawnchairService } from './javascript/services/lawnchair-service';
import { weatherService } from './javascript/services/weather-service';
import { errorService } from './javascript/services/error-service';

export default angular.module('ngApp.core', [])
  .factory('$deviceReadyService', deviceReadyService)
  .factory('$globalsService', globalsService)
  .factory('$lawnchairService', lawnchairService)
  .service('$errorService', errorService)
  .service('$notifyService', notifyService)
  .service('$dialogService', dialogService)
  .service('$geolocationService', geolocationService)
  .service('$weatherService', weatherService);
