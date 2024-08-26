import { Box, Stack, Typography } from "@mui/material";
import FaqDataSectionBlock from "./FaqDataSectionBlock";
import { useTranslation } from "src/hook/useTranslation";
import { FaqLink, FaqParagraph, FaqTextSection } from "../FaqComponents";
import {
  PERFEZIONAMENTO_PATH,
  PN_PF_URL,
  PN_PG_URL,
  SEND_PF_HELP_EMAIL,
} from "@utils/constants";
import { IFaqDataSection } from "../../model";

interface DataSectionsProps {
  currentItem: string | null;
  setActiveItem: (itemId: string) => (_: any, isExpanded: boolean) => void;
}

const FaqDataSections: React.FC<DataSectionsProps> = ({
  currentItem,
  setActiveItem,
}) => {
  const { t } = useTranslation(["faq"]);

  const sectionsData: Array<IFaqDataSection> = [
    {
      // Section 'Notifiche'
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
          description: [t("notifications.2.description", { ns: "faq" })],
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
    },
    {
      // Section 'SEND'
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
              <Typography variant="body2" component="span" sx={{ mr: "4px" }}>
                {t("send.5.description_1", { ns: "faq" })}
              </Typography>
              <Typography variant="body2" component="span">
                <a href={PN_PF_URL}>cittadini.notifichedigitali.it</a>
              </Typography>
              <Typography variant="body2" component="span" sx={{ mr: "4px" }}>
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
    },
    {
      // Section 'Recapiti'
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
    },
    {
      // Section 'Documenti e comunicazioni'
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
    },
    {
      // Section 'Ricezione di una notifica'
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
              <Typography variant="body2" component="span" sx={{ mr: "4px" }}>
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
              <Typography variant="body2" component="span" sx={{ mr: "4px" }}>
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
    },
    {
      // Section 'Perfezionamento'
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
    },
    {
      // Section Annullamento
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
    },
    {
      // Section Accessibilità
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
    },
  ];
  return (
    <Stack
      direction="column"
      sx={{
        px: { xs: "30px", sm: "80px", md: "142px" },
        pt: "100px",
        backgroundColor: "#FAFAFA",
      }}
      className="faqItems"
    >
      {sectionsData.map((section) => (
        <FaqDataSectionBlock
          key={section.title}
          section={{
            title: section.title,
            items: section.items.map((item) => item),
          }}
          setActiveItem={setActiveItem}
          activeItem={currentItem}
        />
      ))}
    </Stack>
  );
};

export default FaqDataSections;
