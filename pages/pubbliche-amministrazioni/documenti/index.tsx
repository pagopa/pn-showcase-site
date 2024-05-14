import type { NextPage } from "next";

import PageHead from "../../../src/components/PageHead";

import { DocsCards, InDepthCard, StripeLink } from "api/data/it/PD";

const DocumentiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Servizio Notifiche Digitali | Documenti per gli enti"
      description="Come aderire a SEND: la documentazione necessaria per aderire al Servizio Notifiche Digitali come ente mittente"
    />

    <main className="documenti">
      <div className="cardsContainerDark"><DocsCards></DocsCards></div>
      <InDepthCard></InDepthCard>
      <StripeLink></StripeLink>
    </main>
  </>
);

export default DocumentiPage;
