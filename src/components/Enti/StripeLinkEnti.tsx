import { Box, Button, Container, Grid, Typography } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { useTranslation } from "../../hook/useTranslation";

const StripeLinkEnti = () => {
  const { t } = useTranslation(["enti"]);

  return (
    <Box sx={{ backgroundColor: "info.contrastText" }} padding={2}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              variant="body2"
              color="white"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SpeakerNotesIcon
                sx={{ fontSize: "20px", marginRight: "10px" }}
              />
              {t("stripe_link.title")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{ marginLeft: "1em" }}
              href="https://docs.pagopa.it/send-kit-di-comunicazione-per-gli-enti-aderenti/"
            >
              {t("stripe_link.cta")}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StripeLinkEnti;
