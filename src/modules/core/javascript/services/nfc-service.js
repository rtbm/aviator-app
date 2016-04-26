function nfcService($q, $deviceReadyService) {
  'ngInject';
  return {
    isEnabled: () => {
      const deferred = $q.defer();

      $deviceReadyService().then(
        () => nfc.enabled(
          () => deferred.resolve(),
          () => deferred.reject()
        )
      );

      return deferred.promise;
    },

    addNdefListener: () => {
      const deferred = $q.defer();

      nfc.addNdefListener(
        nfcEvent => deferred.notify(nfcEvent),
        () => deferred.notify('LISTENER_SET'),
        err => deferred.reject(err)
      );

      deferred.promise.cancel = () => nfc.removeNdefListener(() => deferred.resolve());

      return deferred.promise;
    },

    writeTextRecord: (message) => {
      const deferred = $q.defer();

      nfc.write(
        [ndef.textRecord(message)],
        nfcEvent => deferred.resolve(nfcEvent),
        err => deferred.reject(err)
      );

      return deferred.promise;
    },

    shareTextRecord: (message) => {
      const deferred = $q.defer();

      nfc.share(
        [ndef.textRecord(message)],
        nfcEvent => deferred.resolve(nfcEvent),
        err => deferred.reject(err)
      );

      deferred.promise.cancel = () => {
        nfc.unshare((nfcEvent) => {
          deferred.resolve(nfcEvent);
        });
      };

      return deferred.promise;
    },
  };
}

export { nfcService };
