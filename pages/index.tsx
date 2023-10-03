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

const USER_TYPE = UserType.PH;

const IndexPage: NextPage = () => (
  <>
    <PageHead title="SEND - Homepage" description="Pagina home" />

    <main>
      <Hero {...getHeroData(USER_TYPE)} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")} />
    </main>
  </>
);

export default IndexPage;