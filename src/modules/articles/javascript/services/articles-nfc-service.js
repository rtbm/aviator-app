class articlesNfcService {
  constructor($q, $nfcService, $interval) {
    'ngInject';
    this.$q = $q;
    this.$nfcService = $nfcService;
    this.$interval = $interval;

    this.isReaderEnabled = false;
    this.listener = false;

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
    const listener = this.$nfcService.addNdefListener();

    console.log(angular.toJson(listener));

    listener.then(
      () => {},
      err => deferred.reject(err),
      nfcEvent => {
        if (!nfcEvent) {
          this.isReaderEnabled = true;
          return deferred.resolve();
        }
        return this.onNfcEvent(nfcEvent);
      }
    );

    this.listener = listener;

    return deferred.promise;
  }

  onNfcEvent(nfcEvent) {
  }

  write(Article) {
    const deferred = this.$q.defer();

    this.$nfcService.isEnabled()
      .then(() => this.listener ? this.listener.cancel() : this.$q.resolve())
      .then(() => this.$nfcService.writeTextRecord(Article._id))
      .then(() => this.addNdefListener())
      .then(() => deferred.resolve());

    return deferred.promise;
  }
}

export { articlesNfcService };
