import { IAppData } from "model";

import {
  paHero,
  paHorizontalNav,
  paInfoBlocks,
  paShowcases,
  paWalkthrough,
} from "./sl/PA";
import {
  pfHero,
  pfHorizontalNav,
  pfInfoBlocks,
  pfShowcases,
  pfWalkthrough,
} from "./sl/PF";
import {
  assistanceLink,
  companyLegalInfo,
  navigation,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
  productJson,
} from "./sl/common";
import { phHero, phInfoBlocks, phHorizontalNav } from "./it/PH";

/** Application Data Mock */
export const slAppData: IAppData = {
  common: {
    navigation,
    alert:
      "Platforma ne deluje. Trenutno poteka preizkus samo nekaterih funkcij, opisanih na tej strani, do katerih lahko dostopa izključno omejeno število uporabnikov, ki bodo prejemniki obvestil, ki jih pošiljajo ustanove, vključene v pilotni projekt.",
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
