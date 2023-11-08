import { Typography, List, ListItem, SvgIcon, Box, Stack, Container, Grid, Button } from "@mui/material";
import {
  HeroProps,
  HorizontalNavProps,
  WalkthroughProps,
} from "@pagopa/mui-italia";
import {
  IMAGES_PATH,
  MANUALE_URL,
  PARTNER_AND_INTERMEDIARIES_PATH,
} from "@utils/constants";
import { IInfoblockData, IShowcaseData } from "model";
import Link from "next/link";
import {
  PeopleIcon,
  FireworksIcon,
  EasyIcon,
  CheckmarkIcon,
  DeliverIcon,
  SendIcon,
  SyncIcon,
  UploadIcon,
} from "../icons";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MessageIcon from '@mui/icons-material/Message';

const heroSubtitle =
  "SEND, Servizio Notifiche Digitali (anche nota come Piattaforma Notifiche Digitali di cui all'art. 26 del decreto-legge 76/2020 s.m.i.)  digitalizza la gestione delle comunicazioni a valore legale, semplificando il processo per tutti: chi le invia, e chi le riceve.";
const heroSubtitle2 =
  "E da oggi anche a farsi. ";
export const paHero: HeroProps = {
  type: "image",
  title: "Inviare notifiche? Facile a dirsi.",
  subtitle: (
    <Typography
      component="p"
      tabIndex={0}
      aria-label={heroSubtitle}
      sx={{
        color: "primary.contrastText",
      }}
    >
      <Typography
        component="span"
        sx={{
          fontWeight: "bold",
          color: "primary.contrastText",
        }}
      >
        {heroSubtitle2}
      </Typography>
      {heroSubtitle}
    </Typography>
  ),
  inverse: false,
  image: `${IMAGES_PATH}/hero-enti-foreground.png`,
  altText:
    "Immagini di alcuni form per l'invio di nofiche digitali",
  background: `${IMAGES_PATH}/hero-enti-background.png`,
  ctaPrimary: {
    label: "Scopri come aderire a SEND",
    title: "Scopri come aderire a SEND",
    /* Carlotta Dimatteo - workaround per gestire un anchor interno alla pagina richiesto dal team di comunicazione il 16/02/2023 */
    onClick: function onClick() {
      const loc = document.location.toString().split("#")[0];
      document.location = loc + "#start-integration";
      return false;
    },
  },
};
/* ************************************** */

/** Infoblocks mocked data */
const infoblock1_1 =
  "SEND - Servizio Notifiche Digitali solleva gli enti da tutti gli adempimenti legati alla gestione delle comunicazioni a valore legale e riduce l’incertezza della reperibilità del destinatario.";
const infoblock1_2 =
  "Gli enti non devono fare altro che depositare l’atto da notificare: sarà la piattaforma a occuparsi dell’invio, per via digitale o analogica, con conseguente risparmio di  tempi e costi dell’intero processo.";
const infoblock2_1 =
  "SEND si integra con il protocollo degli enti e offre sia API per l'invio automatico delle notifiche, sia la possibilità di fare invii manuali. Una volta effettuato il caricamento degli atti e dei moduli di pagamento, la piattaforma genera lo IUN, un codice univoco identificativo della notifica.";
const infoblock2_2 =
  "Successivamente, cerca nei suoi archivi e nei registri pubblici una PEC riconducibile al destinatario e invia la notifica. Al contempo, invia un avviso di cortesia agli altri recapiti digitali (app IO, email e numero di cellulare) del destinatario.";
const infoblock2_3 =
  "Se il destinatario non ha indicato alcun recapito digitale e non ha accesso alla piattaforma, questa procede con la ricerca di un indirizzo fisico, e quindi con l'invio tramite raccomandata cartacea.";
