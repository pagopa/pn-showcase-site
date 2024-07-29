import type { NextPage, GetStaticPaths } from "next";

import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";
import { langCodes } from "@utils/constants";

import {
  getHeroData,
  getInfoblockData,
  getShowcaseData,
  getWalkthroughData,
} from "../../../api";
import { UserType, LangCode } from "../../../model";
import PageHead from "../../../components/PageHead";
import { InfoblockCustomCittadini } from "../../../api/data/it/PF";
import { getI18n } from "../../../api/i18n";

const USER_TYPE = UserType.PF;

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


const CittadiniPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Servizio Notifiche Digitali | Per i cittadini"
      description="Ricevi in tempo reale le comunicazioni a valore legale da parte degli enti. Leggi, gestisci o paga online sulla piattaforma SEND o dall'app IO"
    />

    <Hero {...getHeroData(USER_TYPE)} />
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")} />
    <div className="showcasePadding"><Showcase {...getShowcaseData(USER_TYPE, "showcase 1")} /></div>
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")} />
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 4")} />
    <div className="dark"><InfoblockCustomCittadini></InfoblockCustomCittadini></div>
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 5")} />
    {/* <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 6")} /> */}
    {/* <Showcase {...getShowcaseData(USER_TYPE, "showcase 2")} /> */}
    <Walkthrough {...getWalkthroughData(USER_TYPE)} />
    <div className="dark"><Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")} /></div>
  </>
);

export default CittadiniPage;
