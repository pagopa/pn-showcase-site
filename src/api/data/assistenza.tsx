import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
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

type CustomButtonProps = {
  href: string;
  text: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ href, text }) => (
  <Button
    size="small"
    color="primary"
    href={href}
    sx={{
      fontSize: "16px",
      fontWeight: "600",
      display: 'flex',
      alignItems: 'center',
      paddingTop: '8px'
    }}
  >
    {text}
    <ArrowForwardIcon sx={{ fontSize: "16px", ml: 0.5 }} />
  </Button>
);

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
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#17324D", wordBreak: "break-word" }}
                    >
                      Come posso accedere a SEND?
                    </Typography>
                    <CustomButton
                      href="/faq#send-come-accedere"
                      text="Leggi la risposta"
                    />
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#17324D", wordBreak: "break-word" }}
                    >
                      Cos’è un avviso di avvenuta ricezione?
                    </Typography>
                    <CustomButton
                      href="/faq#documenti-aar"
                      text="Leggi la risposta"
                    />
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#17324D", wordBreak: "break-word" }}
                    >
                      Cosa significa “perfezionamento”?
                    </Typography>
                    <CustomButton
                      href="/faq#perfezionamento-cosa-significa"
                      text="Leggi la risposta"
                    />
                  </CardContent>
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
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#17324D", wordBreak: "break-word" }}
                    >
                      Chi può inviare notifiche tramite SEND?
                    </Typography>
                    <CustomButton
                      href="https://docs.pagopa.it/send-faq-enti/argomenti/adesione/chi-puo-aderire"
                      text="Leggi le FAQ enti"
                    />
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#17324D", wordBreak: "break-word" }}
                    >
                      Come posso aderire a SEND con il mio ente?
                    </Typography>
                    <CustomButton
                      href="https://docs.pagopa.it/area-riservata-enti-piattaforma-notifiche/area-riservata-enti-send-servizio-notifiche-digitali/processo-di-adesione-a-send"
                      text="Scopri come aderire"
                    />
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    boxShadow: "0px 8px 38px 7px #002b551a",
                    borderRadius: "16px",
                    textAlign: "center",
                    wordWrap: "break-word",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "#17324D", wordBreak: "break-word" }}
                    >
                      Come funziona il processo di notificazione?
                    </Typography>
                    <CustomButton
                      href="https://docs.pagopa.it/manuale-operativo/piattaforma-notifiche-digitali-manuale-operativo/il-processo-di-notificazione"
                      text="Consulta il manuale"
                    />
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Container>
          <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              href="/pubbliche-amministrazioni/documenti/"
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
