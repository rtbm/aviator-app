function getPictureDirective($translate, $dialogService, $cameraService, $deviceReadyService) {
  'ngInject';
  function handleError() {
    $translate(['CORE.CAMERA_ERROR_OCCURRED', 'CORE.OK']).then(translations => {
      $dialogService.show({
        text: translations['CORE.CAMERA_ERROR_OCCURRED'],
        buttons: [{
          text: translations['CORE.OK'],
        }],
      });
    });
  }

  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
    },
    link: (scope, el) => {
      el.on('click', () => $deviceReadyService(
        () => $cameraService.getPicture().then(
          imageData => {
            scope.ngModel = `data:image/jpeg;base64,${imageData}`;
          },
          err => handleError(err)
        )));

      scope.$on('$destroy', () => el.unbind('click'));
    },
  };
}

export { getPictureDirective };
