class WeatherApiService {
  constructor(Config, $http, GlobalsService) {
    'ngInject';
    this.Config = Config;
    this.$http = $http;
    this.GlobalsService = GlobalsService;
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
}

export { WeatherApiService };
