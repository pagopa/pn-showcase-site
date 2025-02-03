/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { GetStaticPaths, NextPage } from "next";
import Script from "next/script";

import { langCodes, ONE_TRUST_RADD_TOS } from "@utils/constants";
import { getI18n } from "../../api/i18n";
import { LangCode } from "../../model";

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

  return { props: { translations, lang: params.lang, noLayout: true } };
}

const loadOneTrust = () => {
  if (typeof OneTrust !== "undefined" && ONE_TRUST_RADD_TOS) {
    OneTrust.NoticeApi.Initialized.then(() => {
      OneTrust.NoticeApi.LoadNotices([ONE_TRUST_RADD_TOS], false);
    });
  }
};

const PrivacyPage: NextPage = () => {
  return (
    <>
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
        strategy="beforeInteractive"
      />

      <Script
        src="/onetrust/privacy-notice-scripts/otnotice-1.0.min.js"
        type="text/javascript"
        charSet="UTF-8"
        id="otprivacy-notice-script"
        strategy="beforeInteractive"
        onReady={() => loadOneTrust()}
      />
      <div
        id="otnotice-0f437432-18d9-4f24-a0f5-b2c48c59eded"
        className={`otnotice`}
      ></div>
    </>
  );
};

export default PrivacyPage;
