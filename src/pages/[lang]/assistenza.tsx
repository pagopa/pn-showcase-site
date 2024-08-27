import { GetStaticPaths, NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { Box, Fade, Stack } from "@mui/material";

import HeadingTitle from "../../components/HeadingTitle";
import Tabs from "../../components/Tabs";
import PageHead from "../../components/PageHead";
import { langCodes } from "@utils/constants";
import { getI18n } from "../../api/i18n";
import { LangCode } from "../../model";
import { useTranslation } from "../../hook/useTranslation";
import DarkInfoblockAssistenza from "./assistenza/DarkInfoblockAssistenza";
import ContactInfoAssistenza from "./assistenza/ContactInfoAssistenza";
import ContactInfoAssistenzaMittenti from "./assistenza/ContactInfoAssistenzaMittenti";
import AssistanceCards, {
  AssistanceCardsProps,
} from "../../components/Assistenza/AssistanceCards";
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
  const translations = getI18n(params.lang, ["common", "assistenza"]);

  return { props: { translations, lang: params.lang } };
}

const Assistenza: NextPage = () => {
  const { t } = useTranslation(["common", "assistenza"]);
  const { lang } = useContext(LangContext);
  const [currentTab, setCurrentTab] = useState({ index: 0, visible: true });
  const transitionDuration = 500;
  const containerRef = useRef(null);

  const tabs = [
    t("tab.1.title", { ns: "assistenza" }),
    t("tab.2.title", { ns: "assistenza" }),
  ];

  const cardsContent: Array<AssistanceCardsProps> = [
    {
      // cards cittadini e imprese
      cards: [
        {
          title: t("tab.1.card.1.title", { ns: "assistenza" }),
          href: safeInternalPage(lang, "/faq#send-come-accedere"),
          text: t("tab.1.card.1.cta", { ns: "assistenza" }),
        },
        {
          title: t("tab.1.card.2.title", { ns: "assistenza" }),
          href: safeInternalPage(lang, "/faq#documenti-aar"),
          text: t("tab.1.card.2.cta", { ns: "assistenza" }),
        },
        {
          title: t("tab.1.card.3.title", { ns: "assistenza" }),
          href: safeInternalPage(lang, "/faq#perfezionamento-cosa-significa"),
          text: t("tab.1.card.3.cta", { ns: "assistenza" }),
        },
      ],
      button: {
        text: t("tab.1.cta", { ns: "assistenza" }),
        href: safeInternalPage(lang, "/faq"),
      },
    },
    {
      // cards enti mittenti
      cards: [
        {
          title: t("tab.2.card.1.title", { ns: "assistenza" }),
          href: "https://docs.pagopa.it/send-faq-enti/argomenti/adesione/chi-puo-aderire",
          text: t("tab.2.card.1.cta", { ns: "assistenza" }),
        },
        {
          title: t("tab.2.card.2.title", { ns: "assistenza" }),
          href: "https://docs.pagopa.it/area-riservata-enti-piattaforma-notifiche/area-riservata-enti-send-servizio-notifiche-digitali/processo-di-adesione-a-send",
          text: t("tab.2.card.2.cta", { ns: "assistenza" }),
        },
        {
          title: t("tab.2.card.3.title", { ns: "assistenza" }),
          href: "https://docs.pagopa.it/manuale-operativo/piattaforma-notifiche-digitali-manuale-operativo/il-processo-di-notificazione",
          text: t("tab.2.card.3.cta", { ns: "assistenza" }),
        },
      ],
      button: {
        text: t("tab.2.cta", { ns: "assistenza" }),
        href: safeInternalPage(lang, "/pubbliche-amministrazioni/documenti/"),
      },
    },
  ];

  const handleResize = () => {
    const cards = document.querySelectorAll<HTMLDivElement>(".MuiCard-root");
    let maxHeight = 0;

    cards.forEach((card) => {
      card.style.height = "auto";
      if (card.clientHeight > maxHeight) {
        maxHeight = card.clientHeight;
      }
    });

    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [currentTab]);

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
    <>
      <PageHead
        title={t("title", { ns: "assistenza" })}
        description={t("description", { ns: "assistenza" })}
      />
      <Stack
        mt={10}
        mb={5}
        mx={3}
        direction="column"
        alignItems="center"
        spacing={0}
        justifyContent="center"
      >
        <HeadingTitle
          title={t("heading.title", { ns: "assistenza" })}
          subtitle={t("heading.subtitle", { ns: "assistenza" })}
        />
        <Tabs tabs={tabs} onTabChange={handleTabChange} />
        <Box
          ref={containerRef}
          sx={{ width: "100%", maxWidth: "1200px", mt: 4 }}
        >
          <Fade in={currentTab.visible} timeout={transitionDuration}>
            <Box
              sx={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: 2,
              }}
            >
              <AssistanceCards {...cardsContent[currentTab.index]} />
            </Box>
          </Fade>
        </Box>
      </Stack>

      {currentTab.index === 0 && (
        <>
          <DarkInfoblockAssistenza />
          <ContactInfoAssistenza />
        </>
      )}
      {currentTab.index === 1 && <ContactInfoAssistenzaMittenti />}
    </>
  );
};

export default Assistenza;
