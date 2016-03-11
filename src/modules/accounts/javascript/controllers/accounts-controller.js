class AccountsController {
  constructor($translate, WeatherService, AccountsService, NotifyService) {
    'ngInject';
    this.$translate = $translate;
    this.AccountsService = AccountsService;
    this.NotifyService = NotifyService;
    this.WeatherService = WeatherService;

    this.view = '';
    this.User = {};
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
    //res.id_token
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
