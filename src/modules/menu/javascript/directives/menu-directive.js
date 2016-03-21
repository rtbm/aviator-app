function menuDirective() {
  return {
    restrict: 'E',
    templateUrl: 'menu/res/layout/menu-directive.html',
    controller: 'menuController',
    controllerAs: 'menuVM',
  };
}

export { menuDirective };
