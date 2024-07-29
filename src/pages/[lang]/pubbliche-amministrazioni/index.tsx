import type { GetStaticPaths, NextPage } from "next";
import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";

import { LangCode, UserType } from "../../../model";
import PageHead from "../../../components/PageHead";
import {
  getHeroData,
  getInfoblockData,
  getShowcaseData,
  getWalkthroughData,
} from "../../../api";
import { StripeLinkEnti, DarkInfoblockEnti } from "../../../api/data/it/PA";
import { langCodes } from "@utils/constants";
import { getI18n } from "../../../api/i18n";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  }
}

export async function getStaticProps({params}: {params: {lang: LangCode}}) {
  const translations = getI18n(params.lang, ['common'])

  return { props: {translations, lang: params.lang} }
}

const USER_TYPE = UserType.PA;

const EntiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Servizio Notifiche Digitali | Per gli enti"
      description="Scopri come aderire a SEND per rendere il processo di notificazione del tuo ente più semplice, sicuro ed efficiente"
    />

    <Hero {...getHeroData(USER_TYPE)} />
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")}></Infoblock>
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")}></Infoblock>
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")}></Infoblock>
    <div className="showcasePadding"><Showcase {...getShowcaseData(USER_TYPE, "showcase 1")} /></div>
    <div className="lightWalkthrough"><Walkthrough {...getWalkthroughData(USER_TYPE)} /></div>
    <StripeLinkEnti></StripeLinkEnti>
    <DarkInfoblockEnti></DarkInfoblockEnti>
  </>
);

export default EntiPage;
