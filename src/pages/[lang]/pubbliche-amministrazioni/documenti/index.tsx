import type { GetStaticPaths, NextPage } from "next";

import PageHead from "../../../../components/PageHead";

import { DocsCards, InDepthCard, StripeLink } from "../../../../api/data/it/PD";
import { Box } from "@mui/material";
import { langCodes } from "@utils/constants";
import { getI18n } from "../../../../api/i18n";
import { LangCode } from "../../../../model";

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

const DocumentiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Servizio Notifiche Digitali | Documenti per gli enti"
      description="Come aderire a SEND: la documentazione necessaria per aderire al Servizio Notifiche Digitali come ente mittente"
    />

    <Box className="documenti">
      <Box className="cardsContainerDark"><DocsCards></DocsCards></Box>
      <InDepthCard></InDepthCard>
      <StripeLink></StripeLink>
    </Box>
  </>
);

export default DocumentiPage;
