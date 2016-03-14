class WeatherService {
  constructor($q, DeviceReadyService, LawnchairService, GeolocationService, WeatherApiService) {
    'ngInject';
    this.$q = $q;
    this.DeviceReadyService = DeviceReadyService;
    this.LawnchairService = LawnchairService;
    this.GeolocationService = GeolocationService;
    this.WeatherApiService = WeatherApiService;

    this.WeatherHistory = new this.LawnchairService('weathers', 'Weather');
  }

  getWeather() {
    const deferred = this.$q.defer();

    this.WeatherHistory.all().then((results) => {
      const latestWeatherData = results.pop();

      if (!!latestWeatherData) {
        const expirationTimestamp = latestWeatherData.createdAt + 36000000;

        if (expirationTimestamp > new Date().getTime()) {
          return deferred.resolve(latestWeatherData);
        }
      }

      this.DeviceReadyService(() => {
        return this.GeolocationService.getCurrentPosition({
          timeout: 1200000,
          enableHighAccuracy: true

        }).then((pos) => {
          return this.WeatherApiService.getWeatherByLatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );

        }).then((weather) => {
          const weatherData = {
            createdAt: new Date().getTime(),
            weather: weather.data
          };
          this.WeatherHistory.save(weatherData);

          deferred.resolve(weatherData);
        });
      });
    });

    return deferred.promise;
  }
}

export { WeatherService };
