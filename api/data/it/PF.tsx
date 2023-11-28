import { Box, Button, Container, Grid, Link, List, ListItem, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { HeroProps, WalkthroughProps } from "@pagopa/mui-italia";
import { IMAGES_PATH, PN_PF_URL } from "@utils/constants";
import { IInfoblockData, IShowcaseData } from "model";
import {
  PiggyIcon,
  HourglassIcon,
  EcologyIcon,
  CloudIcon,
  PECIcon,
  MessageIcon,
  DelegationIcon,
  DocCheckIcon,
  NotificationIcon,
  WalletIcon,
} from "../icons";

const onReadClick = () => {
  window.open(PN_PF_URL, "_blank");
};

// eslint-disable-next-line no-extra-boolean-cast
const heroCta = !!PN_PF_URL
  ? {
    label: "Leggi le tue notifiche",
    title: "Leggi le tue notifiche",
    onClick: function onClick() {
      window.open(PN_PF_URL, "_self");
    },
  }
  : undefined;

const heroSubtitle = `Con SEND - Servizio Notifiche Digitali (anche nota come Piattaforma Notifiche Digitali di cui all'art. 26 del decreto-legge 76/2020 s.m.i.) puoi ricevere istantaneamente le comunicazioni a valore legale da parte di un ente. Potrai visualizzarle, gestirle e pagarle direttamente online sulla piattaforma o dall'app IO.`;

export const pfHero: HeroProps = {
  type: "image",
  title: "Le notifiche? Sono a portata di mano",
  subtitle: (
    <Typography
      component="p"
      tabIndex={0}
      aria-label={heroSubtitle}
      sx={{
        color: "primary.contrastText",
      }}
    >
      {heroSubtitle}
    </Typography>
  ),
  ctaSecondary: heroCta,
  inverse: false,
  image: `${IMAGES_PATH}/hero-cittadini-foreground.png`,
  altText:
    "Una mano regge uno smartphone. Lo schermo mostra il dettaglio di una notifica.",
  background: `${IMAGES_PATH}/hero-cittadini-background.png`,
};
/* ************************************** */

/** Infoblocks mocked data */
const infoblock1_1 = `Le notifiche sono comunicazioni a valore legale emesse in via ufficiale da un'amministrazione pubblica, come esiti di pratiche amministrative o rimborsi, multe e avvisi di accertamento di tributi. Da oggi puoi riceverle e consultarle in digitale, accedendo online a SEND - Servizio Notifiche Digitali tramite SPID o CIE o direttamente dall’app IO.`;

const infoblock1_2 = `Puoi anche pagare eventuali costi grazie all'integrazione con pagoPA, visualizzare lo storico delle notifiche ricevute e gestirle direttamente online. Inoltre, ti basta accettare una delega per accedere anche alle notifiche dei tuoi familiari.`;

const infoblock2 = `Per inviarti le comunicazioni a valore legale, SEND dà la priorità ai tuoi recapiti digitali. In ogni momento, puoi accedere online al Servizio Notifiche Digitali con SPID o CIE per indicare o aggiornare il tuo domicilio digitale di piattaforma oppure i tuoi recapiti per ricevere un messaggio di cortesia, quando un ente ti invia una notifica: app IO, email e/o numero di cellulare.`;

const infoblock2_1 = `Se non hai indicato nessuno di questi recapiti digitali, non risulta a te associata una pec e non accedi alla notifica su SEND entro i tempi indicati, riceverai tramite raccomandata cartacea un Avviso di Avvenuta Ricezione con le indicazioni per visualizzare online gli atti notificati o ritirarli presso un qualsiasi ufficio postale.`;

const infoblock3_2 = `Le Pubbliche Amministrazioni stanno gradualmente adottando il nuovo Servizio Notifiche Digitali, per questo è possibile che non tutti gli atti ti saranno già notificati con questa modalità.`;

const infoblock3_3 = `Il futuro delle comunicazioni a valore legale`;

const infoblock3_4 = `SEND è a disposizione degli enti che potranno utilizzarlo per inviare notifiche ai destinatari delle loro comunicazioni a valore legale.`;

const infoblock4 = `Se hai indicato un indirizzo PEC, le notifiche risulteranno legalmente consegnate, senza più raccomandate cartacee. L'avviso di avvenuta ricezione che ti sarà inviato contiene il link per accedere ai documenti su SEND.`;

const infoblock5 = `In più, puoi anche scegliere di ricevere un avviso di cortesia al tuo indirizzo e-mail o tramite SMS. Se non hai la PEC ma accedi alla notifica attraverso SEND dall'apposito link entro 5 giorni (120 ore) dalla ricezione della notifica, questa risulterà legalmente recapitata e non riceverai alcuna raccomandata cartacea.`;

const infoblock6 = `L’Avviso di Avvenuta Ricezione è un documento che SEND invia al destinatario della notifica, che ha valore legale e contiene le informazioni essenziali per consultare i documenti notificati.`;

const infoblock6_1 = `Se non accedi alla notifica in digitale nei tempi previsti, riceverai via posta un avviso di avvenuta ricezione cartaceo. Segui le istruzioni  riportate sull’Avviso per scegliere come ottenere la notifica e i documenti ad essa allegati secondo le tue preferenze:`;

const infoblock6_2 = `Se vuoi delegare qualcuno al ritiro della notifica presso l’ufficio postale, ti basterà compilare il modulo presente sull’avviso.`;

const infoblock6_3 = `Puoi consulare i termini e le condizioni del servizio “Stampa Notifica” su `;

const infoblock6_4 = `poste.it`;

const infoblock6_5 = ` e in Ufficio Postale.`;

export const pfInfoBlocks: Array<IInfoblockData> = [
  {
    name: "infoblock 1",
    data: {
      // overline: "PER I CITTADINI",
      title: "Non perderti più nessuna notifica",
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
      image: `${IMAGES_PATH}/pf-infoblock-4.png`,
      altText:
        "Immagine di due notifiche",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 2",
    data: {
      title: "Scegli tu come ricevere le notifiche",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2}>
            {infoblock2}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2_1}>
            {infoblock2_1}
          </Typography>
        </>
      ),
      inverse: true,
      image: `${IMAGES_PATH}/pf-infoblock-3.png`,
      aspectRatio: "9/16",
      altText:
        "Un uomo, con uno smartphone in mano, guarda in camera.",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 3",
    data: {
      title: "",
      content: (
        <>
          <Typography variant="h4" tabIndex={0} aria-label={infoblock3_3} sx={{ color: "primary.contrastText" }}>
            {infoblock3_3}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock3_4} sx={{ color: "primary.contrastText" }}>
            {infoblock3_4}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock3_2} sx={{ color: "primary.contrastText" }}>
            {infoblock3_2}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pa-infoblock-4.png`,
      altText: "Una donna guarda il monitor del notebook.",
      aspectRatio: "9/16",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 4",
    data: {
      title: "PEC",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock4}>
            {infoblock4}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pf-infoblock-5.png`,
      aspectRatio: "4/3",
      altText:
        "Immagine di una notifica su SEND",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 5",
    data: {
      title: "Email e SMS",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock5}>
            {infoblock5}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pf-infoblock-7.png`,
      aspectRatio: "4/3",
      altText:
        "Immagine di una notifica su SEND",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 6",
    data: {
      title: "Avviso di avvenuta ricezione",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock6}>
            {infoblock6}
          </Typography>

          <Typography variant="body2" tabIndex={0} aria-label={infoblock6_1}>
            {infoblock6_1}
          </Typography>

          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="body2">
                online, inquadrando il QR code riportato sull’Avviso o con accesso diretto al sito di SEND tramite SPID o CIE;
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="body2">
                recandoti di persona presso un ufficio postale, dove potrai richiedere il servizio a pagamento “Stampa notifica”, disponibile anche senza SPID o CIE.
              </Typography>
            </ListItem>
          </List>

          <Typography variant="body2" tabIndex={0} aria-label={infoblock6_2}>
            {infoblock6_2}
          </Typography>

          <Typography variant="body2" tabIndex={0} aria-label={infoblock6_3}>
            {infoblock6_3}
            <Link
              href="https://poste.it/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={infoblock6_4}
              sx={{ fontWeight: "bold", color: "#0073E6" }}
            >
              {infoblock6_4}
            </Link>
            {infoblock6_5}
          </Typography>
        </>
      ),
      inverse: true,
      image: `${IMAGES_PATH}/pf-infoblock-8.png`,
      aspectRatio: "4/3",
      altText:
        "Immagine di un avviso di avvenuta ricezione di una notifica su SEND",
      imageShadow: false,
    },
  },
];
/* ************************************** */

/** Showcase mocked data */
const showcase1_1 =
  "Il recapito delle notifiche in digitale comporta minori costi di notificazione e spedizione";
const showcase1_2 =
  "Niente più attese o code per il ritiro delle comunicazioni cartacee";
const showcase1_3 =
  "Contribuisci a ridurre il consumo di carta e le emissioni per il trasporto";
const showcase1_4 =
  "Non devi più conservare i documenti stampati, grazie alla possibilità di scaricare e archiviare gli atti in digitale";

const showcase2_1 = `Se hai indicato un indirizzo PEC, le notifiche risulteranno legalmente consegnate, senza più raccomandate cartacee. L'avviso di avvenuta ricezione che ti sarà inviato contiene il link per accedere ai documenti su SEND.`;

const showcase2_2 = `Se attivi il servizio “SEND - Notifiche digitali”, puoi ricevere un avviso di cortesia e gestire direttamente in app le comunicazioni a valore legale. Se non hai un indirizzo PEC ma accedi alla notifica dall'app e leggi la notifica entro 5 giorni (120 ore) dalla sua ricezione, questa risulterà legalmente recapitata e non riceverai alcuna raccomandata cartacea.`;

const showcase2_3 = `In più, puoi anche scegliere di ricevere un avviso di cortesia al tuo indirizzo e-mail o tramite SMS. Se non hai la PEC ma accedi alla notifica attraverso SEND dall'apposito link entro 5 giorni (120 ore) dalla ricezione della notifica, questa risulterà legalmente recapitata e non riceverai alcuna raccomandata cartacea.`;

export const pfShowcases: Array<IShowcaseData> = [
  {
    name: "showcase 1",
    data: {
      title: "Un solo modo per risparmiare in tanti modi",
      items: [
        {
          icon: <PiggyIcon />,
          title: "Convenienza",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase1_1}>
              {showcase1_1}
            </Typography>
          ),
        },
        {
          icon: <HourglassIcon />,
          title: "Tempo",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase1_2}>
              {showcase1_2}
            </Typography>
          ),
        },
        {
          icon: <EcologyIcon />,
          title: "Sostenibilità",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase1_3}>
              {showcase1_3}
            </Typography>
          ),
        },
        {
          icon: <CloudIcon />,
          title: "Spazio",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase1_4}>
              {showcase1_4}
            </Typography>
          ),
        },
      ],
    },
  },
  {
    name: "showcase 2",
    data: {
      title: "",
      items: [
        {
          icon: <PECIcon />,
          title: "PEC",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase2_1}>
              {showcase2_1}
            </Typography>
          ),
        },
        {
          /**
           * Waiting for IOIcon
           */
          // icon: <IOIcon />,
          icon: <img src={`${IMAGES_PATH}/IOIcon.svg`} />,
          title: "App IO",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase2_2}>
              {showcase2_2}
            </Typography>
          ),
        },
        {
          icon: <MessageIcon />,
          title: "Email e SMS",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase2_3}>
              {showcase2_3}
            </Typography>
          ),
        },
      ],
    },
  },
];
/* ************************************** */

