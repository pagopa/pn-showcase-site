import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "../../hook/useTranslation";

export const DarkInfoblockEnti = () => {
  const { t } = useTranslation(["enti"]);

  return (
    <Box sx={{ backgroundColor: "#0B3EE3", paddingTop: 8, paddingBottom: 8 }}>
      <Container maxWidth="xl">
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h4" component="h1" color="white" gutterBottom>
              {t("dark_infoblock.title")}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              textAlign="center"
              marginBottom={2}
            >
              {t("dark_infoblock.subtitle")}
            </Typography>
            <Button
              variant="contained"
              sx={{
                alignSelf: "center",
                backgroundColor: "background.paper",
                color: "pagoPA.main",
                ":hover": {
                  backgroundColor: "background.paper",
                  color: "pagoPA.main",
                },
              }}
              href="https://selfcare.pagopa.it/auth/login"
            >
              {t("dark_infoblock.cta")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
