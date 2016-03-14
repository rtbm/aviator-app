class WeatherService {
  constructor($q, Config, $http, GlobalsService, DeviceReadyService, LawnchairService, GeolocationService) {
    'ngInject';
    this.$q = $q;
    this.Config = Config;
    this.$http = $http;
    this.GlobalsService = GlobalsService;
    this.DeviceReadyService = DeviceReadyService;
    this.LawnchairService = LawnchairService;
    this.GeolocationService = GeolocationService;

    this.WeatherHistory = new this.LawnchairService('weathers', 'Weather');
  }

  getWeatherByLatLng(latitude, longitude) {
    return this.$http({
      method: 'GET',
      skipAuthorization: true,
      url: `http://api.openweathermap.org/data/2.5/weather?APPID=${this.Config.weather_api_key}`
      + `&lat=${latitude}&lon=${longitude}&units=metric&lang=`
      + `${this.GlobalsService.activeLanguage}`
    });
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
          return this.getWeatherByLatLng(
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
