class AccountsController {
  constructor($state, WeatherService, AccountsService) {
    'ngInject';
    this.$state = $state;
    this.WeatherService = WeatherService;
    this.AccountsService = AccountsService;

    this.view = '';

    this.onInit();
  }

  onInit() {
    this.WeatherService.getWeather().then(
      (weather) => console.log(weather)
    );
  }

  setViewAction(name) {
    this.view = name;
    this.User = {};
  }

  signinAction(User) {
    this.AccountsService.signin(User).then(
      () => this.handleResponse()
    );
  }

  signupAction(User) {
    this.AccountsService.signup(User).then(
      () => this.handleResponse()
    );
  }

  handleResponse() {
    this.$state.go('app.planesList');
  }
}

export { AccountsController };
