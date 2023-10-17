import { Typography } from "@mui/material";
import { HeroProps } from "@pagopa/mui-italia";
import { IMAGES_PATH, PN_PF_URL, PN_PG_URL } from "@utils/constants";
import { IInfoblockData } from "model";

const onReadClickEnti = () => {
  window.open("/pubbliche-amministrazioni", "_blank");
};

const onReadClickCittadini = () => {
  window.open("/cittadini", "_blank");
};

const onReadClickImprese = () => {
  window.open("/", "_blank");
};

// eslint-disable-next-line no-extra-boolean-cast
const entiCta = !!"/pubbliche-amministrazioni"
  ? {
      label: "Scopri i vantaggi per gli enti",
      title: "Scopri i vantaggi per gli enti",
      onClick: onReadClickEnti,
    }
  : undefined;

const cittadiniCta = !!"/cittadini"
? {
    label: "Scopri i vantaggi per i cittadini",
    title: "Scopri i vantaggi per i cittadini",
    onClick: onReadClickCittadini,
  }
: undefined;

const impreseCta = !!"/"
? {
    label: "Scopri i vantaggi per le imprese",
    title: "Scopri i vantaggi per le imprese",
    onClick: onReadClickImprese,
  }
: undefined;

const heroSubtitle = `SEND è la piattaforma che rende più veloce, economico e sicuro l’invio e la ricezione delle notifiche a valore legale, semplificando il processo per tutti: gli enti che le inviano e i cittadini che le ricevono.`;

export const phHero: HeroProps = {
  type: "image",
  title: "Le comunicazioni a valore legale diventano digitali",
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
  inverse: false,
  image: `${IMAGES_PATH}/ph-hero-foreground.png`,
  altText:
    "Immagine della piattaforma SEND per Desktop e Mobile",
  background: `${IMAGES_PATH}/hero-home-background.png`,
};
/* ************************************** */

/** Infoblocks mocked data */
const infoblock1_1 = `SEND - Servizio Notifiche DIgitali solleva gli enti da tutti gli adempimenti legati alla gestione delle comunicazioni a valore legale e riduce l’incertezza della reperibilità del destinatario.`;

const infoblock1_2 = `Le amministrazioni non devono fare altro che depositare l’atto da notificare: sarà la piattaforma a occuparsi dell’invio, per via digitale o analogica, con conseguente risparmio di  tempi e costi dell’intero processo.`;

const infoblock2_1 = `I cittadini che lo desiderano possono ricevere e consultare le notifiche in digitale, accedendo a SEND tramite SPID o CIE o direttamente dall’app IO.`;

const infoblock2_2 = `In ogni caso la piattaforma garantisce libertà di scelta: i destinatari possono sempre indicare come ricevere le comunicazioni secondo le proprie preferenze e avere accesso alle notifiche in qualsiasi momento, via mobile e via web o da punti fisici.`;

const infoblock3_1 = `SEND mette a disposizione un unico spazio condiviso in cui diversi referenti di una stessa impresa possono visualizzare e gestire in modo totalmente digitale tutte le notifiche ricevute dalle varie Pubbliche Amministrazioni e pagare eventuali importi dovuti.`;

export const phInfoBlocks: Array<IInfoblockData> = [
  {
    name: "infoblock 1",
    data: {
      overline: "PER GLI ENTI",
      title: "Un modo più semplice di gestire le notifiche",
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
      ctaPrimary: entiCta,
      inverse: false,
      image: `${IMAGES_PATH}/ph-infoblock-1.png`,
      altText:
        "Anteprima della pagina Notifiche della piattaforma SEND su un notebook",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 2",
    data: {
      overline: "PER I CITTADINI",
      title: "Le notifiche delle pubbliche amministrazioni a portata di mano",
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
      ctaPrimary: cittadiniCta,
      inverse: true,
      image: `${IMAGES_PATH}/ph-infoblock-2.png`,
      altText:
        "Una mano regge uno smartphone. Lo schermo mostra il dettaglio di una notifica.",
      aspectRatio: "9/16",
      imageShadow: false,
    },
  },
  {
    name: "infoblock 3",
    data: {
      overline: "PER LE IMPRESE",
      title: "Tutto in un unico luogo ",
      content: (
        <>
          <Typography variant="body2" tabIndex={0} aria-label={infoblock1_1}>
            {infoblock3_1}
          </Typography>
        </>
      ),
      ctaPrimary: impreseCta,
      inverse: false,
      image: `${IMAGES_PATH}/ph-infoblock-3.png`,
      altText: "Un uomo ed una donna seduti al tavolo guardano un notebook",
      imageShadow: false,
    },
  },
];

/** HorizontalNav mocked data */
export const phHorizontalNav = {
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
