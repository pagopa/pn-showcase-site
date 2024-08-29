/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";

import { langCodes, ONE_TRUST_PP_PAGE } from "@utils/constants";
import PageHead from "../../components/PageHead";
import { LangCode } from "../../model";
import { getI18n } from "../../api/i18n";
import { useTranslation } from "../../hook/useTranslation";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: { lang: LangCode } }) {
  const translations = getI18n(params.lang, ["common", "privacy"]);

  return { props: { translations, lang: params.lang } };
}

declare const OneTrust: {
  NoticeApi: {
    Initialized: {
      then: (cbk: () => void) => void;
    };
    LoadNotices: (noticesUrls: Array<string>, flag: boolean) => void;
  };
};

const loadOneTrust = () => {
  if (typeof OneTrust !== "undefined" && ONE_TRUST_PP_PAGE) {
    OneTrust.NoticeApi.Initialized.then(() => {
      OneTrust.NoticeApi.LoadNotices([ONE_TRUST_PP_PAGE], false);
    });
  }
};

const PrivacyPage: NextPage = () => {
  const { t } = useTranslation(["common", "privacy"]);

  return (
    <>
      <PageHead title={t("title", { ns: "privacy" })} description={t("description", { ns: "privacy" })} />
      <Script
        src="/onetrust/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript"
        charSet="UTF-8"
        id="otprivacy-notice-script"
        strategy="beforeInteractive"
        onReady={() => loadOneTrust()}
      />
      <div id="otnotice-b5c8e1dc-89df-4ec2-a02d-1c0f55fac052" className={`otnotice`}></div>
    </>
  );
};

export default PrivacyPage;
