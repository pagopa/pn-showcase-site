import type { NextPage } from "next";

import { Infoblock, Hero } from "@pagopa/mui-italia";

import {
  getHeroData,
  getInfoblockData,
} from "api";
import { UserType } from "model";
import PageHead from "src/components/PageHead";

const USER_TYPE = UserType.PH;

const IndexPage: NextPage = () => (
  <>
    <PageHead title="SEND - Servizio Notifiche Digitali" description="SeND è la piattaforma che rende più veloce, semplice e sicuro l'invio e la ricezione delle comunicazioni a valore legale" />

    <main>
      <Hero {...getHeroData(USER_TYPE)} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")} />
    </main>
  </>
);

export default IndexPage;