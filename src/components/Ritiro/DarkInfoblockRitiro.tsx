import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { LeggiIcon } from "../../api/data/icons";
import { useTranslation } from "src/hook/useTranslation";

const DarkInfoblockRitiro: React.FC = () => {
  const { t } = useTranslation(["common"]);
  return (
    <Box
      sx={{
        backgroundColor: "#0B3EE3",
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <LeggiIcon />
            <Typography
              variant="h6"
              my={3}
              component="h6"
              color="white"
              gutterBottom
            >
              {t("infoblock_ritiro.title")}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              textAlign="center"
              marginBottom={2}
            >
              {t("infoblock_ritiro.description")}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              textAlign="center"
              marginBottom={2}
            >
              {t("infoblock_ritiro.details_text")}{" "}
              <Link
                variant="body2"
                color="inherit"
                href="/punti-di-ritiro/come-funziona"
              >
                <strong>
                  {t("infoblock_ritiro.details_link_text")}
                </strong>
              </Link>
              .
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DarkInfoblockRitiro;
