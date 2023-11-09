import { Link, Typography } from "@mui/material";
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
    label: "Accedi a SEND",
    title: "Accedi a SEND",
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

const infoblock2 = `Per inviarti le comunicazioni a valore legale, SEND dà la priorità ai tuoi recapiti digitali. In ogni momento, puoi accedere online al Servizio Notifiche Digitali con SPID e CIE per indicare o aggiornare o il tuo recapito legale (PEC) oppure i tuo recapiti di cortesia (app IO, email e/o numero di cellulare). Se non indichi alcun recapito o non accedi alla notifica attraverso SEND da canali diversi dalla PEC `;

const infoblock2_1 = `entro i tempi indicati`;

const infoblock2_2 = `, continuerai a ricevere le notifiche tramite raccomandata cartacea.`;

const infoblock3_1 = `SEND è a disposizione di tutte le Pubbliche
Amministrazioni che vorranno utilizzarlo per inviare notifiche ai
destinatari delle loro comunicazioni a valore legale.`;

const infoblock3_2 = `Il servizio sarà adottato dagli enti progressivamente e, per favorirne la graduale diffusione tra i cittadini, in una prima fase assicurerà l'invio anche della copia analogica conforme degli atti notificati tramite raccomandata cartacea ai destinatari non dotati di recapito legale (PEC).`;

const infoblock3_3 = `Il futuro delle comunicazioni a valore legale`;

const infoblock3_4 = `SEND è a disposizione di tutti gli enti che vorranno utilizzarlo per inviare notifiche ai destinatari delle loro comunicazioni a valore legale.`;

export const pfInfoBlocks: Array<IInfoblockData> = [
  {
    name: "infoblock 1",
    data: {
      overline: "PER I CITTADINI",
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
              <Link
                href="/perfezionamento"
                // target="_blank"
                rel="noopener noreferrer"
                aria-label={infoblock2_1}
                sx={{fontWeight: "bold"}}
              >
                {infoblock2_1}
              </Link>
              {infoblock2_2}
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
const walkthrough1 = `
Per ogni notifica, SEND verifica che ci sia una PEC a te associata o da te indicata per l'invio dell'avviso 
di avvenuta ricezione. Invia anche un avviso di cortesia agli altri tuoi recapiti digitali 
(app IO, e-mail e numero di cellulare), se li hai inseriti. Se non hai indicato alcun recapito digitale 
e non accedi online  alla notifica attraverso SEND, riceverai una raccomandata cartacea.
`;
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
              sx={{ fontWeight: "bold" }}
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
      // isSequential: false,
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
