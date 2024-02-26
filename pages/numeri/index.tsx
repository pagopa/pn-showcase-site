import type { NextPage } from "next";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Completion from "src/components/Numeri/components/Completion";
import DashboardIntro from "src/components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "src/components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "src/components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "src/components/Numeri/components/KpiNotifications";
import NotificationsTrend from "src/components/Numeri/components/NotificationsTrend";
import TopServices from "src/components/Numeri/components/TopServices";
import { curYear, firstYear } from "src/components/Numeri/shared/constants";
import Tabs from "src/components/Tabs";
import PageHead from "../../src/components/PageHead";

type Tabs = {
  id: number | null;
  label: string;
};

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years];

const NumeriPage: NextPage = () => {
  const [selYear, setSelYear] = useState<number | null>(null);

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };

  return (
    <>
      <PageHead
        title="SEND - SEND in numeri"
        description="In questa pagina trovi le statistiche relative a SEND, aggiornate quotidianamente"
      />
      <Box mt={10}>
        <Typography align="center" variant="h2">
          SEND in numeri
        </Typography>
        <DashboardIntro />
        {/* <HeadingTitle
          title="SEND in numeri"
          subtitle={
            <Stack>
              <Typography>
                Scopri i numeri di Piattaforma Notifiche ......
              </Typography>{" "}
              <DashboardIntro />
            </Stack>
          }
        /> */}
      </Box>

      {/* <Hero
                title="I numeri di SEND"
                type="text"
                background={`${IMAGES_PATH}/hero-faq-background-2.png`}
                subtitle={
                    <Stack>
                        <Typography color="#fff">Scopri i numeri di Piattaforma Notifiche ......</Typography> <DashboardIntro />

                    </Stack>
                } /> */}
      <Tabs tabs={tabs.map((tab) => tab.label)} onTabChange={handleTabChange} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title="Notifiche inviate"
          description="I seguenti dati si riferiscono alle notifiche inviate dagli enti della pubblica amministrazione"
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            <Completion selYear={selYear} />
            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title="Enti e Servizi"
          description="Scopri quanti enti stanno usando SEND e per quali servizi"
          background="grey"
        >
          <Box mb={2}>
            <KpiAuthoritiesServices />
            <TopServices />
          </Box>
        </DataSectionWrapper>
      </Box>
    </>
  );
};

export default NumeriPage;
