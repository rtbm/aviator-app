class articlesController {
  constructor($q, $translate, $interval, $dialogService, $articlesService, $timersService,
              $geocodingService, $weatherService, $errorService) {
    'ngInject';
    this.$q = $q;
    this.$translate = $translate;
    this.$interval = $interval;
    this.$dialogService = $dialogService;
    this.$articlesService = $articlesService;
    this.$timersService = $timersService;
    this.$geocodingService = $geocodingService;
    this.$weatherService = $weatherService;
    this.$errorService = $errorService;

    this._onInit();
  }

  _onInit() {
    this.updateCurrDate();
    this.interval = this.$interval(() => this.updateCurrDate(), 1000);
  }

  updateCurrDate() {
    this.currDate = new Date();
  }

  createAction(Article) {
    this.$articlesService.save(Article).$promise.then(
      res => this.handleCreateResponse(res),
      err => this.$errorService.handleError(err)
    );
  }

  updateAction(Article) {
    this.$articlesService.update(Article).$promise.then(
      res => this.handleUpdateResponse(res),
      err => this.$errorService.handleError(err)
    );
  }

  removeAction(Article) {
    this.$translate(['ARTICLES.DIALOG_REMOVE', 'CORE.OK', 'CORE.CANCEL'], { name: Article.name })
      .then(translations => this.removeConfirmationDialog(translations)
        .then(response => {
          if (response === 'OK') {
            this.remove(Article);
          }
        })
      );
  }

  removeConfirmationDialog(translations) {
    return this.$dialogService.show({
      text: translations['ARTICLES.DIALOG_REMOVE'],
      buttons: [{
        text: translations['CORE.OK'],
        response: 'OK',
      }, {
        text: translations['CORE.CANCEL'],
        response: 'CANCEL',
      }],
    });
  }

  remove(Article) {
    this.$articlesService.remove({ articleId: Article._id }).$promise.then(
      res => this.handleRemoveResponse(res),
      err => this.$errorService.handleError(err)
    );
  }

  startTimerAction(Article) {
    const article = Article;

    const getData = this.$q.all([
      this.$geocodingService.getCurrentLocation(),
      this.$weatherService.getWeather(),
    ]);

    getData.then(
      results => {
        const location = results[0].data;
        const weather = results[1].data;

        const req = this.$timersService.save({ articleId: Article._id }, {
          location,
          weather,
        });

        req.$promise.then(
          timer => {
            article.timer = timer;
            article.timer.createdAt = new Date(article.timer.createdAt);
            this.updateCurrDate();

            if (!!this.timers) {
              this.timers.push(article.timer);
            }
          },
          err => this.$errorService.handleError(err)
        );
      }
    );
  }

  stopTimerAction(Article) {
    const article = Article;

    this.$timersService.update({ _id: Article.timer._id }).$promise.then(
      timer => {
        article.timer = null;

        if (!!this.timers) {
          for (let n = this.timers.length - 1; n !== -1; n--) {
            if (this.timers[n]._id === timer._id) {
              this.timers[n] = timer;
              break;
            }
          }
        }
      },
      err => this.$errorService.handleError(err)
    );
  }
}

export { articlesController };
