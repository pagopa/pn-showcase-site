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
import { CustomInfoblockImprese } from "api/data/it/PI";

const USER_TYPE = UserType.PI;

const ImpresePage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Imprese"
      description="Pagina per le imprese"
    />

    <main>
      <Hero {...getHeroData(USER_TYPE)} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")}></Infoblock>
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")}></Infoblock>
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")}></Infoblock> 
      <Showcase {...getShowcaseData(USER_TYPE, "showcase 1")} />
      <div className="light"><Walkthrough {...getWalkthroughData(USER_TYPE)} /></div> 
      {/* <CustomInfoblockImprese></CustomInfoblockImprese> */}
    </main>
  </>
);

export default ImpresePage;
