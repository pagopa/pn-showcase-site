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
import { Cards, CardComponents, StripeLink } from "api/data/it/PD";

const USER_TYPE = UserType.PD;

const DocumentiPage: NextPage = () => (
  <>
    <PageHead
      title="SEND - Documenti"
      description="Pagina Documenti"
    />

    <main>
      <div id="dark"><Cards></Cards></div>
      <CardComponents></CardComponents>
      <StripeLink></StripeLink>
    </main>
  </>
);

export default DocumentiPage;
