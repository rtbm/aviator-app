function globalsService($translate) {
  'ngInject';
  const activeLanguage = $translate.use() || $translate.preferredLanguage();

  return {
    activeLanguage,
  };
}

export { globalsService };
