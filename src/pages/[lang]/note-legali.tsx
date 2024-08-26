/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { useEffect } from "react";
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";

import { langCodes, ONE_TRUST_LEGAL_NOTICES_PAGE } from "@utils/constants";
import PageHead from "../../components/PageHead";
import { getI18n } from "../../api/i18n";
import { LangCode } from "../../model";
import { useTranslation } from "../../hook/useTranslation";

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
  const translations = getI18n(params.lang, ["common", "note-legali"]);

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

const LegalNoticesPage: NextPage = () => {
  const { t } = useTranslation(["common", "note-legali"]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof OneTrust !== "undefined" && ONE_TRUST_LEGAL_NOTICES_PAGE) {
        clearInterval(interval);
        OneTrust.NoticeApi.Initialized.then(() => {
          OneTrust.NoticeApi.LoadNotices([ONE_TRUST_LEGAL_NOTICES_PAGE], false);
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageHead
        title={t("title", { ns: "note-legali" })}
        description={t("description", { ns: "note-legali" })}
      />
      <Script
        src="/onetrust/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript"
        charSet="UTF-8"
        id="otprivacy-notice-script"
        strategy="beforeInteractive"
      />
      <div
        id="otnotice-eca0fddd-9d79-474d-90e4-aa30dd0c0313"
        className="otnotice"
      ></div>
    </>
  );
};

export default LegalNoticesPage;
