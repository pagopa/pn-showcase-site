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
import { StripeLinkEnti, DarkInfoblockEnti } from "api/data/it/PA";

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
      <div className="lightWalkthrough"><Walkthrough {...getWalkthroughData(USER_TYPE)} /></div>  
      <StripeLinkEnti></StripeLinkEnti>
      <DarkInfoblockEnti></DarkInfoblockEnti>
    </main>
  </>
);

export default EntiPage;
