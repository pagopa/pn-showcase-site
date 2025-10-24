import type { GetStaticPaths, NextPage } from "next";

import { Box, Typography } from "@mui/material";
import { langCodes } from "@utils/constants";
import Script from "next/script";
import { useState } from "react";
import { getI18n } from "../../api/i18n";
import DashboardIntro from "../../components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "../../components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "../../components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "../../components/Numeri/components/KpiNotifications";
import NotificationsTrend from "../../components/Numeri/components/NotificationsTrend";
import TopServices from "../../components/Numeri/components/TopServices";
import { curYear, firstYear } from "../../components/Numeri/shared/constants";
import Tabs from "../../components/Tabs";
import { useTranslation } from "../../hook/useTranslation";
import { LangCode } from "../../model";

type Tabs = {
  id: number | null;
  label: string;
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
  const translations = getI18n(params.lang, ["common", "numeri"]);

  return {
    props: {
      translations,
      lang: params.lang,
    },
  };
}

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years];

const SendInNumbers: NextPage = () => {
  const { t } = useTranslation(["numeri"]);
  const [selYear, setSelYear] = useState<number | null>(null);

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };

  return (
    <>
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
      />

      <Box mt={8}>
        <Typography
          align="center"
          fontWeight={700}
          fontSize="14px"
          color="textSecondary"
          mb={3}
          sx={{ textTransform: "uppercase" }}
        >
          {t("hero.eyelet")}
        </Typography>

        <Typography align="center" variant="h2">
          {t("hero.title")}
        </Typography>
        <DashboardIntro />
      </Box>

      <Tabs tabs={tabs.map((tab) => tab.label)} onTabChange={handleTabChange} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title={t("sent_notifications.title")}
          description={t("sent_notifications.description")}
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            {/* <Completion selYear={selYear} /> */}
            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title={t("authorities_and_types.title")}
          description={t("authorities_and_types.description")}
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

export default SendInNumbers;
