/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from "react";
import type { GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { IMAGES_PATH, langCodes } from "@utils/constants";
import { getFaqData } from "../../../api";
import { FaqDescription, IFaqDataItem, IFaqDataSection, LangCode } from "../../../model";
import PageHead from "../../../components/PageHead";
import { getI18n } from "../../../api/i18n";

type SetActiveItemFunction = (
  itemId: string
) => (_: any, isExpanded: boolean) => void;

type ActiveItemProps = {
  setActiveItem: SetActiveItemFunction;
  activeItem: string | null;
};

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

/**
 * A separate component to deal with the polymorphism allowed in the definition of a FAQ item description.
 * Cfr. the definition of the type FaqDescription.
 */
function FaqDescriptionBlock(props: { description: FaqDescription }) {
  const { description } = props;

  if (typeof description === "string") {
    return (
      <Typography variant="body2" tabIndex={0} aria-label={description}>
        {description}
      </Typography>
    );
  } else if (Array.isArray(description)) {
    // in fact the wrapping Fragment is just to have JSX.Element as single return type for FaqDescriptionBlock
    return (
      <>
        {description.map((text, ix) => {
          const isLastChild = ix === description.length - 1;
          return (
            <Typography
              variant="body2"
              key={ix}
              sx={isLastChild ? {} : { mb: "12px" }}
              tabIndex={0}
              aria-label={text}
            >
              {text}
            </Typography>
          );
        })}
      </>
    );
  } else {
    return description;
  }
}

// recall: the FAQ contains many sections, each section contains many items.
// A separate component is defined to render each level in this hierarchy.

function FaqDataItemBlock(props: { item: IFaqDataItem } & ActiveItemProps) {
  const { item, setActiveItem, activeItem } = props;

  return (
    <Box id={item.id} sx={{ mb: "16px" }}>
      <Accordion
        onChange={setActiveItem(item.id)}
        expanded={item.id === activeItem}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mr: 4, textAlign: "justify" }}>
            <FaqDescriptionBlock description={item.description} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function FaqDataSectionBlock(
  props: { section: IFaqDataSection } & ActiveItemProps
) {
  const { section, setActiveItem, activeItem } = props;

  return (
    <Box id={section.title.replace(/\s+/g, '-').toLowerCase()} sx={{ pb: "64px" }}>
      <Typography
        variant="h4"
        sx={{ pb: "48px" }}
        tabIndex={0}
        component="h4"
        aria-label={section.title}
      >
        {section.title}
      </Typography>
      {section.items.map((item) => (
        <FaqDataItemBlock
          item={item}
          setActiveItem={setActiveItem}
          key={item.id}
          activeItem={activeItem}
        />
      ))}
    </Box>
  );
}

const FaqPage: NextPage = () => {
  const router = useRouter();

  const faqData = getFaqData();

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
    const sectionId = section.replace(/\s+/g, '-').toLowerCase();
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    "Notifiche",
    "SEND",
    "Recapiti",
    "Documenti e comunicazioni",
    "Ricezione di una notifica",
    "Perfezionamento",
    "Annullamento",
    "Accessibilità",
  ];

  return (
    <>
      <PageHead
        title="SEND - Servizio Notifiche Digitali | FAQ"
        description="Consulta le domande frequenti sulla piattaforma SEND dedicata alla ricezione di notifiche digitali a valore legale"
      />

      <main id="faqHero">
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
              Domande frequenti
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: "white" }}>
              Seleziona un argomento
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
        <Stack
          direction="column"
          sx={{
            px: { xs: "30px", sm: "80px", md: "142px" },
            pt: "100px",
            backgroundColor: "#FAFAFA",
          }}
          className="faqItems"
        >
          {faqData.sections.map((section, ix) => (
            <FaqDataSectionBlock
              key={ix}
              section={section}
              setActiveItem={setActiveItem}
              activeItem={currentItem}
            />
          ))}
        </Stack>
      </main>
    </>
  );
};

export default FaqPage;
