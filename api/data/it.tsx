import { IAppData } from "model";

import {
  paHero,
  paHorizontalNav,
  paInfoBlocks,
  paShowcases,
  paWalkthrough,
} from "./it/PA";
import {
  pfHero,
  pfHorizontalNav,
  pfInfoBlocks,
  pfShowcases,
  pfWalkthrough,
} from "./it/PF";
import {
  pdHero,
  pdHorizontalNav,
  pdInfoBlocks,
  pdShowcases,
  pdWalkthrough,
} from "./it/PD";
import {
  assistanceLink,
  companyLegalInfo,
  navigation,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
  productJson,
} from "./it/common";
import {
  phHero,
  phHorizontalNav,
  phInfoBlocks,
} from "./it/PH";
import {
  piHero,
  piInfoBlocks,
  piShowcases,
  piWalkthrough,
  piHorizontalNav
} from "./it/PI";

/** Application Data Mock */
export const itAppData: IAppData = {
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
  pd: {
    hero: pdHero,
    infoblocks: pdInfoBlocks,
    showcases: pdShowcases,
    walkthrough: pdWalkthrough,
    horizontalNav: pdHorizontalNav,
  },
  ph: {
    hero: phHero,
    infoblocks: phInfoBlocks,
    horizontalNav: phHorizontalNav,
    showcases: [],
    walkthrough: { title: '', items: [] }
  },
  pi: {
    hero: piHero,
    infoblocks: piInfoBlocks,
    showcases: piShowcases,
    walkthrough: piWalkthrough,
    horizontalNav: piHorizontalNav,
  },
};

