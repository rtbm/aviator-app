class accountsController {
  constructor($state, $weatherService, $accountsService) {
    'ngInject';
    this.$state = $state;
    this.$weatherService = $weatherService;
    this.$accountsService = $accountsService;

    this.view = '';
  }

  setViewAction(name) {
    this.view = name;
    this.User = {};
  }

  signinAction(User) {
    this.$accountsService.signin(User).then(
      () => this.handleResponse()
    );
  }

  signupAction(User) {
    this.$accountsService.signup(User).then(
      () => this.handleResponse()
    );
  }

  handleResponse() {
    this.$state.go('app.articlesList');
  }
}

export { accountsController };
