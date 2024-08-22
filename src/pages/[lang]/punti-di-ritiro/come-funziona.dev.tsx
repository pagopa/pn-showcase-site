/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";

import { langCodes, ONE_TRUST_RADD_TOS } from "@utils/constants";
import PageHead from "../../../components/PageHead";
import { useTranslation } from "src/hook/useTranslation";
import { getI18n } from "src/api/i18n";
import { LangCode } from "src/model";

declare const OneTrust: {
  NoticeApi: {
    Initialized: {
      then: (cbk: () => void) => void;
    };
    LoadNotices: (noticesUrls: Array<string>, flag: boolean) => void;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: langCodes.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: {
  params: { lang: LangCode };
}) {
  const translations = getI18n(params.lang, ["common", "pickup"]);

  return { props: { translations, lang: params.lang } };
}

const PrivacyPage: NextPage = () => {
  const { t } = useTranslation(["common", "pickup"]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof OneTrust !== "undefined" && ONE_TRUST_RADD_TOS) {
        clearInterval(interval);
        OneTrust.NoticeApi.Initialized.then(() => {
          OneTrust.NoticeApi.LoadNotices([ONE_TRUST_RADD_TOS], false);
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageHead
        title={t("how_it_works.title", { ns: "pickup" })}
        description={t("how_it_works.description", { ns: "pickup" })}
      />
      <Script
        src="/onetrust/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript"
        charSet="UTF-8"
        id="otprivacy-notice-script"
        strategy="beforeInteractive"
      />
      <div
        id="otnotice-0f437432-18d9-4f24-a0f5-b2c48c59eded"
        className={`otnotice`}
      ></div>
    </>
  );
};

export default PrivacyPage;
