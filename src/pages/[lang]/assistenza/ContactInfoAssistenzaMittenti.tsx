import MailIcon from "@mui/icons-material/Mail";
import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import { PAGOPA_HELP_EMAIL } from "@utils/constants";
import { useTranslation } from "../../../hook/useTranslation";

const ContactInfoAssistenzaMittenti = () => {
  const { t } = useTranslation(["assistenza"]);
  return (
    <Grid container spacing={0} sx={{ width: "100%" }}>
      <Grid
        item
        xs={12}
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
            {t("tab.2.email.title", { ns: "assistenza" })}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#17324D" }}
            textAlign="center"
            marginBottom={2}
          >
            {t("tab.2.email.description", { ns: "assistenza" })}
            <Link
              href={"mailto:" + PAGOPA_HELP_EMAIL}
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "#17324D",
              }}
            >
              {PAGOPA_HELP_EMAIL}
            </Link>
            .
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component="a"
            href={"mailto:" + PAGOPA_HELP_EMAIL}
          >
            {t("tab.2.email.cta", { ns: "assistenza" })}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ContactInfoAssistenzaMittenti;
