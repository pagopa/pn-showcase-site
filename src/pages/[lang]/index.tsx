import type { GetStaticPaths, NextPage } from "next";

import { Infoblock, Hero } from "@pagopa/mui-italia";
import { Typography } from "@mui/material";
import { IMAGES_PATH, langCodes, PN_PF_URL, PN_PG_URL } from "@utils/constants";

import { LangCode } from "../../model";
import PageHead from "../../components/PageHead";
import { getI18n } from "../../api/i18n";
import { useTranslation } from "src/hook/useTranslation";
import { useRouter } from "next/router";
import { useContext } from "react";
import LangContext from "src/context/lang-context";
import { redirectToInternalPage } from "@utils/navigation";

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
  const { push } = useRouter();
  const { lang } = useContext(LangContext);

  // const redirectToInternalPage = (page: string) => {
  //   if (langCodes.includes(lang)) {
  //     push(`/${lang}/${page}`);
  //   }
  // };

  return (
    <>
      <PageHead
        title={t("title", { ns: "homepage" })}
        description={t("description", { ns: "homepage" })}
      />
      <Hero
        type="image"
        title={t("hero.title", { ns: "homepage" })}
        subtitle={
          <Typography
            component="p"
            sx={{
              color: "primary.contrastText",
            }}
          >
            {t("hero.subtitle", { ns: "homepage" })}
          </Typography>
        }
        image={`${IMAGES_PATH}/ph-hero-foreground.png`}
        altText={t("hero.altText", { ns: "homepage" })}
        background={`${IMAGES_PATH}/hero-home-background.png`}
      />
      <Infoblock
        overline={t("infoblock.cittadini.overline", { ns: "homepage" })}
        title={t("infoblock.cittadini.title", { ns: "homepage" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock.cittadini.description_1", { ns: "homepage" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock.cittadini.description_2", { ns: "homepage" })}
            </Typography>
          </>
        }
        ctaPrimary={
          "/cittadini"
            ? {
                label: t("infoblock.cittadini.cta", { ns: "homepage" }),
                title: t("infoblock.cittadini.cta", { ns: "homepage" }),
                onClick: () => redirectToInternalPage(push, "cittadini", lang),
              }
            : undefined
        }
        ctaSecondary={
          PN_PF_URL
            ? {
                label: t("infoblock.cittadini.cta_secondary", {
                  ns: "homepage",
                }),
                title: t("infoblock.cittadini.cta_secondary", {
                  ns: "homepage",
                }),
                onClick: () => window.open(PN_PF_URL, "_self"),
              }
            : undefined
        }
        inverse
        image={`${IMAGES_PATH}/ph-infoblock-2.png`}
        altText={t("infoblock.cittadini.altText", { ns: "homepage" })}
        aspectRatio="9/16"
        imageShadow={false}
      />

      <Infoblock
        overline={t("infoblock.aziende.overline", { ns: "homepage" })}
        title={t("infoblock.aziende.title", { ns: "homepage" })}
        content={
          <Typography variant="body2">
            {t("infoblock.aziende.description", { ns: "homepage" })}
          </Typography>
        }
        ctaPrimary={
          "/imprese"
            ? {
                label: t("infoblock.aziende.cta", { ns: "homepage" }),
                title: t("infoblock.aziende.cta", { ns: "homepage" }),
                onClick: () => redirectToInternalPage(push, "imprese", lang),
              }
            : undefined
        }
        ctaSecondary={
          PN_PG_URL
            ? {
                label: t("infoblock.aziende.cta_secondary", { ns: "homepage" }),
                title: t("infoblock.aziende.cta_secondary", { ns: "homepage" }),
                onClick: () => window.open(PN_PG_URL, "_self"),
              }
            : undefined
        }
        inverse={false}
        image={`${IMAGES_PATH}/ph-infoblock-3.png`}
        altText={t("infoblock.aziende.altText", { ns: "homepage" })}
        imageShadow={false}
      />

      <Infoblock
        overline={t("infoblock.enti.overline", { ns: "homepage" })}
        title={t("infoblock.enti.title", { ns: "homepage" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock.enti.description_1", { ns: "homepage" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock.enti.description_2", { ns: "homepage" })}
            </Typography>
          </>
        }
        ctaPrimary={
          "/pubbliche-amministrazioni"
            ? {
                label: t("infoblock.enti.cta", { ns: "homepage" }),
                title: t("infoblock.enti.cta", { ns: "homepage" }),
                onClick: () =>
                  redirectToInternalPage(
                    push,
                    "pubbliche-amministrazioni",
                    lang
                  ),
              }
            : undefined
        }
        inverse
        image={`${IMAGES_PATH}/ph-infoblock-1.png`}
        altText={t("infoblock.enti.altText", { ns: "homepage" })}
        imageShadow={false}
      />
    </>
  );
};

export default IndexPage;
