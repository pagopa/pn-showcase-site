import { InfoblockProps } from "@pagopa/mui-italia";

import { ITabsProps, IFaqData, IHeadingTitleProps } from "../model";

import { itFaqData } from "./data/faq-it";
import { perfezionamentoData } from "./data/perfezionamento";
import { assistenzaData } from "./data/assistenza";

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
