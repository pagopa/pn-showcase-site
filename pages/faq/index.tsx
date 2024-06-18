/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
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

import { IMAGES_PATH } from "@utils/constants";
import { getFaqData } from "api";
import { FaqDescription, IFaqDataItem, IFaqDataSection } from "model";
import PageHead from "src/components/PageHead";

type SetActiveItemFunction = (
  itemId: string
) => (_: any, isExpanded: boolean) => void;

type ActiveItemProps = {
  setActiveItem: SetActiveItemFunction;
  activeItem: string | null;
};

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

export function FaqDataSectionBlock(
  props: { section: IFaqDataSection } & ActiveItemProps
) {
  const { section, setActiveItem, activeItem } = props;

  return (
    <Box sx={{ pb: "64px" }}>
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
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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
    setSelectedSection(section === selectedSection ? null : section);
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

  // Separate the selected section
  const sortedSections = selectedSection
    ? [
        ...faqData.sections.filter((section) => section.title === selectedSection),
        ...faqData.sections.filter((section) => section.title !== selectedSection),
      ]
    : faqData.sections;

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
                  color={selectedSection === section ? "primary" : "default"}
                  sx={{
                    color: "white",
                    backgroundColor:
                      selectedSection === section ? "#1976d2" : "#EBEBF52E",
                    border:
                      selectedSection === section ? "1px solid white" : "none",
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
          {sortedSections.map((section, ix) => (
            <FaqDataSectionBlock
              section={section}
              key={ix}
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
