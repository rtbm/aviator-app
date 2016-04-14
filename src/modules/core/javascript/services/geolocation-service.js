class geolocationService {
  constructor($q, $deviceReadyService) {
    'ngInject';
    this.$q = $q;
    this.$deviceReadyService = $deviceReadyService;
  }

  getCurrentPosition(options) {
    const deferred = this.$q.defer();

    this.$deviceReadyService().then(() => {
      navigator.geolocation.getCurrentPosition(
        position => deferred.resolve(position),
        err => deferred.reject(err),
        options || {
          enableHighAccuracy: false,
          timeout: 15000,
        }
      );
    });

    return deferred.promise;
  }

  watchPosition(options) {
    const deferred = this.$q.defer();

    this.$deviceReadyService().then(() => {
      const watchId = navigator.geolocation.watchPosition(
        position => deferred.notify(position),
        err => deferred.reject(err),
        options || {
          enableHighAccuracy: true,
          timeout: 15000,
        }
      );

      deferred.promise.cancel = () => {
        navigator.geolocation.clearWatch(watchId);
      };
    });

    return deferred.promise;
  }
}

export { geolocationService };
