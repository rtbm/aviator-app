function GlobalsService($translate) {
  'ngInject';
  const activeLanguage = $translate.use()
    || $translate.storage().get($translate.storageKey())
    || $translate.preferredLanguage();

  return {
    activeLanguage
  };
}

export { GlobalsService };
