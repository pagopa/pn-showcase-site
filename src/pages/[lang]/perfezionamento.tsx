import { Infoblock } from "@pagopa/mui-italia";
import { GetStaticPaths, NextPage } from "next";
import { useRef, useState } from "react";
import { Box, Fade, Stack } from "@mui/material";

import {
  getCommonHeadingTitleData,
  getCommonInfoblockData,
  getCommonTabsData,
} from "../../api";
import HeadingTitle from "../../components/HeadingTitle";
import Tabs from "../../components/Tabs";
import PageHead from "../../components/PageHead";
import { langCodes } from "@utils/constants";
import { getI18n } from "../../api/i18n";
import { LangCode } from "../../model";

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

const Perfezionamento: NextPage = () => {
  const [currentTab, setCurrentTab] = useState({ index: 0, visible: true });
  const transitionDuration = 500;
  const containerRef = useRef(null);
  const tabsData = getCommonTabsData("tabs notification viewed 1");
  const headingTitleData = getCommonHeadingTitleData(
    "heading title notification viewed 1"
  );
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
        title="SEND - Servizio Notifiche Digitali | Perfezionamento della notifica"
        description="Cos'è e come funziona il perfezionamento di una notifica, a seconda del canale con cui l’hai ricevuta"
      />
      <HeadingTitle {...headingTitleData} />
      <Tabs {...tabsData} onTabChange={handleTabChange} />
      <Box ref={containerRef}>
        <Fade in={currentTab.visible} timeout={transitionDuration}>
          <Box>
            <Infoblock
              {...getCommonInfoblockData(
                `infoblock notification viewed ${currentTab.index + 1}`
              )}
            />
          </Box>
        </Fade>
      </Box>
    </Stack>
  );
};

export default Perfezionamento;
