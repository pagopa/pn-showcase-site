import { useContext } from "react";
import LangContext from "src/context/lang-context";
import { I18n } from "src/model";

export const useTranslation = (namespaces: Array<string>) => {
  const {translations} = useContext(LangContext);
  // filter by namespaces requested
  const i18nScoped = Object.keys(translations ?? {})
    .filter(key => namespaces.includes(key))
    .reduce((obj, key) => {
      obj[key] = translations[key];
      return obj;
    }, {} as I18n);

  const t = (key: string, options?: {ns: string}) => {
    const kArray = key.split('.')

    // Parsing possibly nested object
    let res: I18n | string = (options?.ns ? i18nScoped[options.ns] : i18nScoped[namespaces[0]]) ?? {};

    for(const k of kArray) {
      if (typeof res === 'string') {
        break;
      }
      res = res[k];
      if (!res) {
        break;
      }
    }

    return typeof res === 'string' ? res : key
  }

  return { t }
}