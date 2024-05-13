/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { useEffect } from "react";
import type { NextPage } from "next";
import Script from "next/script";

import { ONE_TRUST_RADD_TOS } from "@utils/constants";
import PageHead from "src/components/PageHead";

declare const OneTrust: {
    NoticeApi: {
        Initialized: {
            then: (cbk: () => void) => void;
        };
        LoadNotices: (noticesUrls: Array<string>, flag: boolean) => void;
    };
};

const PrivacyPage: NextPage = () => {
    useEffect(() => {
        if (ONE_TRUST_RADD_TOS) {
            OneTrust.NoticeApi.Initialized.then(() => {
                OneTrust.NoticeApi.LoadNotices([ONE_TRUST_RADD_TOS], false);
            });
        }
    }, []);

    return (
        <>
            <PageHead
                title="SEND - Servizio Notifiche Digitali | Come funzionano i punti di ritiro"
                description="Scopri come funziona il servizio per ritirare sul territorio una copia delle comunicazioni a valore legale che ricevi tramite SEND"
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
