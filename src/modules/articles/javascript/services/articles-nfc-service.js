class articlesNfcService {
  constructor($q, $nfcService, $interval) {
    'ngInject';
    this.$q = $q;
    this.$nfcService = $nfcService;
    this.$interval = $interval;

    this.mode = 'read';
    this.isReady = $q.defer();

    this.onInit();
  }

  onInit() {
    this.$nfcService.isEnabled()
      .then(
        () => this.addNdefListener(),
        () => this.checkForNfc()
      );
  }

  checkForNfc() {
    this.isReaderEnabledInterval = this.$interval(() => {
      this.$nfcService.isEnabled()
        .then(() => {
          this.$interval.cancel(this.isReaderEnabledInterval);
          this.addNdefListener();
        });
    }, 5000);
  }

  addNdefListener() {
    const deferred = this.$q.defer();
    this.listener = this.$nfcService.addNdefListener();

    this.listener.then(
      null,
      err => deferred.reject(err),
      nfcEvent => this.onNfcEvent(this.mode, nfcEvent)
    );

    return deferred.promise;
  }

  setRead() {
    this.mode = 'read';
    this.payload = null;

    return this.listener;
  }

  setWrite(payload) {
    const deferred = this.$q.defer();

    this.mode = 'write';
    this.payload = payload;

    this.listener.then(null, null, () => {
      deferred.resolve();
    });

    return deferred.promise;
  }

  onNfcEvent(mode, nfcEvent) {
    if (nfcEvent === 'LISTENER_SET') { return this.isReady.resolve(); }

    const deferred = this.$q.defer();

    switch (mode) {
      case 'write': {
        this.$nfcService.writeTextRecord(this.payload).then(() => deferred.resolve());
        break;
      }
      default: {
        /* TODO: NFC on READ event */
        deferred.resolve();
      }
    }

    return deferred.promise;
  }
}

export { articlesNfcService };
