import React from "react";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DashboardIntro from "src/components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "src/components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "src/components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "src/components/Numeri/components/KpiNotifications";
import NotificationsTrend from "src/components/Numeri/components/NotificationsTrend";
import TopServices from "src/components/Numeri/components/TopServices";
import { curYear, firstYear } from "src/components/Numeri/shared/constants";
import Tabs from "src/components/Tabs";
import PageHead from "../src/components/PageHead";

type Tabs = {
  id: number | null;
  label: string;
};

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years];

const DashboardContent: NextPage = () => {
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
        title="dashboardContent"
        description="dashboardContent"
      />
      <Box mt={10}>
        <Typography align="center" variant="h2">
          SEND in numeri
        </Typography>
        <DashboardIntro />
      </Box>

      <Tabs tabs={tabs.map((tab) => tab.label)} onTabChange={handleTabChange} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title="Notifiche inviate"
          description="I seguenti dati si riferiscono alle notifiche inviate dagli enti della pubblica amministrazione"
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            {/* <Completion selYear={selYear} /> */}
            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title="Enti e tipologie di notifica inviate"
          description="I seguenti dati mostrano quanti Enti stanno utilizzando SEND e per quale tipologia di servizi"
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

// Questo fornirà le proprie proprietà iniziali specificando che non vogliamo il layout
DashboardContent.getInitialProps = async () => {
  return {
    noLayout: true,
  };
};

export default DashboardContent;
