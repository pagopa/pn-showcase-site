import type { GetStaticPaths, NextPage } from "next";

import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import DashboardIntro from "../../../components/Numeri/components/DashboardIntro";
import { DataSectionWrapper } from "../../../components/Numeri/components/DataSectionWrapper";
import KpiAuthoritiesServices from "../../../components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "../../../components/Numeri/components/KpiNotifications";
import NotificationsTrend from "../../../components/Numeri/components/NotificationsTrend";
import TopServices from "../../../components/Numeri/components/TopServices";
import {
  curYear,
  firstYear,
} from "../../../components/Numeri/shared/constants";
import Tabs from "../../../components/Tabs";
import PageHead from "../../../components/PageHead";
import { langCodes } from "@utils/constants";
import { LangCode } from "../../../model";
import { getI18n } from "../../../api/i18n";
import { useTranslation } from "../../../hook/useTranslation";

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

  return { props: { translations, lang: params.lang } };
}

type Tabs = {
  id: number | null;
  label: string;
};

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const NumeriPage: NextPage = () => {
  const [selYear, setSelYear] = useState<number | null>(null);
  const { t } = useTranslation(["common", "numeri"]);

  const tabs: Tabs[] = useMemo(
    () => [{ id: null, label: t("total", { ns: "numeri" }) }, ...years],
    [years]
  );

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };

  return (
    <>
      <PageHead
        title={t("title", { ns: "numeri" })}
        description={t("description", { ns: "numeri" })}
        route="numeri"
      />
      <Box mt={10}>
        <Typography align="center" variant="h2">
          {t("hero.title", { ns: "numeri" })}
        </Typography>
        <DashboardIntro />
      </Box>

      <Tabs tabs={tabs.map((tab) => tab.label)} onTabChange={handleTabChange} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataSectionWrapper
          title={t("sent_notifications.title", { ns: "numeri" })}
          description={t("sent_notifications.description", { ns: "numeri" })}
        >
          <Box mb={2}>
            <KpiNotifications selYear={selYear} />

            {/* <Completion selYear={selYear} /> */}
            <NotificationsTrend selYear={selYear} />
          </Box>
        </DataSectionWrapper>

        <DataSectionWrapper
          title={t("authorities_and_types.title", { ns: "numeri" })}
          description={t("authorities_and_types.description", { ns: "numeri" })}
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
