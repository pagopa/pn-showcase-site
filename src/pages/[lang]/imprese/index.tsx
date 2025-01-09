import type { GetStaticPaths, NextPage } from "next";
import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";

import { LangCode } from "../../../model";
import PageHead from "../../../components/PageHead";
import { IMAGES_PATH, langCodes, PN_PG_URL } from "@utils/constants";
import { getI18n } from "../../../api/i18n";
import { useTranslation } from "../../../hook/useTranslation";
import { Typography } from "@mui/material";
import {
  DocCheckIcon,
  HistoryIcon,
  NotificationIcon,
  WalletIcon,
} from "../../../api/data/icons";
import { AutoAwesome, EuroSymbol, SupervisorAccount, Timer } from "@mui/icons-material";

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
  const translations = getI18n(params.lang, ["common", "imprese"]);

  return { props: { translations, lang: params.lang } };
}

const ImpresePage: NextPage = () => {
  const { t } = useTranslation(["common", "imprese"]);

  const heroCta = {
    label: t("hero.cta", { ns: "imprese" }),
    title: t("hero.cta", { ns: "imprese" }),
    onClick: function onClick() {
      window.open(PN_PG_URL, "_self");
    },
  };

  const infoblock_2_cta = {
    label: t("infoblock_2.cta", { ns: "imprese" }),
    title: "Leggi le notifiche della tua impresa",
    onClick: function onClick() {
      window.open(PN_PG_URL, "_self");
    },
  };

  return (
    <>
      <PageHead
        title={t("title", { ns: "imprese" })}
        description={t("description", { ns: "imprese" })}
        route="imprese"
      />
      <Hero
        type="image"
        title={t("hero.title", { ns: "imprese" })}
        subtitle={
          <Typography
            component="p"
            sx={{
              color: "primary.contrastText",
            }}
          >
            {t("hero.subtitle", { ns: "imprese" })}
          </Typography>
        }
        inverse={true}
        image={`${IMAGES_PATH}/pi-hero-foreground.png`}
        altText={t("hero.altText", { ns: "imprese" })}
        background={`${IMAGES_PATH}/pi-hero-background.png`}
        ctaSecondary={heroCta}
      />
      <Infoblock
        title={t("infoblock_1.title", { ns: "imprese" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_1.description_1", { ns: "imprese" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_1.description_2", { ns: "imprese" })}
            </Typography>
          </>
        }
        inverse={true}
        image={`${IMAGES_PATH}/pi-infoblock-1.png`}
        altText={t("infoblock_1.altText", { ns: "imprese" })}
        imageShadow={false}
        aspectRatio="9/16"
      />
      <Infoblock
        title={t("infoblock_2.title", { ns: "imprese" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_2.description_1", { ns: "imprese" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_2.description_2", { ns: "imprese" })}
            </Typography>
          </>
        }
        inverse={false}
        image={`${IMAGES_PATH}/pi-infoblock-2.png`}
        altText={t("infoblock_2.altText", { ns: "imprese" })}
        imageShadow={false}
        ctaPrimary={infoblock_2_cta}
      />
      <Infoblock
        title={t("infoblock_3.title", { ns: "imprese" })}
        content={
          <Typography variant="body2">
            {t("infoblock_3.description", { ns: "imprese" })}
          </Typography>
        }
        inverse={true}
        image={`${IMAGES_PATH}/pi-infoblock-3.png`}
        altText={t("infoblock_3.altText", { ns: "imprese" })}
        imageShadow={false}
      />
      <div className="showcasePadding">
        <Showcase
          title={t("showcase.title", { ns: "imprese" })}
          items={[
            {
              icon: <AutoAwesome />,
              title: t("showcase.item_1.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_1.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
            {
              icon: <Timer />,
              title: t("showcase.item_2.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_2.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
            {
              icon: <SupervisorAccount />,
              title: t("showcase.item_3.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_3.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
            {
              icon: <EuroSymbol />,
              title: t("showcase.item_4.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_4.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
          ]}
        />
      </div>
      <div className="light">
        <Walkthrough
          title={t("walkthrough.title", { ns: "imprese" })}
          items={[
            {
              icon: <NotificationIcon color="primary" />,
              title: t("walkthrough.item_1.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_1.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
            {
              icon: <DocCheckIcon color="primary" />,
              title: t("walkthrough.item_2.title", { ns: "imprese" }),
              subtitle: (
                <>
                  <Typography variant="body2">
                    {t("walkthrough.item_2.subtitle_1", { ns: "imprese" })}
                  </Typography>
                  <Typography variant="body2">
                    {t("walkthrough.item_2.subtitle_2", { ns: "imprese" })}
                  </Typography>
                </>
              ),
            },
            {
              icon: <WalletIcon color="primary" />,
              title: t("walkthrough.item_3.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_3.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
            {
              icon: <HistoryIcon color="primary" />,
              title: t("walkthrough.item_4.title", { ns: "imprese" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_4.subtitle", { ns: "imprese" })}
                </Typography>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default ImpresePage;
