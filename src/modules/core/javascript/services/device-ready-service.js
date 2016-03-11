function DeviceReadyService($q) {
  'ngInject';

  function DeviceReadyService(cb) {
    const deferred = $q.defer();

    ('ontouchstart' in window || navigator.maxTouchPoints)
      ? document.addEventListener('deviceready', () => deferred.resolve())
      : angular.element(document).ready(() => deferred.resolve(), false);

    $q.when(deferred).then(() => !!cb && cb());

    return deferred.promise;
  }

  return DeviceReadyService;
}

export { DeviceReadyService };
