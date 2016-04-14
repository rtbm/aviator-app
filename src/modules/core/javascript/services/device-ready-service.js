function deviceReadyService($q) {
  'ngInject';
  const deferred = $q.defer();

  function deviceReadySvc(cb) {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      document.addEventListener('deviceready', () => deferred.resolve());
    } else {
      angular.element(document).ready(() => deferred.resolve(), false);
    }

    $q.when(deferred).then(() => !!cb && cb());

    return deferred.promise;
  }

  return deviceReadySvc;
}

export { deviceReadyService };
