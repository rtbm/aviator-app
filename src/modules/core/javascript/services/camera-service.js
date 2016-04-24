function cameraService($q, $deviceReadyService) {
  'ngInject';
  return {
    getPicture: options => {
      const deferred = $q.defer();

      $deviceReadyService().then(
        () => navigator.camera.getPicture(
          imageData => deferred.resolve(imageData),
          err => deferred.reject(err),
          options || {
            destinationType: Camera.DestinationType.DATA_URL,
            correctOrientation: true,
            targetWidth: 1024,
            targetHeight: 768,
            encodingType: Camera.EncodingType.JPEG,
          }
        )
      );

      return deferred.promise;
    },
  };
}

export { cameraService };
