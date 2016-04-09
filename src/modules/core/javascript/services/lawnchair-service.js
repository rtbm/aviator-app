function lawnchairService($q) {
  'ngInject';
  const lawnchairSvc = function lawnchairSvc(name, record) {
    this.options = { name, record };
  };

  lawnchairSvc.prototype = {
    get(key) {
      const deferred = $q.defer();

      Lawnchair(this.options, items => {
        items.get(key, result => {
          deferred.resolve(result);
        });
      });

      return deferred.promise;
    },

    save(item) {
      const deferred = $q.defer();

      Lawnchair(this.options, items => {
        items.save(item, result => {
          deferred.resolve(result);
        });
      });

      return deferred.promise;
    },

    all() {
      const deferred = $q.defer();

      Lawnchair(this.options, items => {
        items.all(result => {
          deferred.resolve(result);
        });
      });

      return deferred.promise;
    },

    remove(key) {
      const deferred = $q.defer();

      Lawnchair(this.options, items => {
        items.remove(key, result => {
          deferred.resolve(result);
        });
      });

      return deferred.promise;
    },
  };

  return lawnchairSvc;
}

export { lawnchairService };
