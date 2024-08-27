import type { GetStaticPaths, NextPage } from "next";
import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";
import { Typography } from "@mui/material";
import { IMAGES_PATH, langCodes } from "@utils/constants";

import { LangCode } from "../../../model";
import PageHead from "../../../components/PageHead";
import { getI18n } from "../../../api/i18n";
import { useTranslation } from "../../../hook/useTranslation";
import {
  CheckmarkIcon,
  DeliverIcon,
  EasyIcon,
  FireworksIcon,
  PeopleIcon,
  SendIcon,
  SyncIcon,
  UploadIcon,
} from "../../../api/data/icons";
import StripeLinkEnti from "../../../components/Enti/StripeLinkEnti";
import { DarkInfoblockEnti } from "../../../components/Enti/DarkInfoblockEnti";
import { useContext } from "react";
import LangContext from "../../../context/lang-context";
import { useRouter } from "next/router";
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
  const translations = getI18n(params.lang, ["common", "enti"]);

  return { props: { translations, lang: params.lang } };
}

const EntiPage: NextPage = () => {
  const { t } = useTranslation(["common", "enti"]);
  const { push } = useRouter();
  const { lang } = useContext(LangContext);

  const heroCta = {
    label: t("hero.cta", { ns: "enti" }),
    title: t("hero.cta", { ns: "enti" }),
    onClick: function onClick() {
      redirectToInternalPage(push, "pubbliche-amministrazioni/documenti", lang);
    },
  };

  return (
    <>
      <PageHead
        title={t("title", { ns: "enti" })}
        description={t("description", { ns: "enti" })}
      />

      <Hero
        type="image"
        title={t("hero.title", { ns: "enti" })}
        subtitle={
          <Typography
            component="p"
            sx={{
              color: "primary.contrastText",
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                color: "primary.contrastText",
              }}
            >
              {t("hero.subtitle_2", { ns: "enti" })}
            </Typography>
            {t("hero.subtitle_1", { ns: "enti" })}
          </Typography>
        }
        inverse={false}
        image={`${IMAGES_PATH}/hero-enti-foreground.png`}
        altText={t("hero.altText", { ns: "enti" })}
        background={`${IMAGES_PATH}/hero-enti-background.png`}
        ctaPrimary={heroCta}
      />
      <Infoblock
        title={t("infoblock_1.title", { ns: "enti" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_1.description_1", { ns: "enti" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_1.description_2", { ns: "enti" })}
            </Typography>
          </>
        }
        inverse={false}
        image={`${IMAGES_PATH}/pa-infoblock-5.png`}
        altText={t("infoblock_1.altText", { ns: "enti" })}
        imageShadow={true}
      />
      <Infoblock
        title={t("infoblock_2.title", { ns: "enti" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_2.description_1", { ns: "enti" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_2.description_2", { ns: "enti" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_2.description_3", { ns: "enti" })}
            </Typography>
          </>
        }
        inverse={true}
        image={`${IMAGES_PATH}/pa-infoblock-6.png`}
        altText={t("infoblock_2.altText", { ns: "enti" })}
        imageShadow={false}
      />
      <Infoblock
        title={t("infoblock_3.title", { ns: "enti" })}
        content={
          <>
            <Typography variant="body2">
              {t("infoblock_3.description_1", { ns: "enti" })}
            </Typography>
            <Typography variant="body2">
              {t("infoblock_3.description_2", { ns: "enti" })}
            </Typography>
          </>
        }
        inverse={false}
        image={`${IMAGES_PATH}/pa-infoblock-3.png`}
        altText={t("infoblock_3.altText", { ns: "enti" })}
        imageShadow={false}
      />
      <div className="showcasePadding">
        <Showcase
          title={t("showcase.title", { ns: "enti" })}
          items={[
            {
              icon: <PeopleIcon />,
              title: t("showcase.item_1.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_1.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
            {
              icon: <FireworksIcon />,
              title: t("showcase.item_2.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_2.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
            {
              icon: <EasyIcon />,
              title: t("showcase.item_3.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_3.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
            {
              icon: <CheckmarkIcon />,
              title: t("showcase.item_4.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("showcase.item_4.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
          ]}
        />
      </div>
      <div className="lightWalkthrough">
        <Walkthrough
          title={t("walkthrough.title", { ns: "enti" })}
          items={[
            {
              icon: <UploadIcon color="primary" />,
              title: t("walkthrough.item_1.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_1.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
            {
              icon: <SyncIcon color="primary" />,
              title: t("walkthrough.item_2.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_2.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
            {
              icon: <SendIcon color="primary" />,
              title: t("walkthrough.item_3.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_3.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
            {
              icon: <DeliverIcon color="primary" />,
              title: t("walkthrough.item_4.title", { ns: "enti" }),
              subtitle: (
                <Typography variant="body2">
                  {t("walkthrough.item_4.subtitle", { ns: "enti" })}
                </Typography>
              ),
            },
          ]}
        />
      </div>
      <StripeLinkEnti />
      <DarkInfoblockEnti />
    </>
  );
};

export default EntiPage;
