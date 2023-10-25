import { IAppData } from "model";

import {
  paHero,
  paHorizontalNav,
  paInfoBlocks,
  paShowcases,
  paWalkthrough,
} from "./en/PA";
import {
  pfHero,
  pfHorizontalNav,
  pfInfoBlocks,
  pfShowcases,
  pfWalkthrough,
} from "./en/PF";
import {
  assistanceLink,
  companyLegalInfo,
  navigation,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
  productJson,
} from "./en/common";
import { phHero, phInfoBlocks, phHorizontalNav } from "./it/PH";

/** Application Data Mock */
export const enAppData: IAppData = {
  common: {
    navigation,
    assistance: assistanceLink,
    pagoPALink,
    companyLegalInfo,
    preLoginLinks,
    postLoginLinks,
    productJson,
  },
  pa: {
    hero: paHero,
    infoblocks: paInfoBlocks,
    showcases: paShowcases,
    walkthrough: paWalkthrough,
    horizontalNav: paHorizontalNav,
  },
  pf: {
    hero: pfHero,
    infoblocks: pfInfoBlocks,
    showcases: pfShowcases,
    walkthrough: pfWalkthrough,
    horizontalNav: pfHorizontalNav,
  },
  ph: {
    hero: phHero,
    infoblocks: phInfoBlocks,
    horizontalNav: phHorizontalNav,
    showcases: [],
    walkthrough: { title: '', items: [] }
  },
};
