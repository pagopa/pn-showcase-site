import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { I18n, LangCode } from "../model";
import { DEFAULT_LANG, langCodes, LS_LANG_PROP_NAME } from "@utils/constants";
import { useRouter } from "next/router";

interface ILangContext {
  lang: LangCode;
  changeLanguage: (lang: LangCode) => void;
  translations: I18n;
}

const LangContext = createContext<ILangContext>({
  lang: DEFAULT_LANG,
  changeLanguage: (lang: LangCode) => {},
  translations: {}
});

interface Props {
  children: ReactNode;
  lang: LangCode;
  translations: I18n;
}

export const LangProvider: React.FC<Props> = ({ children, lang =  DEFAULT_LANG, translations}) => {
  const [selectedLang, setSelectedLang] = useState<LangCode>(lang);
  const router = useRouter();
  const { pathname, query } = router;

  const changeLanguageHandler = useCallback((newLang: LangCode) => {
    sessionStorage.setItem(LS_LANG_PROP_NAME, newLang);
    setSelectedLang(() => newLang);
    // redirect to page
    router.replace({ pathname, query: {lang: newLang} });
  }, [pathname, query]);

  // Sync context with router
  useEffect(() => {
    if (query.lang && langCodes.includes(query.lang as LangCode) && lang !== query.lang) {
      setSelectedLang(query.lang  as LangCode);
      sessionStorage.setItem(LS_LANG_PROP_NAME, query.lang as string);
    }
  }, [query.lang, lang]);

  return (
    <LangContext.Provider
      value={{
        lang: selectedLang,
        changeLanguage: changeLanguageHandler,
        translations
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;
