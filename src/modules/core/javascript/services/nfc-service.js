function nfcService($q) {
  'ngInject';
  return {
    isEnabled: () => {
      const deferred = $q.defer();

      nfc.enabled(
        () => deferred.resolve(),
        () => deferred.reject()
      );

      return deferred.promise;
    },

    addNdefListener: () => {
      const deferred = $q.defer();

      nfc.addNdefListener(
        () => deferred.resolve(nfcEvent),
        () => deferred.notify(),
        (err) => deferred.reject(err)
      );

      deferred.promise.cancel = () => {
        nfc.removeNdefListener(
          () => deferred.resolve(nfcEvent)
        );
      };

      return q.promise;
    },

    writeTextRecord: (message) => {
      const deferred = $q.defer();

      nfc.write(
        [ndef.textRecord(message)],
        (nfcEvent) => deferred.resolve(nfcEvent),
        (err) => deferred.reject(err)
      );

      return deferred.promise;
    },

    shareTextRecord: (message) => {
      const deferred = $q.defer();

      nfc.share(
        [ndef.textRecord(message)],
        (nfcEvent) => deferred.resolve(nfcEvent),
        (err) => deferred.reject(err)
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
