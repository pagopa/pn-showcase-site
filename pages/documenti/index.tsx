import type { NextPage } from "next";
import { Infoblock, Showcase, Walkthrough, Hero } from "@pagopa/mui-italia";

import { UserType } from "../../model";
import PageHead from "../../src/components/PageHead";
import {
  getHeroData,
  getInfoblockData,
  getShowcaseData,
  getWalkthroughData,
} from "../../api";
import { Link, Tab, Tabs, Stack } from "@mui/material";
import { Cards1, Cards2, StripeLink } from "api/data/it/PD";

const USER_TYPE = UserType.PD;

const DocumentiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Documenti"
      description="Pagina Documenti"
    />

    <main className="documenti">
      <div className="cardsContainerDark"><Cards1></Cards1></div>
      <Cards2></Cards2>
      <StripeLink></StripeLink>
    </main>
  </>
);

export default DocumentiPage;
