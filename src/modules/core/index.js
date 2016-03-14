import { DeviceReadyService } from './javascript/services/device-ready-service';
import { GlobalsService } from './javascript/services/globals-service';
import { NotifyService } from './javascript/services/notify-service';
import { DialogService } from './javascript/services/dialog-service';
import { GeolocationService } from './javascript/services/geolocation-service';
import { LawnchairService } from './javascript/services/lawnchair-service';
import { WeatherService } from './javascript/services/weather-service';
import { ErrorService } from './javascript/services/error-service';

export default angular.module('ngApp.core', [])
  .factory('DeviceReadyService', DeviceReadyService)
  .factory('GlobalsService', GlobalsService)
  .factory('LawnchairService', LawnchairService)
  .service('ErrorService', ErrorService)
  .service('NotifyService', NotifyService)
  .service('DialogService', DialogService)
  .service('GeolocationService', GeolocationService)
  .service('WeatherService', WeatherService)
;
