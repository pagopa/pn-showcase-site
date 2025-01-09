import type { GetStaticPaths, NextPage } from "next";

import { Box } from "@mui/material";
import { langCodes } from "@utils/constants";

import PageHead from "../../../../components/PageHead";
import { getI18n } from "../../../../api/i18n";
import { LangCode } from "../../../../model";
import DocsCards from "../../../../components/Enti/Documenti/DocsCards";
import InDepthCard from "../../../../components/Enti/Documenti/InDepthCard";
import StripeLink from "../../../../components/Enti/Documenti/StripeLink";
import { useTranslation } from "../../../../hook/useTranslation";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: {
  params: { lang: LangCode };
}) {
  const translations = getI18n(params.lang, ["common", "documenti"]);

  return { props: { translations, lang: params.lang } };
}

const DocumentiPage: NextPage = () => {
  const { t } = useTranslation(["common", "documenti"]);
  return (
    <>
      <PageHead
        title={t("title", { ns: "documenti" })}
        description={t("description", { ns: "documenti" })}
        route="pubbliche-amministrazioni/documenti"
      />

      <Box className="documenti">
        <Box className="cardsContainerDark">
          <DocsCards />
        </Box>
        <InDepthCard />
        <StripeLink />
      </Box>
    </>
  );
};

export default DocumentiPage;
