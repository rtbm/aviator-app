function fileUploadImageDirective($translate, $dialogService) {
  'ngInject';
  function handleError() {
    $translate(['CORE.INCORRECT_FILE_FORMAT', 'CORE.OK'], { ext: 'jpeg, png' })
      .then(translations => $dialogService.show({
        text: translations['CORE.INCORRECT_FILE_FORMAT'],
        buttons: [{
          text: translations['CORE.OK'],
        }],
      }));
  }

  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
    },
    link: (scope, el) => {
      el.on('change', event => {
        const file = event.target.files[0];
        const isFileAllowed = ['image/png', 'image/gif', 'image/jpeg'].indexOf(file.type) !== -1;

        if (!file || !isFileAllowed) {
          el.val('');
          return handleError();
        }

        const reader = new FileReader();

        reader.onload = ev => scope.$apply(() => {
          scope.ngModel = ev.target.result;
        });

        return reader.readAsDataURL(file);
      });

      scope.$on('$destroy', () => el.unbind('change'));
    },
  };
}

export { fileUploadImageDirective };
