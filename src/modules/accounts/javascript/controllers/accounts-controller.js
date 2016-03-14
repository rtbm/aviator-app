class AccountsController {
  constructor($translate, $state, store, WeatherService, NotifyService, AccountsService) {
    'ngInject';
    this.$translate = $translate;
    this.$state = $state;
    this.store = store;
    this.WeatherService = WeatherService;
    this.NotifyService = NotifyService;
    this.AccountsService = AccountsService;

    this.view = '';
    this.User = {};

    this.onInit();
  }

  onInit() {
    this.WeatherService.getWeather().then((weather) => console.log(weather));
  }

  setViewAction(name) {
    this.view = name;
    this.User = {};
  }

  signinAction(User) {
    this.AccountsService.signin(User,
      (res) => this.handleResponse(res),
      (err) => this.handleError(err)
    );
  }

  signupAction(User) {
    this.AccountsService.signup(User,
      (res) => this.handleResponse(res),
      (err) => this.handleError(err)
    );
  }

  handleResponse(res) {
    this.store.set('jwt', res.id_token);
    this.$state.go('app.planesList');
  }

  handleError(err) {
    let message = 'ACCOUNTS.ERROR_DEFAULT';

    switch(err.status) {
      case 409:
      {
        message = 'ACCOUNTS.ERROR_409';
        break;
      }
      case 422:
      {
        message = 'ACCOUNTS.ERROR_422';
        break;
      }
    }

    this.$translate([message]).then(
      (translations) => this.NotifyService.show({
        text: translations[message]
      })
    );
  }
}

export { AccountsController };
