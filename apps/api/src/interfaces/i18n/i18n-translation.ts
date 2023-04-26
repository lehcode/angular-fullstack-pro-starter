export interface I18nTranslationInterface {
  lang: string;
  ns: string;
  key: string;
  modifiedDate: Date | null;
  i18n: Map<string, string>;
}
