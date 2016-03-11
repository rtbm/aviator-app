class GeolocationService {
  constructor($q) {
    'ngInject';
    this.$q = $q;
  }

  getCurrentPosition(options) {
    const deferred = this.$q.defer();

    navigator.geolocation.getCurrentPosition(
      (position) => deferred.resolve(position),
      (err) => deferred.reject(err),
      options
    );

    return deferred.promise;
  }

  watchPosition(options) {
    const deferred = this.$q.defer();

    const watchId = navigator.geolocation.watchPosition(
      (position) => deferred.notify(position),
      (err) => deferred.reject(err),
      options
    );

    deferred.promise.cancel = () => {
      navigator.geolocation.clearWatch(watchId);
    };

    return deferred.promise;
  }

}

export { GeolocationService };
