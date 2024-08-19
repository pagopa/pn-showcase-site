import type { GetStaticPaths, NextPage } from "next";

import { LangCode } from "../../model";
import PageHead from "../../components/PageHead";
import { getI18n } from "../../api/i18n";
import { langCodes } from "@utils/constants";
import { useTranslation } from "src/hook/useTranslation";

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
  const translations = getI18n(params.lang, ["common", "homepage"]);

  return { props: { translations, lang: params.lang } };
}

const IndexPage: NextPage = () => {
  const { t } = useTranslation(["common", "homepage"]);

  return (
    <PageHead
      title={t("title", { ns: "homepage" })}
      description={t("description", { ns: "homepage" })}
    />
  );
};

export default IndexPage;
