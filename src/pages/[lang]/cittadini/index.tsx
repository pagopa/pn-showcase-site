import type { NextPage, GetStaticPaths } from "next";

import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";
import { IMAGES_PATH, langCodes, PN_PF_URL } from "@utils/constants";

import { LangCode } from "../../../model";
import PageHead from "../../../components/PageHead";
import { getI18n } from "../../../api/i18n";
import { Link, Typography } from "@mui/material";
import { useTranslation } from "src/hook/useTranslation";
import {
  CloudIcon,
  DelegationIcon,
  DocCheckIcon,
  EcologyIcon,
  HourglassIcon,
  NotificationIcon,
  PiggyIcon,
  WalletIcon,
} from "src/api/data/icons";
import InfoblockCustomCittadini from "src/components/InfoblockCustomCittadini";

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
  const translations = getI18n(params.lang, ["common", "cittadini"]);

  return { props: { translations, lang: params.lang } };
}

const CittadiniPage: NextPage = () => {
  const { t } = useTranslation(["common", "cittadini"]);

  const heroCta = !!PN_PF_URL
    ? {
        label: t("hero.cta", { ns: "cittadini" }),
        title: t("hero.cta", { ns: "cittadini" }),
        onClick: function onClick() {
          window.open(PN_PF_URL, "_self");
        },
      }
    : undefined;

  return (
    <>
      <PageHead
        title={t("title", { ns: "cittadini" })}
        description={t("description", { ns: "cittadini" })}
      />

      <Hero
        type="image"
        title={t("hero.title", { ns: "cittadini" })}
        subtitle={
          <Typography
            component="p"
            sx={{
              color: "primary.contrastText",
            }}
          >
            {t("hero.subtitle", { ns: "cittadini" })}
          </Typography>
        }
        ctaSecondary={heroCta}
        image={`${IMAGES_PATH}/hero-cittadini-foreground.png`}
        altText={t("hero.altText", { ns: "cittadini" })}
        background={`${IMAGES_PATH}/hero-cittadini-background.png`}
      />
      <Infoblock
        title={t("infoblock_1.title", { ns: "cittadini" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_1.description_1", { ns: "cittadini" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_1.description_2", { ns: "cittadini" })}
            </Typography>
          </>
        }
        inverse={false}
        image={`${IMAGES_PATH}/pf-infoblock-4.png`}
        altText={t("infoblock_1.altText", { ns: "cittadini" })}
        imageShadow={false}
      />
      <div className="showcasePadding">
        <Showcase
          title={t("showcase.title", { ns: "cittadini" })}
          items={[
            {
              icon: <PiggyIcon />,
              title: t("showcase.item_1.title", { ns: "cittadini" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_1.subtitle", { ns: "cittadini" })}
                </Typography>
              ),
            },
            {
              icon: <HourglassIcon />,
              title: t("showcase.item_2.title", { ns: "cittadini" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_2.subtitle", { ns: "cittadini" })}
                </Typography>
              ),
            },
            {
              icon: <EcologyIcon />,
              title: t("showcase.item_3.title", { ns: "cittadini" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_3.subtitle", { ns: "cittadini" })}
                </Typography>
              ),
            },
            {
              icon: <CloudIcon />,
              title: t("showcase.item_4.title", { ns: "cittadini" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_4.subtitle", { ns: "cittadini" })}
                </Typography>
              ),
            },
          ]}
        />
      </div>
      <Infoblock
        title={t("infoblock_2.title", { ns: "cittadini" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_2.description_1", { ns: "cittadini" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_2.description_2", { ns: "cittadini" })}
              <Link
                href="/perfezionamento"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {t("infoblock_2.description_3", { ns: "cittadini" })}
              </Link>
              {t("infoblock_2.description_4", { ns: "cittadini" })}
            </Typography>
          </>
        }
        inverse
        image={`${IMAGES_PATH}/pf-infoblock-3.png`}
        aspectRatio="9/16"
        altText={t("infoblock_2.altText", { ns: "cittadini" })}
        imageShadow={false}
      />

      <Infoblock
        title={t("infoblock_4.title", { ns: "cittadini" })}
        content={
          <Typography variant="body2">
            {t("infoblock_4.description", { ns: "cittadini" })}
          </Typography>
        }
        inverse={false}
        image={`${IMAGES_PATH}/pf-infoblock-5.png`}
        aspectRatio="4/3"
        altText={t("infoblock_4.altText", { ns: "cittadini" })}
        imageShadow={false}
      />
      <div className="dark">
        <InfoblockCustomCittadini />
      </div>

      <Infoblock
        title={t("infoblock_5.title", { ns: "cittadini" })}
        content={
          <Typography variant="body2">
            {t("infoblock_5.description", { ns: "cittadini" })}
          </Typography>
        }
        inverse={false}
        image={`${IMAGES_PATH}/pf-infoblock-7.png`}
        aspectRatio="4/3"
        altText={t("infoblock_5.altText", { ns: "cittadini" })}
        imageShadow={false}
      />
      <Walkthrough
        title={t("walkthrough.title", { ns: "cittadini" })}
        items={[
          {
            icon: <NotificationIcon color="primary" />,
            title: t("walkthrough.item_1.title", { ns: "cittadini" }),
            subtitle: (
              <Typography variant="body2">
                {t("walkthrough.item_1.subtitle", { ns: "cittadini" })}
              </Typography>
            ),
          },
          {
            icon: <DocCheckIcon color="primary" />,
            title: t("walkthrough.item_2.title", { ns: "cittadini" }),
            subtitle: (
              <Typography variant="body2">
                {t("walkthrough.item_2.subtitle_1", { ns: "cittadini" })}
                <Link
                  href="/perfezionamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("walkthrough.item_2.subtitle_2", {
                    ns: "cittadini",
                  })}
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {t("walkthrough.item_2.subtitle_2", { ns: "cittadini" })}
                </Link>
                {t("walkthrough.item_2.subtitle_3", { ns: "cittadini" })}
              </Typography>
            ),
          },
          {
            icon: <WalletIcon color="primary" />,
            title: t("walkthrough.item_3.title", { ns: "cittadini" }),
            subtitle: (
              <Typography variant="body2">
                {t("walkthrough.item_3.subtitle", { ns: "cittadini" })}
              </Typography>
            ),
          },
          {
            icon: <DelegationIcon color="primary" />,
            title: t("walkthrough.item_4.title", { ns: "cittadini" }),
            subtitle: (
              <Typography variant="body2">
                {t("walkthrough.item_4.subtitle", { ns: "cittadini" })}
              </Typography>
            ),
          },
        ]}
      />
      <div className="dark">
        <Infoblock
          title={t("infoblock_3.title", { ns: "cittadini" })}
          content={
            <>
              <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
                {t("infoblock_3.description_2", { ns: "cittadini" })}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "primary.contrastText" }}
              >
                {t("infoblock_3.description_3", { ns: "cittadini" })}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "primary.contrastText" }}
              >
                {t("infoblock_3.description_1", { ns: "cittadini" })}
              </Typography>
            </>
          }
          inverse={false}
          image={`${IMAGES_PATH}/pa-infoblock-4.png`}
          aspectRatio="9/16"
          altText={t("infoblock_3.altText", { ns: "cittadini" })}
          imageShadow={false}
        />
      </div>
    </>
  );
};

export default CittadiniPage;
