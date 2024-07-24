import type { GetStaticPaths, NextPage } from "next";

import { Infoblock, Hero } from "@pagopa/mui-italia";

import {
  getHeroData,
  getInfoblockData,
} from "../../api";
import { LangCode, UserType } from "../../model";
import PageHead from "../../components/PageHead";
import { getI18n } from "../../api/i18n";
import { langCodes } from "@utils/constants";
import { useTranslation } from "src/hook/useTranslation";

const USER_TYPE = UserType.PH;

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

const IndexPage: NextPage = () => {
    const { t } = useTranslation(['common']);

    return (
    <>
      <PageHead title={t('title')} description={t('description')} />
      <Hero {...getHeroData(USER_TYPE)} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 2")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 3")} />
      <Infoblock {...getInfoblockData(USER_TYPE, "infoblock 1")} />
    </>
  );
};

export default IndexPage;