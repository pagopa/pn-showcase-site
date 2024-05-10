import type { NextPage } from "next";

import PageHead from "../../../src/components/PageHead";

import { DocsCards, InDepthCard, StripeLink } from "api/data/it/PD";

const DocumentiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Documenti"
      description="Pagina Documenti"
    />

    <main className="documenti">
      <div className="cardsContainerDark"><DocsCards></DocsCards></div>
      <InDepthCard></InDepthCard>
      <StripeLink></StripeLink>
    </main>
  </>
);

export default DocumentiPage;
