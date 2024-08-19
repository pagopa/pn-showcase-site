import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "src/hook/useTranslation";

const InDepthCard = () => {
  const { t } = useTranslation(["documenti"]);

  const cards2Data = [
    {
      title: t("in_depth_card.card.1.title", { ns: "documenti" }),
      description: "",
      buttons: [
        {
          label: t("in_depth_card.card.1.cta", { ns: "documenti" }),
          color: "primary",
          link: "https://docs.pagopa.it/manuale-per-onboarding-degli-enti",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("in_depth_card.card.2.title", { ns: "documenti" }),
      description: "",
      buttons: [
        {
          label: t("in_depth_card.card.2.cta", { ns: "documenti" }),
          color: "primary",
          link: "/static/documents/Prezzi Ente v.2.pdf",
          icon: <ArrowForwardIcon sx={{ color: "primary.main" }} />,
        },
      ],
    },
    {
      title: t("in_depth_card.card.3.title", { ns: "documenti" }),
      description: "",
      buttons: [
        {
          label: t("in_depth_card.card.3.cta", { ns: "documenti" }),
          color: "primary",
          link: "https://docs.pagopa.it/send-kit-di-comunicazione-per-gli-enti-aderenti/",
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
            <Typography variant="h4" pb={2}>
              {t("in_depth_card.title", { ns: "documenti" })}
            </Typography>
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
              {cards2Data
                .slice(0, Math.ceil(cards2Data.length / 2))
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
              {cards2Data
                .slice(Math.ceil(cards2Data.length / 2))
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

export default InDepthCard;
