import { deviceReadyService } from './javascript/services/device-ready-service';
import { globalsService } from './javascript/services/globals-service';
import { lawnchairService } from './javascript/services/lawnchair-service';
import { cameraService } from './javascript/services/camera-service';
import { dialogService } from './javascript/services/dialog-service';
import { errorService } from './javascript/services/error-service';
import { notifyService } from './javascript/services/notify-service';
import { geolocationService } from './javascript/services/geolocation-service';
import { weatherService } from './javascript/services/weather-service';
import { nfcService } from './javascript/services/nfc-service';
import { fileUploadImageDirective } from './javascript/directives/file-upload-image-directive';
import { getPictureDirective } from './javascript/directives/get-picture-directive';

export default angular.module('ngApp.core', [])
  .factory('$deviceReadyService', deviceReadyService)
  .factory('$globalsService', globalsService)
  .factory('$lawnchairService', lawnchairService)
  .factory('$cameraService', cameraService)
  .service('$dialogService', dialogService)
  .service('$errorService', errorService)
  .service('$notifyService', notifyService)
  .service('$geolocationService', geolocationService)
  .service('$weatherService', weatherService)
  .service('$nfcService', nfcService)
  .directive('fileUploadImage', fileUploadImageDirective)
  .directive('getPicture', getPictureDirective);