const infoblock3_1 =
  "Il destinatario accede alla piattaforma tramite SPID o CIE, dove può visualizzare e scaricare l'atto notificato. Grazie all'integrazione con pagoPA, può anche pagare contestualmente ,se previsto, quanto dovuto. Se ha attivato il servizio su IO, potrà fare tutto direttamente in app.";
const infoblock3_2 =
  "Come l'ente, anche il destinatario ha accesso alla cronologia degli stati della notifica e alle attestazioni opponibili a terzi che ne danno prova.";
const infoblock4_2 =
  "Il tuo ente ha già aderito a SEND?";
const infoblock4_3 =
  "Se il tuo ente ha aderito a SEND e sei un utente autorizzato, accedi tramite l'Area Riservata.";

export const paInfoBlocks: Array<IInfoblockData> = [
  {
    name: "infoblock 1",
    data: {
      overline: "PER GLI ENTI",
      title: "Il processo di notificazione diventa più semplice",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock1_1}>
            {infoblock1_1}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock1_2}>
            {infoblock1_2}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pa-infoblock-5.png`,
      altText:
        "Un esempio della sezione “stato della notifica” della piattaforma SEND.",
      imageShadow: true,
    },
  },
  {
    name: "infoblock 2",
    data: {
      title: "Carica l'atto. Poi, dimenticatene",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2_1}>
            {infoblock2_1}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2_2}>
            {infoblock2_2}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2_3}>
            {infoblock2_3}
          </Typography>
        </>
      ),
      inverse: true,
      image: `${IMAGES_PATH}/pa-infoblock-6.png`,
      altText:
        "Un esempio della sezione “Invia una nuova” della piattaforma SEND.",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 3",
    data: {
      title: "E il destinatario?",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock3_1}>
            {infoblock3_1}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock3_2}>
            {infoblock3_2}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pa-infoblock-3.png`,
      altText:
        "Le mani di una persona digitano sulla tastiera di un computer portatile. Lo schermo mostra una pagina della piattaforma SEND.",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 4",
    data: {
      title: "",
      content: (
        <>
          <Typography sx={{color: "primary.contrastText"}} variant="h4" tabIndex={0} aria-label={infoblock4_2}>
            {infoblock4_2}
          </Typography>
          <Typography sx={{color: "primary.contrastText"}} variant="body2" tabIndex={0} aria-label={infoblock4_3}>
            {infoblock4_3}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pa-infoblock-3.png`,
      altText:
        "Le mani di una persona digitano sulla tastiera di un computer portatile. Lo schermo mostra una pagina della piattaforma SEND.",
      imageShadow: false,
      ctaPrimary: {
        label: "Accedi a SEND",
        title: "Accedi a SEND",
        onClick: function() {
        },
      },
    },
  },
];
/* ************************************** */

/** Showcase mocked data */
const showcase_1 =
  "Le notifiche sono inviate, gestite e monitorate tramite un solo canale, accessibile da più referenti dello stesso ente";
const showcase_2 =
  "Si possono caricare notifiche tramite API o manualmente: depositato l’atto, la piattaforma si occupa dell'invio e tiene traccia dei cambi di stato";
const showcase_3 =
  "Se il destinatario ha un recapito digitale, i tempi di invio diminuiscono notevolmente";
const showcase_4 =
  "Il processo di notificazione è normato e c'è maggiore certezza di consegna al destinatario";

export const paShowcases: Array<IShowcaseData> = [
  {
    name: "showcase 1",
    data: {
      title: "Un nuovo modo per gestire le notifiche",
      items: [
        {
          icon: <PeopleIcon />,
          title: "Unico",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase_1}>
              {showcase_1}
            </Typography>
          ),
        },
        {
          icon: <FireworksIcon />,
          title: "Semplice",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase_2}>
              {showcase_2}
            </Typography>
          ),
        },
        {
          icon: <EasyIcon />,
          title: "Immediato",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase_3}>
              {showcase_3}
            </Typography>
          ),
        },
        {
          icon: <CheckmarkIcon />,
          title: "Certo",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase_4}>
              {showcase_4}
            </Typography>
          ),
        },
      ],
    },
  },
];
/* ************************************** */

/** Walkthrough mocked data */
const paWalkthrough1 =
  "Con l'uso di API Key o manualmente, l'ente crea la richiesta di notifica e carica gli allegati.";
const paWalkthrough2 =
  "SEND verifica la completezza delle informazioni. Ad ogni cambio di stato, viene sempre generata la relativa attestazione opponibile a terzi.";
const paWalkthrough3 =
  "SEND comunica al destinatario la presenza di una notifica tramite diversi possibili canali: PEC, App IO, email, SMS. In alternativa, invia una raccomandata cartacea all'indirizzo fisico fornito dall'ente.";
const paWalkthrough4 =
  "Il destinatario accede alla piattaforma. Lì, può scaricare i documenti notificati e pagare  contestualmente quanto dovuto, grazie all'integrazione con pagoPA. Se la riceve tramite IO, può fare  tutto direttamente in app.";

export const paWalkthrough: WalkthroughProps = {
  title: "Come funziona?",
  items: [
    {
      icon: <UploadIcon color="primary" />,
      title: "L'ente crea la richiesta di notifica",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough1}>
          {paWalkthrough1}
        </Typography>
      ),
    },
    {
      icon: <SyncIcon color="primary" />,
      title: "La piattaforma la prende in carico",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough2}>
          {paWalkthrough2}
        </Typography>
      ),
    },
    {
      icon: <SendIcon color="primary" />,
      title: "La notifica viene inviata",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough3}>
          {paWalkthrough3}
        </Typography>
      ),
    },
    {
      icon: <DeliverIcon color="primary" />,
      title: "Il destinatario la riceve",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough4}>
          {paWalkthrough4}
        </Typography>
      ),
    },
  ],
};
/* ************************************** */

/** HorizontalNav mocked data */
const horizontalNav1 =
  "Gestisci le notifiche della tua impresa in un unico spazio, in collaborazione con i colleghi.";
const horizontalNav2 =
  "Attiva il servizio sull'app IO: così se accederai a XYZ entro 7 giorni dalla ricezione del messaggio in app, non riceverai il cartaceo e rispamierai tempo e denaro.";

export const paHorizontalNav: HorizontalNavProps = {
  // const paHorizontalNav = {
  sections: [
    {
      icon: (
        <SvgIcon component="image">
          <img src="static/icons/HORIZONTAL-NAV-1.svg" />
        </SvgIcon>
      ),
      title: "Rappresenti un'impresa?",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={horizontalNav1}>
          {horizontalNav1}
        </Typography>
      ),
      cta: {
        label: "Scopri i vantaggi per le imprese",
        title: "CTA1",
        href: "#",
      },
    },
    {
      icon: (
        <SvgIcon component="image">
          <img src="static/icons/HORIZONTAL-NAV-2.svg" />
        </SvgIcon>
      ),
      title: "Sei una cittadina o un cittadino?",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={horizontalNav2}>
          {horizontalNav2}
        </Typography>
      ),
      cta: {
        label: "Scopri i vantaggi per i cittadini",
        title: "CTA1",
        href: "#",
      },
    },
  ],
};
/* ************************************** */


export const StripeLinkEnti = () => {
  return (
      <Box sx={{ backgroundColor: "#17324D" }} padding={2}>
          <Container maxWidth="xl">
              <Grid container spacing={2} >
                  <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      <Typography variant="body2" color="white" display={"flex"} justifyContent={"center"} alignItems={"center"}>
                          <MessageIcon sx={{ fontSize: "20px", marginRight: "10px" }} />
                          Vuoi comunicare l’adesione a SEND ai cittadini?
                      </Typography>
                      <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} sx={{ marginLeft: "1em" }}>
                        Vai al kit di comunicazione
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  </Grid>
              </Grid>
          </Container>
      </Box>
  );
};