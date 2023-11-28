import type { NextPage } from "next";

import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";

import {
  getHeroData,
  getInfoblockData,
  getShowcaseData,
  getWalkthroughData,
} from "api";
import { UserType } from "model";
import PageHead from "src/components/PageHead";
import { InfoblockCustomCittadini } from "api/data/it/PF";

const USER_TYPE = UserType.PF;


const CittadiniPage: NextPage = () => (
  <>
    <PageHead title="SEND - Cittadini" description="Pagina dei cittadini" />

    <main>
      <Hero {...getHeroData(USER_TYPE)} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")} />
      <Showcase {...getShowcaseData(USER_TYPE, "showcase 1")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 4")} />
      <div className="dark"><InfoblockCustomCittadini></InfoblockCustomCittadini></div>
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 5")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 6")} />
      {/* <Showcase {...getShowcaseData(USER_TYPE, "showcase 2")} /> */}
      <Walkthrough {...getWalkthroughData(USER_TYPE)} />
      <div className="dark"><Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")} /></div>
    </main>
  </>
);

export default CittadiniPage;