/** Walkthrough mocked data */
const walkthrough1 = `Per ogni notifica, SEND verifica che ci sia una PEC a te associata o da te indicata per l'invio dell'avviso di avvenuta ricezione. Invia anche un avviso di cortesia agli altri tuoi recapiti digitali (app IO, e-mail e numero di cellulare), se li hai inseriti. Se non hai indicato alcun recapito digitale e non accedi online alla notifica attraverso SEND, riceverai l’Avviso di Avvenuta Ricezione tramite raccomandata cartacea.`;

const walkthrough2 = `Dal messaggio ricevuto, puoi accedere online alla piattaforma per leggere la notifica e scaricare i relativi documenti allegati. Se attivi il servizio su IO, puoi visualizzare il contenuto direttamente in app: questo equivale alla firma della ricevuta di ritorno di una raccomandata tradizionale e al `;

const walkthrough2_1 = `
 immediato della notifica.
`;
const walkthrough2_2 = `perfezionamento`;
const walkthrough3 = `
Se c'è un importo da pagare, grazie all'integrazione con pagoPA, puoi procedere contestualmente online da SEND 
oppure direttamente da IO. Se preferisci recarti presso uno sportello, dovrai avere con te il modulo di pagamento 
allegato alla notifica.
`;
const walkthrough4 = `Se lo desideri, puoi delegare altre persone, fisiche o giuridiche, a visualizzare le tue notifiche online. Per farlo, accedi a SEND con SPID o CIE e inserisci nella sezione Deleghe i dati della persona che vuoi delegare.`;
export const pfWalkthrough: WalkthroughProps = {
  title: "Come funziona?",
  items: [
    {
      icon: <NotificationIcon color="primary" />,
      title: "Ricevi la notifica",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={walkthrough1}>
          {walkthrough1}
        </Typography>
      ),
    },
    {
      icon: <DocCheckIcon color="primary" />,
      title: "Leggi il contenuto",
      subtitle: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={walkthrough2}>
            {walkthrough2}
            <Link
              href="/perfezionamento"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={walkthrough2_2}
              sx={{ fontWeight: "bold", color: "#0073E6" }}
            >
              {walkthrough2_2}
            </Link>
            {walkthrough2_1}
          </Typography>
        </>
      ),
    },
    {
      icon: <WalletIcon color="primary" />,
      title: "Paga le spese",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={walkthrough3}>
          {walkthrough3}
        </Typography>
      ),
    },
    {
      icon: <DelegationIcon color="primary" />,
      title: "Puoi delegare o essere delegato",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={walkthrough4}>
          {walkthrough4}
        </Typography>
      ),
    },
  ],
};
/* ************************************** */

