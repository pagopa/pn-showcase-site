import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const headingTitles = [
  {
    name: "heading title assistenza 1",
    data: {
      title: "Serve aiuto?",
      subtitle: (
        <>
          Consulta le risposte alle domande frequenti sul servizio notifiche
          digitali SEND o scopri le risorse dedicate ai cittadini e le imprese o
          agli enti mittenti.
        </>
      ),
    },
  },
];

const tabs = [
  {
    name: "tabs assistenza 1",
    data: {
      tabs: ["Per cittadini e imprese", "Per enti mittenti"],
    },
  },
];

const contentBlocks = [
  {
    name: "content assistenza 1",
    data: {
      title: "Per cittadini e imprese",
      content: (
        <>
          <Container maxWidth="xl" sx={{ mt: 4 }}>
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
              <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing={2}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: { sm: "flex-start", xs: "center" },
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#17324D" }}>
                      Come posso accedere a SEND?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      href="/faq#send-come-accedere"
                    >
                      Leggi la risposta
                    </Button>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#17324D" }}>
                      Cos’è un avviso di avvenuta ricezione?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      href="/faq#documenti-aar"
                    >
                      Leggi la risposta
                    </Button>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#17324D" }}>
                      Cosa significa “perfezionamento”?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      href="/faq#perfezionamento-cosa-significa"
                    >
                      Leggi la risposta
                    </Button>
                  </CardActions>
                </Card>
              </Stack>
            </Stack>
          </Container>
          <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
            <Button variant="contained" color="primary" href="/faq">
              Scopri tutte le FAQ
            </Button>
          </Box>
        </>
      ),
    },
  },
  {
    name: "content assistenza 2",
    data: {
      title: "Per enti mittenti",
      content: (
        <>
          <Container maxWidth="xl" sx={{ mt: 4 }}>
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
              <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing={2}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: { sm: "flex-start", xs: "center" },
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#17324D" }}>
                      Chi può inviare notifiche tramite SEND?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      component="a"
                      href="https://docs.pagopa.it/faq-enti/#id-1.-ladesione"
                      target="_self"
                    >
                      Leggi le FAQ enti
                    </Button>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#17324D" }}>
                      Come posso aderire a SEND con il mio ente?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      component="a"
                      href="https://docs.pagopa.it/area-riservata-enti-piattaforma-notifiche/area-riservata-enti-send-servizio-notifiche-digitali/processo-di-adesione-a-send"
                      target="_self"
                    >
                      Scopri come aderire
                    </Button>
                  </CardActions>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#17324D" }}>
                      Come funziona il processo di notificazione?
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      component="a"
                      href="https://docs.pagopa.it/manuale-operativo/piattaforma-notifiche-digitali-manuale-operativo/il-processo-di-notificazione"
                      target="_self"
                    >
                      Consulta il manuale
                    </Button>
                  </CardActions>
                </Card>
              </Stack>
            </Stack>
          </Container>
          <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              href="/pubbliche-amministrazioni"
            >
              Esplora le risorse per gli enti
            </Button>
          </Box>
        </>
      ),
    },
  },
];

export const assistenzaData = {
  headingTitles,
  tabs,
  contentBlocks,
};
