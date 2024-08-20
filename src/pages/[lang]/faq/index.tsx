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

import {
  IMAGES_PATH,
  langCodes,
  PERFEZIONAMENTO_PATH,
  PN_PF_URL,
  PN_PG_URL,
  SEND_PF_HELP_EMAIL,
} from "@utils/constants";
import {
  FaqDescription,
  IFaqDataItem,
  IFaqDataSection,
  LangCode,
} from "../../../model";
import PageHead from "../../../components/PageHead";
import { getI18n } from "../../../api/i18n";
import { useTranslation } from "src/hook/useTranslation";
import {
  FaqLink,
  FaqParagraph,
  FaqTextSection,
} from "src/components/FaqComponents";

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

/**
 * A separate component to deal with the polymorphism allowed in the definition of a FAQ item description.
 * Cfr. the definition of the type FaqDescription.
 */
function FaqDescriptionBlock(props: { description: FaqDescription }) {
  const { description } = props;

  if (typeof description === "string") {
    return <Typography variant="body2">{description}</Typography>;
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
    <Box
      id={section.title.replace(/\s+/g, "-").toLowerCase()}
      sx={{ pb: "64px" }}
    >
      <Typography variant="h4" sx={{ pb: "48px" }} component="h4">
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
        <Stack
          direction="column"
          sx={{
            px: { xs: "30px", sm: "80px", md: "142px" },
            pt: "100px",
            backgroundColor: "#FAFAFA",
          }}
          className="faqItems"
        >
          <FaqDataSectionBlock
            key={t("notifications.title", { ns: "faq" })}
            section={{
              title: t("notifications.title", { ns: "faq" }),
              items: [
                {
                  id: t("notifications.1.title", { ns: "faq" }),
                  title: t("notifications.1.title", { ns: "faq" }),
                  description: [
                    t("notifications.1.description_1", { ns: "faq" }),
                    t("notifications.1.description_2", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notifications.2.title", { ns: "faq" }),
                  title: t("notifications.2.title", { ns: "faq" }),
                  description: [
                    t("notifications.2.description", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notifications.3.title", { ns: "faq" }),
                  title: t("notifications.3.title", { ns: "faq" }),
                  description: [
                    t("notifications.3.description_1", { ns: "faq" }),
                    t("notifications.3.description_2", { ns: "faq" }),
                  ],
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("send.title", { ns: "faq" })}
            section={{
              title: t("send.title", { ns: "faq" }),
              items: [
                {
                  id: t("send.1.title", { ns: "faq" }),
                  title: t("send.1.title", { ns: "faq" }),
                  description: [t("send.1.description", { ns: "faq" })],
                },
                {
                  id: t("send.2.title", { ns: "faq" }),
                  title: t("send.2.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <FaqParagraph
                        ariaLabel={t("send.2.description_1", { ns: "faq" })}
                      >
                        {t("send.2.description_1", { ns: "faq" })}
                      </FaqParagraph>
                      <FaqTextSection
                        ariaLabel={t("send.2.description_2", { ns: "faq" })}
                      >
                        {t("send.2.description_2", { ns: "faq" })}
                      </FaqTextSection>
                      <FaqLink href={PN_PF_URL} noSpaceAfter>
                        cittadini.notifichedigitali.it
                      </FaqLink>
                      <FaqTextSection
                        ariaLabel={t("send.2.description_3", { ns: "faq" })}
                      >
                        {t("send.2.description_3", { ns: "faq" })}
                      </FaqTextSection>
                      <FaqLink href={PN_PG_URL} noSpaceAfter>
                        imprese.notifichedigitali.it
                      </FaqLink>
                      <FaqTextSection noSpaceAfter ariaLabel="">
                        {t("send.2.description_4", { ns: "faq" })}
                      </FaqTextSection>
                    </Box>
                  ),
                },
                {
                  id: t("send.3.title", { ns: "faq" }),
                  title: t("send.3.title", { ns: "faq" }),
                  description: [
                    t("send.3.description_1", { ns: "faq" }),
                    t("send.3.description_2", { ns: "faq" }),
                    t("send.3.description_3", { ns: "faq" }),
                    t("send.3.description_4", { ns: "faq" }),
                  ],
                },
                {
                  id: t("send.4.title", { ns: "faq" }),
                  title: t("send.4.title", { ns: "faq" }),
                  description: [t("send.4.description", { ns: "faq" })],
                },
                {
                  id: t("send.5.title", { ns: "faq" }),
                  title: t("send.5.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ mr: "4px" }}
                      >
                        {t("send.5.description_1", { ns: "faq" })}
                      </Typography>
                      <Typography variant="body2" component="span">
                        <a href={PN_PF_URL}>cittadini.notifichedigitali.it</a>
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ mr: "4px" }}
                      >
                        {t("send.5.description_2", { ns: "faq" })}
                      </Typography>
                      <Typography variant="body2" component="span">
                        <a href={PN_PG_URL}>imprese.notifichedigitali.it</a>
                      </Typography>
                      <Typography variant="body2" component="span">
                        {t("send.5.description_3", { ns: "faq" })}
                      </Typography>
                    </Box>
                  ),
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("contacts.title", { ns: "faq" })}
            section={{
              title: t("contacts.title", { ns: "faq" }),
              items: [
                {
                  id: t("contacts.1.title", { ns: "faq" }),
                  title: t("contacts.1.title", { ns: "faq" }),
                  description: [t("contacts.1.description", { ns: "faq" })],
                },
                {
                  id: t("contacts.2.title", { ns: "faq" }),
                  title: t("contacts.2.title", { ns: "faq" }),
                  description: [
                    t("contacts.2.description_1", { ns: "faq" }),
                    t("contacts.2.description_2", { ns: "faq" }),
                  ],
                },
                {
                  id: t("contacts.3.title", { ns: "faq" }),
                  title: t("contacts.3.title", { ns: "faq" }),
                  description: [
                    t("contacts.3.description_1", { ns: "faq" }),
                    t("contacts.3.description_2", { ns: "faq" }),
                    t("contacts.3.description_3", { ns: "faq" }),
                    t("contacts.3.description_4", { ns: "faq" }),
                    t("contacts.3.description_5", { ns: "faq" }),
                  ],
                },
                {
                  id: t("contacts.4.title", { ns: "faq" }),
                  title: t("contacts.4.title", { ns: "faq" }),
                  description: [
                    t("contacts.4.description_1", { ns: "faq" }),
                    t("contacts.4.description_2", { ns: "faq" }),
                  ],
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("documents.title", { ns: "faq" })}
            section={{
              title: t("documents.title", { ns: "faq" }),
              items: [
                {
                  id: t("documents.1.title", { ns: "faq" }),
                  title: t("documents.1.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <FaqParagraph
                        flat
                        ariaLabel={t("documents.1.description_1", {
                          ns: "faq",
                        })}
                      >
                        {t("documents.1.description_1", { ns: "faq" })}
                      </FaqParagraph>
                      <ul style={{ marginTop: 0 }}>
                        <li>
                          <FaqTextSection
                            noSpaceAfter
                            ariaLabel={t("documents.1.description_2", {
                              ns: "faq",
                            })}
                          >
                            {t("documents.1.description_2", { ns: "faq" })}
                          </FaqTextSection>
                        </li>
                        <li>
                          <FaqTextSection
                            noSpaceAfter
                            ariaLabel={t("documents.1.description_3", {
                              ns: "faq",
                            })}
                          >
                            {t("documents.1.description_3", { ns: "faq" })}
                          </FaqTextSection>
                        </li>
                        <li>
                          <FaqTextSection
                            noSpaceAfter
                            ariaLabel={t("documents.1.description_4", {
                              ns: "faq",
                            })}
                          >
                            {t("documents.1.description_4", { ns: "faq" })}
                          </FaqTextSection>
                        </li>
                        <li>
                          <FaqTextSection
                            noSpaceAfter
                            ariaLabel={t("documents.1.description_5", {
                              ns: "faq",
                            })}
                          >
                            {t("documents.1.description_5", { ns: "faq" })}
                          </FaqTextSection>
                        </li>
                      </ul>
                    </Box>
                  ),
                },
                {
                  id: t("documents.2.title", { ns: "faq" }),
                  title: t("documents.2.title", { ns: "faq" }),
                  description: [t("documents.2.description", { ns: "faq" })],
                },
                {
                  id: t("documents.3.title", { ns: "faq" }),
                  title: t("documents.3.title", { ns: "faq" }),
                  description: [
                    t("documents.3.description_1", { ns: "faq" }),
                    t("documents.3.description_2", { ns: "faq" }),
                  ],
                },
                {
                  id: t("documents.4.title", { ns: "faq" }),
                  title: t("documents.4.title", { ns: "faq" }),
                  description: [t("documents.4.description", { ns: "faq" })],
                },
                {
                  id: t("documents.5.title", { ns: "faq" }),
                  title: t("documents.5.title", { ns: "faq" }),
                  description: [t("documents.5.description", { ns: "faq" })],
                },
                {
                  id: t("documents.6.title", { ns: "faq" }),
                  title: t("documents.6.title", { ns: "faq" }),
                  description: [
                    t("documents.6.description_1", { ns: "faq" }),
                    t("documents.6.description_2", { ns: "faq" }),
                  ],
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("notification_reception.title", { ns: "faq" })}
            section={{
              title: t("notification_reception.title", { ns: "faq" }),
              items: [
                {
                  id: t("notification_reception.1.title", { ns: "faq" }),
                  title: t("notification_reception.1.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.1.description", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notification_reception.2.title", { ns: "faq" }),
                  title: t("notification_reception.2.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.2.description", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notification_reception.3.title", { ns: "faq" }),
                  title: t("notification_reception.3.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.3.description", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notification_reception.4.title", { ns: "faq" }),
                  title: t("notification_reception.4.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.4.description_1", { ns: "faq" }),
                    t("notification_reception.4.description_2", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notification_reception.5.title", { ns: "faq" }),
                  title: t("notification_reception.5.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.5.description", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notification_reception.6.title", { ns: "faq" }),
                  title: t("notification_reception.6.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ mr: "4px" }}
                      >
                        {t("notification_reception.6.description_1", {
                          ns: "faq",
                        })}
                      </Typography>
                      <Typography variant="body2" component="span">
                        <a href={PERFEZIONAMENTO_PATH}>
                          {t("notification_reception.6.description_2", {
                            ns: "faq",
                          })}
                        </a>
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ mr: "4px" }}
                      >
                        {t("notification_reception.6.description_3", {
                          ns: "faq",
                        })}
                      </Typography>
                    </Box>
                  ),
                },
                {
                  id: t("notification_reception.7.title", { ns: "faq" }),
                  title: t("notification_reception.7.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.7.description_1", { ns: "faq" }),
                    t("notification_reception.7.description_2", { ns: "faq" }),
                  ],
                },
                {
                  id: t("notification_reception.8.title", { ns: "faq" }),
                  title: t("notification_reception.8.title", { ns: "faq" }),
                  description: [
                    t("notification_reception.8.description_1", { ns: "faq" }),
                    t("notification_reception.8.description_2", { ns: "faq" }),
                  ],
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("finalization.title", { ns: "faq" })}
            section={{
              title: t("finalization.title", { ns: "faq" }),
              items: [
                {
                  id: t("finalization.1.title", { ns: "faq" }),
                  title: t("finalization.1.title", { ns: "faq" }),
                  description: [t("finalization.1.description", { ns: "faq" })],
                },
                {
                  id: t("finalization.2.title", { ns: "faq" }),
                  title: t("finalization.2.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <FaqTextSection
                        ariaLabel={t("finalization.2.description_1", {
                          ns: "faq",
                        })}
                      >
                        {t("finalization.2.description_1", { ns: "faq" })}
                      </FaqTextSection>
                      <FaqLink href={PERFEZIONAMENTO_PATH}>
                        {t("finalization.2.description_2", { ns: "faq" })}
                      </FaqLink>
                      <FaqTextSection
                        noSpaceAfter
                        ariaLabel={t("finalization.2.description_3", {
                          ns: "faq",
                        })}
                      >
                        {t("finalization.2.description_3", { ns: "faq" })}
                      </FaqTextSection>
                    </Box>
                  ),
                },
                {
                  id: t("finalization.3.title", { ns: "faq" }),
                  title: t("finalization.3.title", { ns: "faq" }),
                  description: [t("finalization.3.description", { ns: "faq" })],
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("cancellation.title", { ns: "faq" })}
            section={{
              title: t("cancellation.title", { ns: "faq" }),
              items: [
                {
                  id: t("cancellation.1.title", { ns: "faq" }),
                  title: t("cancellation.1.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <FaqTextSection
                        ariaLabel={t("cancellation.1.description", {
                          ns: "faq",
                        })}
                      >
                        {t("cancellation.1.description", { ns: "faq" })}
                      </FaqTextSection>
                    </Box>
                  ),
                },
                {
                  id: t("cancellation.2.title", { ns: "faq" }),
                  title: t("cancellation.2.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <FaqTextSection
                        ariaLabel={t("cancellation.2.description", {
                          ns: "faq",
                        })}
                      >
                        {t("cancellation.2.description", { ns: "faq" })}
                      </FaqTextSection>
                    </Box>
                  ),
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
          <FaqDataSectionBlock
            key={t("accessibility.title", { ns: "faq" })}
            section={{
              title: t("accessibility.title", { ns: "faq" }),
              items: [
                {
                  id: t("accessibility.1.title", { ns: "faq" }),
                  title: t("accessibility.1.title", { ns: "faq" }),
                  description: (
                    <Box>
                      <FaqTextSection
                        ariaLabel={t("accessibility.1.description", {
                          ns: "faq",
                        })}
                      >
                        {t("accessibility.1.description", { ns: "faq" })}
                      </FaqTextSection>
                      <FaqLink href={`mailto:${SEND_PF_HELP_EMAIL}`}>
                        {SEND_PF_HELP_EMAIL}
                      </FaqLink>
                    </Box>
                  ),
                },
              ],
            }}
            setActiveItem={setActiveItem}
            activeItem={currentItem}
          />
        </Stack>
      </Box>
    </>
  );
};

export default FaqPage;
