class articlesListController {
  constructor(config, $articlesService, $timersService, $articlesDialogService,
              $articlesNotifyService, $articlesNfcService) {
    'ngInject';
    this.config = config;
    this.$articlesService = $articlesService;
    this.$timersService = $timersService;
    this.$articlesDialogService = $articlesDialogService;
    this.$articlesNotifyService = $articlesNotifyService;
    this.$articlesNfcService = $articlesNfcService;

    this.onInit();
  }

  onInit() {
    this.$articlesService.findAll().then(articles => {
      this.articles = articles;
    });

    this.$articlesNfcService.isReady.promise.then(() => {
      const reader = this.$articlesNfcService.setRead();
      reader.then(null, null, payload => console.log(this.$articlesNfcService.mode));
    });
  }

  removeAction(Article) {
    this.$articlesDialogService.removeConfirm(Article).then(result => {
      if (result === 'OK') {
        this.$articlesService.remove(Article).then(article => {
          for (let i = this.articles.length - 1; i !== -1; i--) {
            if (this.articles[i]._id === article._id) {
              this.articles.splice(i, 1);
              break;
            }
          }
          this.$articlesNotifyService.removeNotify(Article);
        });
      }
    });
  }

  startTimerAction(Article) {
    this.$timersService.startTimerAction(Article);
  }

  stopTimerAction(Article) {
    this.$timersService.stopTimerAction(Article);
  }
}

export { articlesListController };
