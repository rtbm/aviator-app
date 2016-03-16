function deviceReadyService($q) {
  'ngInject';
  function deviceReadyService(cb) {
    const deferred = $q.defer();

    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      document.addEventListener('deviceready', deferred.resolve());
    } else {
      angular.element(document).ready(deferred.resolve(), false);
    }

    $q.when(deferred).then(() => !!cb && cb());

    return deferred.promise;
  }

  return deviceReadyService;
}

export { deviceReadyService };
