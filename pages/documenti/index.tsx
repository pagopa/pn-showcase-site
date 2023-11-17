import type { NextPage } from "next";

import PageHead from "../../src/components/PageHead";

import { Cards1, Cards2 } from "api/data/it/PD";

const DocumentiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Documenti"
      description="Pagina Documenti"
    />

    <main className="documenti">
      <div className="cardsContainerDark"><Cards1></Cards1></div>
      <Cards2></Cards2>
      {/* <StripeLink></StripeLink> */}
    </main>
  </>
);

export default DocumentiPage;
