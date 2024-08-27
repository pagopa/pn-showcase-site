/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from "react";
import type { GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Typography, Stack, Chip } from "@mui/material";

import { IMAGES_PATH, langCodes } from "@utils/constants";
import { LangCode } from "../../../model";
import PageHead from "../../../components/PageHead";
import { getI18n } from "../../../api/i18n";
import { useTranslation } from "../../../hook/useTranslation";
import FaqDataSections from "src/components/Faq/FaqDataSections";

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
  const translations = getI18n(params.lang, ["common", "faq"]);

  return { props: { translations, lang: params.lang } };
}

const FaqPage: NextPage = () => {
  const { t } = useTranslation(["common", "faq"]);
  const router = useRouter();

  const [currentItem, setCurrentItem] = useState<string | null>(null);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      setCurrentItem(hash);
    }
  }, [router.asPath]);

  const setActiveItem = useCallback(
    (itemId: string) => (_: any, isExpanded: boolean) => {
      setCurrentItem(isExpanded ? itemId : null);
    },
    []
  );

  const handleChipClick = (section: string) => {
    // Scroll to the section using document.getElementById
    const sectionId = section.replace(/\s+/g, "-").toLowerCase();
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    t("notifications.title", { ns: "faq" }),
    t("send.title", { ns: "faq" }),
    t("contacts.title", { ns: "faq" }),
    t("documents.title", { ns: "faq" }),
    t("notification_reception.title", { ns: "faq" }),
    t("finalization.title", { ns: "faq" }),
    t("cancellation.title", { ns: "faq" }),
    t("accessibility.title", { ns: "faq" }),
  ];

  return (
    <>
      <PageHead
        title={t("title", { ns: "faq" })}
        description={t("description", { ns: "faq" })}
      />

      <Box id="faqHero">
        <Box
          sx={{
            background: `url(${IMAGES_PATH}/hero-faq-background-2.png)`,
            backgroundSize: "cover",
            textAlign: "center",
            color: "white",
            pb: 5,
            px: 2,
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ pt: 5 }}>
            <Typography variant="h2" sx={{ mb: 4, color: "white" }}>
              {t("hero.title", { ns: "faq" })}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: "white" }}>
              {t("hero.subtitle", { ns: "faq" })}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              maxWidth="sm"
              sx={{
                flexWrap: "wrap",
                "& > *": {
                  height: "40px",
                },
                rowGap: "16px",
              }}
            >
              {sections.map((section, index) => (
                <Chip
                  key={index}
                  label={section}
                  onClick={() => handleChipClick(section)}
                  clickable
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(235, 235, 245, 0.18)",
                    border: "1px solid transparent",
                    "&:hover": {
                      backgroundColor: "rgba(235, 235, 245, 0.30)",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
        <FaqDataSections
          currentItem={currentItem}
          setActiveItem={setActiveItem}
        />
      </Box>
    </>
  );
};

export default FaqPage;
