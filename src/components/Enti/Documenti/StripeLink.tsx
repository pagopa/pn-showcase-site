import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";

const StripeLink = () => {
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
              <CodeIcon sx={{ fontSize: "20px", marginRight: "10px" }} />
              Il tuo ente ha già aderito e hai bisogno di approfondire le fasi
              di integrazione alla Piattaforma?
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              href="https://developer.pagopa.it/send/overview"
            >
              Vai alla documentazione tecnica
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StripeLink;