/** HorizontalNav mocked data */
export const pfHorizontalNav = {
  sections: [
    {
      title: "",
      subtitle: "",
      cta: {
        label: "",
        title: "",
        href: "",
      },
    },
    {
      title: "",
      subtitle: "",
      cta: {
        label: "",
        title: "",
        href: "",
      },
    },
  ],
};
/* ************************************** */


export const InfoblockCustomCittadini = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonStyle = {
    color: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.7)",
      color: "#FFFFFF",
      boxShadow: 'none',
    },
    textTransform: 'none',
    width: '100%',
    boxShadow: 'none',
    padding: '6px 12px',
  };

  return (
    <Box pb={8} pt={8} sx={{ background: 'blue', color: 'white' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', padding: isMobile ? 1 : 4 }}>
              <img
                src="/static/images/pf-infoblock-6.png"
                alt="Descrizione immagine"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" tabIndex={0} aria-label="Come aderire a SEND" sx={{ color: "primary.contrastText" }} pb={4}>
              App IO
            </Typography>
            <Typography variant="body2" tabIndex={0} aria-label="" sx={{ color: "primary.contrastText" }} pb={2}>
              Se attivi il servizio “SEND - Notifiche digitali”, a ogni notifica riceverai un messaggio su IO. Potrai visualizzare i documenti notificati e pagare eventuali spese direttamente in app. Se non hai un indirizzo PEC ma accedi alla notifica dall'app e leggi la notifica entro 5 giorni (120 ore) dalla sua ricezione, questa risulterà legalmente recapitata e non riceverai alcuna raccomandata cartacea.
            </Typography>
            <Typography variant="body2" tabIndex={0} aria-label="" sx={{ color: "primary.contrastText" }} pb={2}>
              Scarica l’app:
            </Typography>
            <Stack direction="row" spacing={2} justifyContent={"flex-start"} alignItems={"center"} className="stack-responsive">
              <a
                href="https://play.google.com/store/apps/details?id=it.pagopa.io.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: 'auto' }}
              >
                <img
                  src="/static/images/google-play-badge.png"
                  alt="Disponibile su Google Play"
                  className="button-cittadini"
                />
              </a>
              <a
                href="https://apps.apple.com/it/app/io/id1501681835"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: 'auto' }}
              >
                <img
                  src="/static/images/app-store-badge.png"
                  alt="Disponibile su App store"
                  className="button-cittadini"
                />
              </a>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
