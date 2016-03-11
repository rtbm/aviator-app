import { DeviceReadyService } from './javascript/services/device-ready-service';
import { GlobalsService } from './javascript/services/globals-service';
import { NotifyService } from './javascript/services/notify-service';
import { GeolocationService } from './javascript/services/geolocation-service';
import { LawnchairService } from './javascript/services/lawnchair-service';
import { WeatherApiService } from './javascript/services/weather-api-service';
import { WeatherService } from './javascript/services/weather-service';

export default angular.module('ngApp.core', [])
  .factory('DeviceReadyService', DeviceReadyService)
  .factory('GlobalsService', GlobalsService)
  .factory('LawnchairService', LawnchairService)
  .service('NotifyService', NotifyService)
  .service('GeolocationService', GeolocationService)
  .service('WeatherApiService', WeatherApiService)
  .service('WeatherService', WeatherService);
