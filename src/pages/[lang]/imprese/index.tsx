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
import { langCodes } from "@utils/constants";
import { getI18n } from "../../../api/i18n";

const USER_TYPE = UserType.PI;

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

const ImpresePage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Servizio Notifiche Digitali | Per le imprese"
      description="Leggi, paga e archivia le comunicazioni a valore legale inviate alla tua impresa in un unico spazio accessibile anche dai tuoi collaboratori"
    />
    <Hero {...getHeroData(USER_TYPE)} />
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")}></Infoblock>
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")}></Infoblock>
    <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")}></Infoblock> 
    <div className="showcasePadding"><Showcase {...getShowcaseData(USER_TYPE, "showcase 1")} /></div>
    <div className="light"><Walkthrough {...getWalkthroughData(USER_TYPE)} /></div> 
    {/* <CustomInfoblockImprese></CustomInfoblockImprese> */}
  </>
);

export default ImpresePage;
