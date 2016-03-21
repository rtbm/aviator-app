class weatherService {
  constructor(config, $q, $http, $globalsService, $deviceReadyService, $lawnchairService,
              $geolocationService) {
    'ngInject';
    this.$q = $q;
    this.config = config;
    this.$http = $http;
    this.$globalsService = $globalsService;
    this.$deviceReadyService = $deviceReadyService;
    this.$lawnchairService = $lawnchairService;
    this.$geolocationService = $geolocationService;

    this.weatherHistory = new this.$lawnchairService('weathers', 'Weather');
    this.weather = {};

    this.onInit();
  }

  onInit() {
    this.getWeather().then((weather) => { this.weather = weather; });
  }

  getWeatherByLatLng(latitude, longitude) {
    return this.$http({
      method: 'GET',
      skipAuthorization: true,
      url: `http://api.openweathermap.org/data/2.5/weather?APPID=${this.config.weather_api_key}`
      + `&lat=${latitude}&lon=${longitude}&units=metric&lang=`
      + `${this.$globalsService.activeLanguage}`,
    });
  }

  getWeather() {
    const deferred = this.$q.defer();

    this.weatherHistory.all().then((results) => {
      const latestWeatherData = results.pop();

      if (!!latestWeatherData) {
        const expirationTimestamp = latestWeatherData.createdAt + 36000000;

        if (expirationTimestamp > new Date().getTime()) {
          return deferred.resolve(latestWeatherData);
        }
      }

      this.$deviceReadyService(() => {
        const geolocationOptions = {
          timeout: 1200000,
          enableHighAccuracy: true,
        };

        this.$geolocationService.getCurrentPosition(geolocationOptions)
          .then((pos) => this.getWeatherByLatLng(pos.coords.latitude, pos.coords.longitude))
          .then((weather) => {
            const weatherData = {
              createdAt: new Date().getTime(),
              weather: weather.data,
            };

            this.weatherHistory.save(weatherData);
            deferred.resolve(weatherData);
          });
      });

      return true;
    });

    return deferred.promise;
  }
}

export { weatherService };
