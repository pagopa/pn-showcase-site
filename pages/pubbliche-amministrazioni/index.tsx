import type { NextPage } from "next";
import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";

import { UserType } from "../../model";
import PageHead from "../../src/components/PageHead";
import {
  getHeroData,
  getInfoblockData,
  getShowcaseData,
  getWalkthroughData,
} from "../../api";
import { StripeLinkEnti } from "api/data/it/PA";

const USER_TYPE = UserType.PA;

const EntiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Enti"
      description="Pagina per gli enti e le pubbliche amministrazioni"
    />

    <main>
      <Hero {...getHeroData(USER_TYPE)} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")}></Infoblock>
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")}></Infoblock>
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")}></Infoblock>
      <Showcase {...getShowcaseData(USER_TYPE, "showcase 1")} />
      <div id="lightWalkthrough"><Walkthrough {...getWalkthroughData(USER_TYPE)} /></div>  
      {/* Carlotta Dimatteo - workaround per gestire un anchor interno alla pagina richiesto dal team di comunicazione il 16/02/2023  */}
      <div id="start-integration">
        <></>
      </div>
      {/* <StripeLinkEnti></StripeLinkEnti> */}
      <div id="darkInfoblock"><Infoblock {...getInfoblockData(USER_TYPE, "infoblock 4")}></Infoblock></div>
    </main>
  </>
);

export default EntiPage;
