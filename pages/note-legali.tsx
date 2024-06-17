/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { useEffect } from "react";
import type { NextPage } from "next";
import Script from "next/script";

import { ONE_TRUST_LEGAL_NOTICES_PAGE } from "@utils/constants";
import PageHead from "src/components/PageHead";

declare const OneTrust: {
  NoticeApi: {
    Initialized: {
      then: (cbk: () => void) => void;
    };
    LoadNotices: (noticesUrls: Array<string>, flag: boolean) => void;
  };
};

const LegalNoticesPage: NextPage = () => {
  useEffect(() => {
    if (ONE_TRUST_LEGAL_NOTICES_PAGE) {
      OneTrust.NoticeApi.Initialized.then(() => {
        OneTrust.NoticeApi.LoadNotices([ONE_TRUST_LEGAL_NOTICES_PAGE], false);
      });
    }
  }, []);

  return (
    <>
      <PageHead
        title="SEND - Servizio Notifiche Digitali | Note Legali"
        description="Note legali - Servizio Notifiche digitali"
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
