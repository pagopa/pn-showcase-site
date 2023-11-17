import { Typography, List, ListItem, SvgIcon } from "@mui/material";
import {
  HeroProps,
  HorizontalNavProps,
  WalkthroughProps,
} from "@pagopa/mui-italia";
import {
  IMAGES_PATH,
  MANUALE_URL,
  PARTNER_AND_INTERMEDIARIES_PATH,
  PN_PF_URL,
  PN_PG_URL,
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
  HistoryIcon,
  CloudIcon,
  HourglassIcon,
  PiggyIcon,
  WalletIcon,
  NotificationIcon,
  DocCheckIcon
} from "../icons";

const heroSubtitleImprese =
  "SEND - Servizio Notifiche Digitali è la piattaforma che semplifica la ricezione delle notifiche a valore legale. Visualizza, paga e archivia le notifiche inviate alla tua impresa in un unico spazio accessibile anche dai tuoi collaboratori.";
export const piHero: HeroProps = {
  type: "image",
  title: "Le notifiche della tua impresa? Tutte qui.",
  subtitle: (
    <Typography
      component="p"
      tabIndex={0}
      aria-label={heroSubtitleImprese}
      sx={{
        color: "primary.contrastText",
      }}
    >
      {heroSubtitleImprese}
    </Typography>
  ),
  inverse: true,
  image: `${IMAGES_PATH}/pi-hero-foreground.png`,
  altText:
    "Lo schermo di un computer portatile mostra la pagina principale della piattaforma SEND.",
  background: `${IMAGES_PATH}/pi-hero-background.png`,
  ctaSecondary: {
    label: "Accedi a SEND",
    title: "Accedi a SEND",
    onClick: function onClick() {
        window.open(PN_PG_URL, "_self");
    },
  },
};
/* ************************************** */

/** Infoblocks mocked data */
const infoblock1_1 =
  "Con SEND puoi visualizzare, pagare e gestire le notifiche inviate alla tua impresa in modo semplice, veloce e totalmente digitale.";
const infoblock1_2 =
  "Oltre ad accedere agli atti notificati, su SEND puoi anche pagare eventuali costi grazie all’integrazione con pagoPA e visualizzare lo storico delle notifiche ricevute.";
const infoblock2_1 =
  "Puoi abilitare più utenti all’uso della piattaforma. Così, le comunicazioni potranno essere gestite da più persone, che resteranno aggiornate sul lavoro degli altri in tempo reale.";
const infoblock2_2 =
  "Un modo efficace per migliorare la gestione delle notifiche all’interno dell’impresa  e avere maggiore controllo delle scadenze e di quanto versato.";

export const piInfoBlocks: Array<IInfoblockData> = [
  {
    name: "infoblock 1",
    data: {
      overline: "PER LE IMPRESE",
      title: "Un nuovo modo per gestire le notifiche della tua impresa",
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
      inverse: true,
      image: `${IMAGES_PATH}/pi-infoblock-1.png`,
      altText:
        "Un uomo lavora al computer, seduto alla scrivania di un ufficio.",
      imageShadow: true,
      aspectRatio: "9/16"
    },
  },
  {
    name: "infoblock 2",
    data: {
      title: "Un lavoro di squadra",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2_1}>
            {infoblock2_1}
          </Typography>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock2_2}>
            {infoblock2_2}
          </Typography>
        </>
      ),
      inverse: false,
      image: `${IMAGES_PATH}/pi-infoblock-2.png`,
      altText:
        "Un esempio della sezione “stato della notifica” della piattaforma SEND.",
      imageShadow: false,
      ctaPrimary: {
        label: "Leggi le notifiche della tua impresa",
        title: "Leggi le notifiche della tua impresa",
        onClick: function onClick() {
            window.open(PN_PG_URL, "_self");
        },
      }
    },
  },
];
/* ************************************** */

/** Showcase mocked data */
const showcase_1 =
  "Gestisci tutte le notifiche inviate all’azienda in un solo posto";
const showcase_2 =
  "Grazie all’integrazione con pagoPA, pagare è semplice e veloce";
const showcase_3 =
  "Più persone possono gestire contemporaneamente le notifiche e rimanere aggiornate in tempo reale";
const showcase_4 =
  "Risparmi sulle spese di notifica e sui costi di gestione";

export const piShowcases: Array<IShowcaseData> = [
  {
    name: "showcase 1",
    data: {
      title: "Un nuovo servizio per essere un’impresa innovativa ",
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
          icon: <HourglassIcon />,
          title: "Veloce",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase_2}>
              {showcase_2}
            </Typography>
          ),
        },
        {
          icon: <CloudIcon />,
          title: "Condiviso",
          subtitle: (
            <Typography variant="body2" tabIndex={0} aria-label={showcase_3}>
              {showcase_3}
            </Typography>
          ),
        },
        {
          icon: <PiggyIcon />,
          title: "Conveniente",
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
  "Per ogni notifica, SEND verifica che ci sia una PEC associata alla tua impresa per l'invio dell'avviso di avvenuta ricezione. Invia anche un avviso di cortesia agli altri tuoi recapiti digitali (e-mail e numero di cellulare), se li hai inseriti. Se non hai indicato alcun recapito digitale e non accedi online alla notifica attraverso SEND, riceverai una raccomandata cartacea.";
const paWalkthrough2 =
  "Dal messaggio ricevuto, puoi accedere online alla piattaforma per leggere la notifica e scaricare i relativi atti notificati.";
const paWalkthrough2_1 =
  "Il primo accesso a SEND deve essere effettuato dal legale rappresentante, che deve registrare l’impresa in piattaforma.";
const paWalkthrough3 =
  "Se c'è un importo da pagare, grazie all'integrazione con pagoPA, puoi procedere al pagamento online. Se preferisci recarti presso uno sportello, dovrai avere con te il modulo di pagamento allegato alla notifica.";
const paWalkthrough4 =
  "Per ogni notifica, puoi vedere lo storico degli stati e le relative attestazioni opponibili a terzi.";

export const piWalkthrough: WalkthroughProps = {
  title: "Come funziona?",
  items: [
    {
      icon: <NotificationIcon color="primary" />,
      title: "Ricevi la notifica",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough1}>
          {paWalkthrough1}
        </Typography>
      ),
    },
    {
      icon: <DocCheckIcon color="primary" />,
      title: "Leggi il contenuto",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough2}>
          {paWalkthrough2}
        </Typography>
      ),
    },
    {
      icon: <WalletIcon color="primary" />,
      title: "Paga le spese",
      subtitle: (
        <Typography variant="body2" tabIndex={0} aria-label={paWalkthrough3}>
          {paWalkthrough3}
        </Typography>
      ),
    },
    {
      icon: <HistoryIcon color="primary" />,
      title: "Visualizza lo storico",
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

export const piHorizontalNav: HorizontalNavProps = {
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
