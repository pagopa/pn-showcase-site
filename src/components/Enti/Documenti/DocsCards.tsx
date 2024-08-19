import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "src/hook/useTranslation";

const DocsCards = () => {
  const { t } = useTranslation(["documenti"]);

  const cards1Data = [
    {
      title: t("docs_cards.card.1.title", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.1.cta", { ns: "documenti" }),
          color: "primary",
          link: "https://docs.pagopa.it/documento-1-termini-condizioni-di-adesione-e-uso/",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("docs_cards.card.2.title", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.2.cta", { ns: "documenti" }),
          color: "primary",
          link: "https://docs.pagopa.it/doc.2-atto-di-nomina-a-responsabile-trattamento-da/",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("docs_cards.card.3.title", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.3.cta_1", { ns: "documenti" }),
          color: "primary",
          link: "https://developer.pagopa.it/send/guides/manuale-operativo",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
        {
          label: t("docs_cards.card.3.cta_2", { ns: "documenti" }),
          color: "primary",
          link: "https://developer.pagopa.it/send/api#/",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("docs_cards.card.4.title", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.4.cta", { ns: "documenti" }),
          color: "primary",
          link: "https://docs.pagopa.it/documento-4-ciclo-attivo-pn",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("docs_cards.card.5.title", { ns: "documenti" }),
      description: t("docs_cards.card.5.description", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.5.cta", { ns: "documenti" }),
          color: "primary",
          link: "/static/documents/Modulo preventivo di fornitura REV1.xlsx",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("docs_cards.card.6.title", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.6.cta_1", { ns: "documenti" }),
          color: "primary",
          link: "/static/documents/Modulo Ordinativo Commessa per Anticipazione.xlsx",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
        {
          label: t("docs_cards.card.6.cta_2", { ns: "documenti" }),
          color: "primary",
          link: "https://selfcare.pagopa.it/auth/login",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("docs_cards.card.7.title", { ns: "documenti" }),
      buttons: [
        {
          label: t("docs_cards.card.7.cta", { ns: "documenti" }),
          color: "primary",
          link: "https://docs.pagopa.it/sla-di-servizio/",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
  ];

  return (
    <Box pb={8} pt={8}>
      <Container maxWidth="xl" className="documentiCustomCard">
        <Stack
          direction={{ lg: "row", xs: "column" }}
          spacing={2}
          justifyContent="center"
          sx={{
            alignItems: {
              lg: "flex-start",
              md: "center",
              sm: "center",
              xs: "center",
            },
          }}
        >
          {/* Stack per il testo */}
          <Stack
            sx={{
              width: { lg: "25%", md: "85%", sm: "100%", xs: "100%" },
              mb: { xs: 4, lg: 0 },
              ml: { lg: 0, xs: 0 },
              mr: { lg: "10%", xs: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "primary.contrastText" }}
              pb={2}
            >
              {t("docs_cards.title", { ns: "documenti" })}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "primary.contrastText" }}
              pb={2}
            >
              {t("docs_cards.subtitle", { ns: "documenti" })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "primary.contrastText" }}
              pb={2}
            >
              {t("docs_cards.description.1.description_1", { ns: "documenti" })}
              <Link
                href="https://docs.pagopa.it/lista-partner-tecnologici-pn_pagopa-s.p.a./"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.contrastText",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {t("docs_cards.description.1.link", { ns: "documenti" })}
              </Link>
              {t("docs_cards.description.1.description_2", { ns: "documenti" })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "primary.contrastText" }}
              pb={2}
            >
              {t("docs_cards.description.2.description_1", { ns: "documenti" })}
              <Link
                href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.contrastText",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {t("docs_cards.description.2.link_1", { ns: "documenti" })}
              </Link>{" "}
              {t("docs_cards.description.2.description_2", { ns: "documenti" })}
              <Link
                href="https://docs.pagopa.it/area-riservata-enti-piattaforma-notifiche/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.contrastText",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {t("docs_cards.description.2.link_2", { ns: "documenti" })}
              </Link>
              {t("docs_cards.description.2.description_3", { ns: "documenti" })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "primary.contrastText" }}
              pb={2}
            >
              {t("docs_cards.description.3.description", { ns: "documenti" })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "primary.contrastText" }}
              pb={4}
            >
              {t("docs_cards.description.4.description_1", { ns: "documenti" })}
              <Link
                href="https://docs.pagopa.it/faq-enti"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.contrastText",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {t("docs_cards.description.4.link", { ns: "documenti" })}
              </Link>{" "}
              {t("docs_cards.description.4.description_2", { ns: "documenti" })}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "max-content",
                backgroundColor: "background.paper",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "background.paper",
                  color: "primary.main",
                },
              }}
              href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn"
            >
              {t("docs_cards.cta", { ns: "documenti" })}
            </Button>
          </Stack>

          {/* Stack per le cards */}
          <Stack
            direction={{ sm: "row", xs: "column" }}
            spacing={2}
            sx={{
              width: { lg: "50%", md: "85%", sm: "100%", xs: "100%" },
              ml: { lg: "12.5%", xs: 0 },
              mr: { lg: "12.5%", xs: 0 },
            }}
          >
            {/* Stack Cards 1 */}
            <Stack
              sx={{ width: { sm: "50%", xs: "100%" } }}
              spacing={2}
              direction="column"
            >
              {cards1Data
                .slice(0, Math.ceil(cards1Data.length / 2))
                .map((card) => (
                  <Box key={card.title} sx={{ width: "100%" }}>
                    <Card className="documentiCustomCardContent">
                      <CardContent sx={{ textAlign: "left" }}>
                        <Typography variant="h5" component="div">
                          {card.title}
                        </Typography>
                        {card.description && (
                          <Typography variant="body2">
                            {card.description}
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions>
                        <Stack direction="column" spacing={1}>
                          {card.buttons.map((button) => (
                            <Button
                              key={button.label}
                              size="small"
                              color="primary"
                              href={button.link}
                              endIcon={button.icon || <ArrowForwardIcon />}
                              sx={{ justifyContent: "start" }}
                              disableRipple={true}
                            >
                              {button.label}
                            </Button>
                          ))}
                        </Stack>
                      </CardActions>
                    </Card>
                  </Box>
                ))}
            </Stack>

            {/* Stack Cards 2 */}
            <Stack
              sx={{ width: { sm: "50%", xs: "100%" } }}
              spacing={2}
              direction="column"
            >
              {cards1Data
                .slice(Math.ceil(cards1Data.length / 2))
                .map((card) => (
                  <Box key={card.title} sx={{ width: "100%" }}>
                    <Card className="documentiCustomCardContent">
                      <CardContent sx={{ textAlign: "left" }}>
                        <Typography variant="h5" component="div">
                          {card.title}
                        </Typography>
                        {card.description && (
                          <Typography variant="body2">
                            {card.description}
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions>
                        <Stack direction="column" spacing={1}>
                          {card.buttons.map((button) => (
                            <Button
                              key={button.label}
                              size="small"
                              color="primary"
                              href={button.link}
                              endIcon={button.icon || <ArrowForwardIcon />}
                              sx={{ justifyContent: "start" }}
                              disableRipple={true}
                            >
                              {button.label}
                            </Button>
                          ))}
                        </Stack>
                      </CardActions>
                    </Card>
                  </Box>
                ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default DocsCards;
