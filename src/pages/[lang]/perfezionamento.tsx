import { Infoblock, InfoblockProps } from "@pagopa/mui-italia";
import { GetStaticPaths, NextPage } from "next";
import { useContext, useRef, useState } from "react";
import { Box, Fade, Link, Stack, Typography } from "@mui/material";

import HeadingTitle from "../../components/HeadingTitle";
import Tabs from "../../components/Tabs";
import PageHead from "../../components/PageHead";
import { IMAGES_PATH, langCodes } from "@utils/constants";
import { getI18n } from "../../api/i18n";
import { IHeadingTitleProps, ITabsProps, LangCode } from "../../model";
import { useTranslation } from "../../hook/useTranslation";
import CustomInfoblockContent from "../../components/Perfezionamento/CustomInfoblockContent";
import CustomInfoblockList from "../../components/Perfezionamento/CustomInfoblockList";
import CustomInfoblockListItem from "../../components/Perfezionamento/CustomInfoblockListItem";
import LangContext from "../../context/lang-context";
import { safeInternalPage } from "../../utils/navigation";

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
  const translations = getI18n(params.lang, ["common", "perfezionamento"]);

  return { props: { translations, lang: params.lang } };
}

const Perfezionamento: NextPage = () => {
  const { t } = useTranslation(["common", "perfezionamento"]);
  const { lang } = useContext(LangContext);
  const [currentTab, setCurrentTab] = useState({ index: 0, visible: true });
  const transitionDuration = 500;
  const containerRef = useRef(null);

  const heading: IHeadingTitleProps = {
    title: t("heading.title", { ns: "perfezionamento" }),
    subtitle: (
      <>
        {t("heading.subtitle_1", { ns: "perfezionamento" })}
        <Link href={safeInternalPage(lang, "/faq#perfezionamento-cosa-significa")}>
          <strong>{t("heading.subtitle_2", { ns: "perfezionamento" })}</strong>
        </Link>
        {t("heading.subtitle_3", { ns: "perfezionamento" })}
        <br />
        {t("heading.subtitle_4", { ns: "perfezionamento" })}
      </>
    ),
  };

  const tabs: ITabsProps = {
    tabs: [
      t("tab.1.name", { ns: "perfezionamento" }),
      t("tab.2.name", { ns: "perfezionamento" }),
      t("tab.3.name", { ns: "perfezionamento" }),
      t("tab.4.name", { ns: "perfezionamento" }),
      t("tab.5.name", { ns: "perfezionamento" }),
    ],
  };

  const infoblocks: Array<InfoblockProps> = [
    {
      title: "",
      inverse: false,
      image: `${IMAGES_PATH}/pf-notification-viewed-1.png`,
      imageShadow: false,
      overline: t("tab.1.overline", { ns: "perfezionamento" }),
      content: (
        <CustomInfoblockContent
          title={t("tab.1.title", { ns: "perfezionamento" })}
        >
          <CustomInfoblockList>
            <CustomInfoblockListItem
              title={t("tab.1.description_1", { ns: "perfezionamento" })}
              content={t("tab.1.description_2", { ns: "perfezionamento" })}
            />
            <CustomInfoblockListItem
              title={t("tab.1.description_3", { ns: "perfezionamento" })}
              content={t("tab.1.description_4", { ns: "perfezionamento" })}
            />
          </CustomInfoblockList>
          <Typography variant="body2">
            <b>{t("tab.1.description_5", { ns: "perfezionamento" })}</b>
          </Typography>
        </CustomInfoblockContent>
      ),
    },
    {
      title: "",
      inverse: false,
      image: `${IMAGES_PATH}/pf-notification-viewed-2.png`,
      imageShadow: false,
      overline: t("tab.2.overline", { ns: "perfezionamento" }),
      content: (
        <CustomInfoblockContent
          title={t("tab.2.title", { ns: "perfezionamento" })}
        >
          <CustomInfoblockList>
            <CustomInfoblockListItem
              title={t("tab.2.description_1", { ns: "perfezionamento" })}
              content={t("tab.2.description_2", { ns: "perfezionamento" })}
            />
            <CustomInfoblockListItem
              title={t("tab.2.description_3", { ns: "perfezionamento" })}
              content={t("tab.2.description_4", { ns: "perfezionamento" })}
            />
            <CustomInfoblockListItem
              title={t("tab.2.description_5", { ns: "perfezionamento" })}
              content={t("tab.2.description_6", { ns: "perfezionamento" })}
            />
          </CustomInfoblockList>
          <Typography variant="body2">
            <b>{t("tab.2.description_7", { ns: "perfezionamento" })}</b>
          </Typography>
        </CustomInfoblockContent>
      ),
    },
    {
      title: "",
      inverse: false,
      image: `${IMAGES_PATH}/pf-notification-viewed-3.png`,
      imageShadow: false,
      overline: t("tab.3.overline", { ns: "perfezionamento" }),
      content: (
        <CustomInfoblockContent
          title={t("tab.3.title", { ns: "perfezionamento" })}
        >
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t("tab.3.description", { ns: "perfezionamento" })}
          </Typography>
        </CustomInfoblockContent>
      ),
    },
    {
      title: "",
      inverse: false,
      image: `${IMAGES_PATH}/pf-notification-viewed-4.png`,
      imageShadow: false,
      overline: t("tab.4.overline", { ns: "perfezionamento" }),
      content: (
        <CustomInfoblockContent
          title={t("tab.4.title", { ns: "perfezionamento" })}
        >
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t("tab.4.description", { ns: "perfezionamento" })}
          </Typography>
        </CustomInfoblockContent>
      ),
    },
    {
      title: "",
      inverse: false,
      image: `${IMAGES_PATH}/pf-notification-viewed-5.png`,
      imageShadow: false,
      overline: t("tab.5.overline", { ns: "perfezionamento" }),
      content: (
        <CustomInfoblockContent
          title={t("tab.5.title", { ns: "perfezionamento" })}
        >
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t("tab.5.description", { ns: "perfezionamento" })}
          </Typography>
        </CustomInfoblockContent>
      ),
    },
  ];

  const handleTabChange = (tab: number) => {
    if (tab === currentTab.index) {
      return;
    }
    setCurrentTab({ index: currentTab.index, visible: false });
    setTimeout(
      () => setCurrentTab({ index: tab, visible: true }),
      transitionDuration
    );
  };

  return (
    <Stack alignItems="center">
      <PageHead
        title={t("title", { ns: "perfezionamento" })}
        description={t("description", { ns: "perfezionamento" })}
        route="perfezionamento"
      />
      <HeadingTitle {...heading} />
      <Tabs {...tabs} onTabChange={handleTabChange} />
      <Box ref={containerRef}>
        <Fade in={currentTab.visible} timeout={transitionDuration}>
          <Box>
            <Infoblock {...infoblocks[currentTab.index]} />
          </Box>
        </Fade>
      </Box>
    </Stack>
  );
};

export default Perfezionamento;
