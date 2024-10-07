import { LangCode } from "../model";
import { langCodes } from "./constants";
import { Url } from "next/dist/shared/lib/router/router";

interface TransitionOptions {
    scroll?: boolean;
    shallow?: boolean;
    locale?: string | false;
}

export const redirectToInternalPage = (
    push: (url: Url, as?: Url, options?: TransitionOptions) => Promise<boolean>,
    page: string,
    lang: LangCode
) => {
    if (langCodes.includes(lang)) {
      const separator = page.startsWith("/") ? "" : "/";
      push(`/${lang}${separator}${page}`);
    }
  };

export const safeInternalPage = (lang: LangCode, page?: string): string => {
  if (!page) {
    return '';
  }
  if (langCodes.includes(lang)) {
    return `/${lang}${page}`;
  }
  return '';
};