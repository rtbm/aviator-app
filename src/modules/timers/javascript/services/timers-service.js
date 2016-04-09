function timersService(config, $resource) {
  'ngInject';
  return $resource(`${config.api}/v1/timers/:timerId`, {
    timerId: '@_id',
  }, {
    update: {
      method: 'PUT',
    },
  });
}

export { timersService };
