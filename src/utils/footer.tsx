import { FooterLinksType, PreLoginFooterLinksType } from "@pagopa/mui-italia";
import { ACCESSIBILITY_PARTICULAR_LINK, PAGOPA_HOME } from "@utils/constants";
import { ILinkData, LangCode } from "../model";

type TranslationFunction = (key: string, options?: { ns: string }) => string;

export const companyLegalInfo: (
  t: TranslationFunction,
  lang: "it" | "en"
) => JSX.Element = (t, lang) => (
  <>
    <strong>{t("footer.company_info.name")}</strong>
    {t("footer.company_info.detail_info")}
    <br />
    {t("footer.company_info.detail_info_2")}
  </>
);

export const preLoginLinks: (
  t: TranslationFunction,
  lang: LangCode,
  windowURL?: string
) => PreLoginFooterLinksType = (t, lang, windowURL) => ({
  // First column
  aboutUs: {
    title: undefined,
    links: [
      {
        label: t("footer.pre_login.about_us.label"),
        href: `${PAGOPA_HOME}/${lang}/societa/chi-siamo`,
        ariaLabel: t("footer.pre_login.about_us.ariaLabel"),
        linkType: "external",
      },
      {
        label: t("footer.pre_login.pnrr.label"),
        href: `${PAGOPA_HOME}/${lang}/opportunita/pnrr/progetti`,
        ariaLabel: t("footer.pre_login.pnrr.ariaLabel"),
        linkType: "external",
      },
      {
        label: t("footer.pre_login.media.label"),
        href: `${PAGOPA_HOME}/${lang}/media`,
        ariaLabel: t("footer.pre_login.about_us.ariaLabel"),
        linkType: "external",
      },
      {
        label: t("footer.pre_login.work_with_us.label"),
        href: `${PAGOPA_HOME}/${lang}/lavora-con-noi`,
        ariaLabel: t("footer.pre_login.work_with_us.ariaLabel"),
        linkType: "external",
      },
    ],
  },
  // Third column
  resources: {
    title: t("footer.pre_login.resources.label"),
    links: [
      {
        label: t("footer.pre_login.resources.legal_notes.label"),
        href: `/${lang}/note-legali`,
        ariaLabel: t("footer.pre_login.resources.legal_notes.ariaLabel"),
        linkType: "internal",
      },
      {
        label: t("footer.pre_login.resources.privacy.label"),
        href: `/${lang}/informativa-privacy/`,
        ariaLabel: t("footer.pre_login.resources.privacy.ariaLabel"),
        linkType: "internal",
      },
      {
        label: t("footer.pre_login.resources.certifications.label"),
        href: "https://www.pagopa.it/it/certificazioni/",
        ariaLabel: t("footer.pre_login.resources.certifications.ariaLabel"),
        linkType: "internal",
      },
      {
        label: t("footer.pre_login.resources.information_security.label"),
        href: "https://www.pagopa.it/it/politiche-per-la-sicurezza-delle-informazioni/",
        ariaLabel: t(
          "footer.pre_login.resources.information_security.ariaLabel"
        ),
        linkType: "internal",
      },
      {
        label: t("footer.pre_login.resources.data_protection.label"),
        href: "https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8",
        ariaLabel: t("footer.pre_login.resources.data_protection.ariaLabel"),
        linkType: "internal",
      },
      // {
      //   label: "Preferenze Cookie",
      //   href: "https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8",
      //   ariaLabel: "Vai al link: Preferenze Cookie",
      //   linkType: "internal",
      // },
      {
        label: t("footer.pre_login.resources.transparent_company.label"),
        href: "https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html",
        ariaLabel: t(
          "footer.pre_login.resources.transparent_company.ariaLabel"
        ),
        linkType: "internal",
      },
      {
        label: t("footer.pre_login.resources.disclosure.label"),
        href: "https://www.pagopa.it/it/responsible-disclosure-policy/",
        ariaLabel: t("footer.pre_login.resources.disclosure.ariaLabel"),
        linkType: "internal",
      },
      {
        label: t("footer.pre_login.resources.model231.label"),
        href: "https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.htmls",
        ariaLabel: t("footer.pre_login.resources.model231.ariaLabel"),
        linkType: "internal",
      },
    ],
  },
  // Fourth column
  followUs: {
    title: t("footer.pre_login.followUs.title"),
    socialLinks: [
      {
        icon: "linkedin",
        title: t("footer.pre_login.followUs.linkedin.label"),
        href: "https://it.linkedin.com/company/pagopa",
        ariaLabel: t("footer.pre_login.followUs.linkedin.ariaLabel"),
      },
      {
        title: t("footer.pre_login.followUs.twitter.label"),
        icon: "twitter",
        href: "https://twitter.com/pagopa",
        ariaLabel: t("footer.pre_login.followUs.twitter.ariaLabel"),
      },
      {
        icon: "instagram",
        title: t("footer.pre_login.followUs.instagram.label"),
        href: "https://www.instagram.com/pagopaspa/?hl=en",
        ariaLabel: t("footer.pre_login.followUs.instagram.ariaLabel"),
      },
      {
        icon: "medium",
        title: t("footer.pre_login.followUs.medium.label"),
        href: "https://medium.com/pagopa-spa",
        ariaLabel: t("footer.pre_login.followUs.medium.ariaLabel"),
      },
    ],
    links: [
      {
        label: t("footer.pre_login.accessibility.label"),
        href:
          windowURL &&
          ACCESSIBILITY_PARTICULAR_LINK.LANDING_URL_PATTERN &&
          windowURL.includes(ACCESSIBILITY_PARTICULAR_LINK.LANDING_URL_PATTERN)
            ? ACCESSIBILITY_PARTICULAR_LINK.PARTICULAR_ACCESSIBILITY_URL
            : "https://form.agid.gov.it/view/eca3487c-f3cb-40be-a590-212eafc70058/",
        ariaLabel: t("footer.pre_login.accessibility.ariaLabel"),
        linkType: "internal",
      },
    ],
  },
});

export const postLoginLinks: (
  t: TranslationFunction,
  lang: "it" | "en"
) => Array<FooterLinksType> = (t, lang) => [
  {
    label: t("post_login.privacy.label"),
    href: `${lang}/privacy-policy`,
    ariaLabel: t("post_login.privacy.ariaLabel"),
    linkType: "internal",
  },
  {
    label: t("post_login.accessibility.label"),
    href: `${lang}accessibilita`,
    ariaLabel: t("post_login.accessibility.ariaLabel"),
    linkType: "internal",
  },
];

export const productJson = "/static/product.json";

export const pagoPALink: (
  t: TranslationFunction,
  lang: "it" | "en"
) => ILinkData = (t, lang) => ({
  label: t("footer.pagopaLink.label"),
  href: PAGOPA_HOME ?? "",
  ariaLabel: t("footer.pagopaLink.label"),
});
