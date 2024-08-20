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

  const onReadClickEnti = () => {
    push(`/${lang}/pubbliche-amministrazioni`);
  };

  const onReadClickCittadini = () => {
    push(`/${lang}/cittadini`);
  };

  const onReadClickCittadiniSecondary = () => {
    window.open(PN_PF_URL, "_self");
  };

  const onReadClickImprese = () => {
    push(`/${lang}/imprese`);
  };

  const onReadClickImpreseSecondary = () => {
    window.open(PN_PG_URL, "_self");
  };

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
        overline={t("infoblock.citizens.overline", { ns: "homepage" })}
        title={t("infoblock.citizens.title", { ns: "homepage" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock.citizens.description_1", { ns: "homepage" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock.citizens.description_2", { ns: "homepage" })}
            </Typography>
          </>
        }
        ctaPrimary={
          "/cittadini"
            ? {
                label: t("infoblock.citizens.cta", { ns: "homepage" }),
                title: t("infoblock.citizens.cta", { ns: "homepage" }),
                onClick: onReadClickCittadini,
              }
            : undefined
        }
        ctaSecondary={
          PN_PF_URL
            ? {
                label: t("infoblock.citizens.cta_secondary", {
                  ns: "homepage",
                }),
                title: t("infoblock.citizens.cta_secondary", {
                  ns: "homepage",
                }),
                onClick: onReadClickCittadiniSecondary,
              }
            : undefined
        }
        inverse
        image={`${IMAGES_PATH}/ph-infoblock-2.png`}
        altText={t("infoblock.citizens.altText", { ns: "homepage" })}
        aspectRatio="9/16"
        imageShadow={false}
      />

      <Infoblock
        overline={t("infoblock.companies.overline", { ns: "homepage" })}
        title={t("infoblock.companies.title", { ns: "homepage" })}
        content={
          <Typography variant="body2">
            {t("infoblock.companies.description", { ns: "homepage" })}
          </Typography>
        }
        ctaPrimary={
          "/imprese"
            ? {
                label: t("infoblock.companies.cta", { ns: "homepage" }),
                title: t("infoblock.companies.cta", { ns: "homepage" }),
                onClick: onReadClickImprese,
              }
            : undefined
        }
        ctaSecondary={
          PN_PG_URL
            ? {
                label: t("infoblock.companies.cta_secondary", {
                  ns: "homepage",
                }),
                title: t("infoblock.companies.cta_secondary", {
                  ns: "homepage",
                }),
                onClick: onReadClickImpreseSecondary,
              }
            : undefined
        }
        inverse={false}
        image={`${IMAGES_PATH}/ph-infoblock-3.png`}
        altText={t("infoblock.companies.altText", { ns: "homepage" })}
        imageShadow={false}
      />

      <Infoblock
        overline={t("infoblock.entities.overline", { ns: "homepage" })}
        title={t("infoblock.entities.title", { ns: "homepage" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock.entities.description_1", { ns: "homepage" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock.entities.description_2", { ns: "homepage" })}
            </Typography>
          </>
        }
        ctaPrimary={
          "/pubbliche-amministrazioni"
            ? {
                label: t("infoblock.entities.cta", { ns: "homepage" }),
                title: t("infoblock.entities.cta", { ns: "homepage" }),
                onClick: onReadClickEnti,
              }
            : undefined
        }
        inverse
        image={`${IMAGES_PATH}/ph-infoblock-1.png`}
        altText={t("infoblock.entities.altText", { ns: "homepage" })}
        imageShadow={false}
      />
    </>
  );
};

export default IndexPage;
