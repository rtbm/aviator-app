class articlesDetailController {
  constructor(config, $state, $topbarService, $articlesService, $timersService,
              $articlesDialogService, $articlesNotifyService) {
    'ngInject';
    this.config = config;
    this.$state = $state;
    this.$topbarService = $topbarService;
    this.$articlesService = $articlesService;
    this.$timersService = $timersService;
    this.$articlesDialogService = $articlesDialogService;
    this.$articlesNotifyService = $articlesNotifyService;

    this.onInit();
  }

  onInit() {
    const articleId = this.$state.params.articleId;

    this.$articlesService.findOneById(articleId).then(article => {
      this.Article = article;
      this.$topbarService.setTitle(this.Article.name);
    });

    this.$timersService.findAll({ articleId }).then(timers => {
      this.timers = timers;
    });
  }

  removeAction(Article) {
    this.$articlesDialogService.removeConfirm(Article).then(result => {
      if (result === 'OK') {
        this.$articlesService.remove(Article).then(() => {
          this.$articlesNotifyService.removeNotify(Article);
          this.$state.go('app.articlesList');
        });
      }
    });
  }

  startTimerAction(Article) {
    this.$timersService.startTimerAction(Article).then(timer => {
      this.timers.push(timer);
    });
  }

  stopTimerAction(Article) {
    this.$timersService.stopTimerAction(Article).then(timer => {
      for (let n = this.timers.length - 1; n !== -1; n--) {
        if (this.timers[n]._id === timer._id) {
          this.timers[n] = timer;
          break;
        }
      }
    });
  }
}

export { articlesDetailController };
