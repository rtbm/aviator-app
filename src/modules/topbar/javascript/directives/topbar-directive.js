function topbarDirective() {
  return {
    restrict: 'E',
    controller: 'topbarController',
    controllerAs: 'topbarVM',
    templateUrl: 'topbar/res/layout/topbar-directive.html',
  };
}

export { topbarDirective };
