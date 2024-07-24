import { useContext } from "react";

import {
  HeroProps,
  HorizontalNavProps,
  InfoblockProps,
  ShowcaseProps,
  WalkthroughProps,
} from "@pagopa/mui-italia";

import {
  IAppData,
  ITabsProps,
  UserType,
  IFaqData,
  IHeadingTitleProps,
} from "../model";

import { itAppData } from "./data/it";
import { itFaqData } from "./data/faq-it";
import { perfezionamentoData } from "./data/perfezionamento";
import { assistenzaData } from "./data/assistenza";
import LangContext from "../context/lang-context";

export const getAppData = (): IAppData => {
  const lang = useContext(LangContext);

  switch (lang.lang) {
    case "it":
      return itAppData;
    default:
      return itAppData;
  }
};

export const getHeroData = (userType: UserType = UserType.PA): HeroProps =>
  getAppData()[userType].hero;

export const getAllInfoblocksData = (
  userType: UserType = UserType.PA
): Array<InfoblockProps> =>
  getAppData()[userType].infoblocks.map((item) => item.data);

export const getInfoblockData = (
  userType: UserType = UserType.PA,
  name: string = ""
): InfoblockProps => {
  const infoblock = getAppData()[userType].infoblocks.filter(
    (item) => item.name === name
  )[0];
  return infoblock.data;
};

export const getAllShowcasesData = (
  userType: UserType = UserType.PA
): Array<ShowcaseProps> =>
  getAppData()[userType].showcases.map((item) => item.data);

export const getShowcaseData = (
  userType: UserType = UserType.PA,
  name: string = ""
): ShowcaseProps => {
  const infoblock = getAppData()[userType].showcases.filter(
    (item) => item.name === name
  )[0];
  return infoblock.data;
};

export const getWalkthroughData = (
  userType: UserType = UserType.PA
): WalkthroughProps => getAppData()[userType].walkthrough;

export const getHorizontalNavData = (
  userType: UserType = UserType.PA
): HorizontalNavProps | undefined => getAppData()[userType].horizontalNav;

export const getFaqData = (): IFaqData => itFaqData;

export const getCommonHeadingTitleData = (name: string): IHeadingTitleProps => {
  const headingTitleData = perfezionamentoData.headingTitles.filter(
    (f) => f.name === name
  )[0];
  return headingTitleData.data;
};

export const getCommonTabsData = (name: string): ITabsProps => {
  const tabsData = perfezionamentoData.tabs.filter((f) => f.name === name)[0];
  return tabsData.data;
};

export const getCommonInfoblockData = (name: string): InfoblockProps => {
  const infoblockData = perfezionamentoData.infoblocks.filter(
    (f) => f.name === name
  )[0];
  return infoblockData.data;
};

export const getAssistenzaHeadingTitleData = (
  name: string
): IHeadingTitleProps => {
  const headingTitleData = assistenzaData.headingTitles.filter(
    (f) => f.name === name
  )[0];
  return headingTitleData.data;
};

export const getAssistenzaTabsData = (name: string): ITabsProps => {
  const tabsData = assistenzaData.tabs.filter((f) => f.name === name)[0];
  return tabsData.data;
};

export const getAssistenzaContentBlockData = (name: string): any => {
  const contentBlockData = assistenzaData.contentBlocks.filter(
    (f) => f.name === name
  )[0];
  return contentBlockData ? contentBlockData.data : null;
};
