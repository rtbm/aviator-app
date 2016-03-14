function PlanesService(Config, $resource) {
  'ngInject';
  return $resource(`${Config.api}/v1/planes/:planeId`, {
    planeId: '@_id',
  }, {
    update: {
      method: 'PUT',
    },
  });
}

export { PlanesService };
