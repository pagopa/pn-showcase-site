import { InfoblockProps } from "@pagopa/mui-italia";

import { ITabsProps, IFaqData, IHeadingTitleProps } from "../model";

import { itFaqData } from "./data/faq-it";
import { perfezionamentoData } from "./data/perfezionamento";

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
