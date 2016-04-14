class weatherService {
  constructor(config, $q, $http, $globalsService, $lawnchairService, $geolocationService) {
    'ngInject';
    this.$q = $q;
    this.config = config;
    this.$http = $http;
    this.$globalsService = $globalsService;
    this.$lawnchairService = $lawnchairService;
    this.$geolocationService = $geolocationService;

    this.weatherHistory = new this.$lawnchairService('weathers', 'Weather');
    this.weather = {};

    this.onInit();
  }

  onInit() {
    this.getWeather().then(weather => { this.weather = weather; });
  }

  getWeatherByLatLng(lat, lng) {
    return this.$http({
      method: 'GET',
      skipAuthorization: true,
      url: `http://api.openweathermap.org/data/2.5/weather?APPID=${this.config.weather_api_key}`
      + `&lat=${lat}&lon=${lng}&units=metric&lang=`
      + `${this.$globalsService.activeLanguage}`,
    });
  }

  getWeatherFromCache() {
    const deferred = this.$q.defer();

    this.weatherHistory.all().then(results => {
      const latestWeatherData = results.pop();

      if (!!latestWeatherData) {
        const expirationTimestamp = latestWeatherData.createdAt + 36000000;
        const isExpired = expirationTimestamp < new Date().getTime();

        if (!isExpired) {
          deferred.resolve(latestWeatherData);
        }
      }

      deferred.reject();
    });

    return deferred.promise;
  }

  getWeather() {
    const deferred = this.$q.defer();

    this.getWeatherFromCache()
      .then(
        result => deferred.resolve(result),
        () => this.$geolocationService.getCurrentPosition()
          .then(pos => this.getWeatherByLatLng(pos.coords.latitude, pos.coords.longitude))
          .then(weather => {
            const weatherData = {
              createdAt: new Date().getTime(),
              data: {
                weather: weather.data.weather[0],
                main: weather.data.main,
                clouds: weather.data.clouds,
                rain: weather.data.rain,
                snow: weather.data.snow,
                wind: weather.data.wind,
              },
            };

            console.log(weatherData);

            this.weatherHistory.save(weatherData);

            return deferred.resolve(weatherData);
          })
      );

    return deferred.promise;
  }
}

export { weatherService };
