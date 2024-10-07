import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslation } from "../../../hook/useTranslation";
import { SEND_PF_HELP_EMAIL, SEND_PF_HELP_PHONE } from "@utils/constants";

const ContactInfoAssistenza = () => {
  const { t } = useTranslation(["assistenza"]);
  return (
    <Grid container spacing={0} sx={{ width: "100%" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ backgroundColor: "#F5F5F5", padding: 8 }}
        display="grid"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          maxWidth="500px"
        >
          <MailIcon sx={{ fontSize: "40px", color: "#0062C3" }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "#17324D" }}
            gutterBottom
          >
            {t("tab.1.email.title", { ns: "assistenza" })}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#17324D" }}
            textAlign="center"
            marginBottom={2}
          >
            {t("tab.1.email.description_1", { ns: "assistenza" })}
            <Link
              href={`mailto:${SEND_PF_HELP_EMAIL}`}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "#17324D",
              }}
            >
              {SEND_PF_HELP_EMAIL}
            </Link>
            {t("tab.1.email.description_3", { ns: "assistenza" })}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component="a"
            href={`mailto:${SEND_PF_HELP_EMAIL}`}
          >
            {t("tab.1.email.cta", { ns: "assistenza" })}
          </Button>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ backgroundColor: "#FAFAFA", padding: 8 }}
        display="grid"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={2}
          maxWidth="500px"
        >
          <PhoneIcon sx={{ fontSize: "40px", color: "#0062C3" }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "#17324D" }}
            gutterBottom
          >
            {t("tab.1.phone.title", { ns: "assistenza" })}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#17324D" }}
            textAlign="center"
            marginBottom={2}
          >
            {t("tab.1.phone.description_1", { ns: "assistenza" })}
            <Link
              href={`tel:${SEND_PF_HELP_PHONE}`}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "#17324D",
              }}
            >
              {SEND_PF_HELP_PHONE}
            </Link>{" "}
            {t("tab.1.phone.description_3", { ns: "assistenza" })}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component="a"
            href={`tel:${SEND_PF_HELP_PHONE}`}
          >
            {t("tab.1.phone.cta", { ns: "assistenza" })}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ContactInfoAssistenza;
