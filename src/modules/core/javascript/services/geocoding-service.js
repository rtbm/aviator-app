class geocodingService {
  constructor($q, $http, $geolocationService, $lawnchairService) {
    'ngInject';
    this.$q = $q;
    this.$http = $http;
    this.$geolocationService = $geolocationService;
    this.$lawnchairService = $lawnchairService;

    this.locationHistory = new this.$lawnchairService('locations', 'Location');
  }

  getLocationByLatLng(lat, lng) {
    const deferred = this.$q.defer();

    const req = this.$http({
      method: 'GET',
      skipAuthorization: true,
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`,
    });

    req.then(
      res => deferred.resolve(res.data.results[0]),
      err => deferred.reject(err)
    );

    return deferred.promise;
  }

  getLocationFromCache(lat, lng) {
    const deferred = this.$q.defer();

    this.locationHistory.where(`Location.coords = "${lat},${lng}"`).then(
      locationData => {
        if (locationData.length) {
          const location = locationData.shift();
          return deferred.resolve(location);
        }
        return deferred.reject();
      });

    return deferred.promise;
  }

  getCurrentLocation() {
    const deferred = this.$q.defer();
    let position = {};

    const getLocation = this.$geolocationService.getCurrentPosition().then(
      pos => {
        position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        return this.getLocationFromCache(position.lat, position.lng);
      }
    );

    getLocation.then(
      locationData => deferred.resolve(locationData),
      () => {
        this.getLocationByLatLng(position.lat, position.lng).then(
          location => {
            const locationData = {
              createdAt: new Date().getTime(),
              coords: `${position.lat},${position.lng}`,
              data: {
                pos: location.geometry.location,
                formatted_address: location.formatted_address,
              },
            };

            this.locationHistory.save(locationData);
            return deferred.resolve(locationData);
          }
        );
      }
    );

    return deferred.promise;
  }
}

export { geocodingService };
