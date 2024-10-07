import { LangCode } from "../model";
import { DEFAULT_LANG, langCodes, LS_LANG_PROP_NAME } from "./constants";

const isLocale = (str: string): str is LangCode =>
    langCodes.includes(str as LangCode)
  
export const getInitialLocale = (): LangCode => {
    // first get lang from session storage
    const sessionLang = sessionStorage.getItem(LS_LANG_PROP_NAME);
    if (sessionLang) {
      return sessionLang as LangCode;
    }
    // if undefined get lang from browser
    // or if undefined set lang equal to the default one
    const [browserSetting] = navigator.language.split('-')
    return isLocale(browserSetting) ? browserSetting : DEFAULT_LANG
}
  