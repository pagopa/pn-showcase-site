import fs from 'fs'
import { join } from 'path'
import { LangCode, I18n } from '../model/'

/**
 * getI18n()
 * @params: lang (required), namespaces (required)
 * @returns: Array of object(s)
 */
export const getI18n = (lang: LangCode, namespaces: Array<string>): I18n => {
  const i18nDirectory = join(process.cwd(), `/public/locales/${lang}`);
  const i18nFiles = fs.readdirSync(i18nDirectory);
  const i18nContent: I18n = {};
  // read files
  // common.json file must be always read because it contains the localization of the footer
  const fullNamespaces = namespaces;
  if (!fullNamespaces.includes('common')) {
    fullNamespaces.unshift('common');
  }
  for (const namespace of fullNamespaces) {
    const i18nSlug = `${namespace}.json`;
    const i18nPath = join(i18nDirectory, i18nSlug);


    if (i18nFiles.includes(i18nSlug)) {
      i18nContent[namespace] = JSON.parse(fs.readFileSync(i18nPath, 'utf8'));
    }
  }

  return i18nContent;
}