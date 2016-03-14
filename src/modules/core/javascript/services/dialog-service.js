class DialogService {
  constructor($templateCache, $compile, $rootScope, $q) {
    'ngInject';
    this.$templateCache = $templateCache;
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;

    this.body = angular.element(document.getElementsByTagName('body')[0]);
  }

  show(options) {
    const template = this.$templateCache.get('core/res/layout/dialog-partial.html');

    this.deferred = this.$q.defer();

    this.scope = this.$rootScope.$new();
    this.scope = angular.extend(this.scope, options);
    this.scope.resolve = (response) => this.hide(response);

    this.dialog = this.$compile(template)(this.scope);
    this.body.append(this.dialog);

    this.deferred.promise.cancel = () => this.hide();

    return this.deferred.promise;
  }

  hide(response) {
    this.dialog.remove();
    this.scope.$destroy();
    this.deferred.resolve(response);
  }
}

export { DialogService };
