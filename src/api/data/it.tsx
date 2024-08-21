import { IAppData } from "../../model";

import {
  paHero,
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
  piHero,
  piInfoBlocks,
  piShowcases,
  piWalkthrough,
  piHorizontalNav
} from "./it/PI";

/** Application Data Mock */
export const itAppData: IAppData = {
  pa: {
    hero: paHero,
    infoblocks: paInfoBlocks,
    showcases: paShowcases,
    walkthrough: paWalkthrough
  },
  pf: {
    hero: pfHero,
    infoblocks: pfInfoBlocks,
    showcases: pfShowcases,
    walkthrough: pfWalkthrough,
    horizontalNav: pfHorizontalNav,
  },
  pi: {
    hero: piHero,
    infoblocks: piInfoBlocks,
    showcases: piShowcases,
    walkthrough: piWalkthrough,
    horizontalNav: piHorizontalNav,
  },
};

