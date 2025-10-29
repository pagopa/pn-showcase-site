import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { Box, Stack, Typography } from "@mui/material";
import Script from "next/script";
import { useState } from "react";
import Head from "next/head";
import { formatLocale, timeFormatLocale } from "vega";
import { getI18n } from "../../api/i18n";
import LastUpdate from "../../components/Numeri/components/LastUpdate";
import NotificationsTrend from "../../components/Numeri/components/NotificationsTrend";
import { curYear, firstYear } from "../../components/Numeri/shared/constants";
import { useTranslation } from "../../hook/useTranslation";
import { LangCode } from "../../model";
import notificationsAnalogSpec from "../../components/Numeri/assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../../components/Numeri/assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../../components/Numeri/assets/data/notifications-total.vl.json";
import entitiesActiveSpec from "../../components/Numeri/assets/data/entities-active.vl.json";
import entitiesActivePercSpec from "../../components/Numeri/assets/data/entities-active-perc.vl.json";
import pieChartDigitalSpec from "../../components/Numeri/assets/data/pie-chart-digital.vl.json";
import { langCodes } from "@utils/constants";
import Icons from "src/components/Numeri/components/Icons";
import KpiCard from "src/components/Numeri/components/KpiCard";
import KpiSignal from "src/components/Numeri/components/KpiSignal";
import SectionLayout from "src/components/Numeri/components/SectionLayout";
import TabsNumeri from "src/components/Numeri/components/TabsNumeri";
import { toVegaLiteSpec } from "src/components/Numeri/shared/toVegaLiteSpec";

import CardText from "src/components/Numeri/components/CardText";
import CardTitle from "src/components/Numeri/components/CardTitle";
import KpiWrapper from "src/components/Numeri/components/KpiWrapper";
import NotificationsTypes from "src/components/Numeri/components/NotificationsTypes";
import SvgDefs from "src/components/Numeri/components/SvgDefs";

import AlertWrapper from "src/components/Numeri/components/AlertWrapper";
import FormatEyelet from "src/components/Numeri/components/FormatEyelet";
import FormatKpi from "src/components/Numeri/components/FormatKpi";
import FormatTitle from "src/components/Numeri/components/FormatTitle";
import PieChartWrapper from "src/components/Numeri/components/PieChartWrapper";
import { getVegaLocale } from "src/components/Numeri/shared/getVegaLocale";
import KpiEntitiesPerc from "src/components/Numeri/components/KpiEntitiesPerc";
import Maps from "src/components/Numeri/components/Maps";
import { dashboardColors } from "src/components/Numeri/shared/colors";

type Tabs = {
  id: number | null;
  label: string;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: langCodes.map((lang) => ({
    params: { lang },
  })),
  fallback: false,
});

export async function getStaticProps({
  params,
}: {
  params: { lang: LangCode };
}) {
  const translations = getI18n(params.lang, ["common", "numeri"]);
  const vegaLocale = getVegaLocale(params.lang);

  return {
    props: {
      translations,
      lang: params.lang,
      vegaLocale: {
        formatLocale: vegaLocale.formatLocale,
        timeFormatLocale: vegaLocale.timeFormatLocale,
      },
    },
  };
}

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
  (y) => ({ id: y, label: String(y) })
);

const SendInNumbers = ({
  vegaLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["numeri"]);

  const [selYear, setSelYear] = useState<number | null>(null);

  formatLocale({ ...vegaLocale.formatLocale, nan: "–" });
  timeFormatLocale(vegaLocale.timeFormatLocale ?? {});

  const handleTabChange = (tab: number) => {
    if (tab === tabs[tab].id) {
      return;
    }
    setSelYear(tabs[tab].id);
  };
  const tabs: Array<Tabs> = [
    { id: null, label: t("total") },
    ...years,
  ].reverse();

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <Script
        src="/iframe-resizer/child/index.umd.js"
        type="text/javascript"
        id="iframe-resizer-child"
      />
      <SvgDefs />

      <Box
        sx={{
          maxWidth: 1156,
          backgroundColor: "white",
          mx: "auto",
          px: {
            xs: 2,
            md: 2,
            xl: 0,
          },
        }}
        marginX={17.7}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 0 }}
          justifyContent="space-between"
          alignItems={"center"}
          component="header"
          sx={{ py: 11 }}
        >
          <Stack direction="column" spacing={2} flex={"0 0 52%"}>
            <FormatEyelet>{t("hero.eyelet", { ns: "numeri" })}</FormatEyelet>
            <FormatTitle>{t("hero.title", { ns: "numeri" })}</FormatTitle>
            <Typography
              component="p"
              sx={{
                color: dashboardColors.get("secondary"),
                fontSize: "1.125rem",
                fontWeight: 400,
                lineHeight: "1.5rem",
              }}
            >
              {t("hero.description", { ns: "numeri" }) + " "}
              <Typography
                component="span"
                sx={{
                  color: dashboardColors.get("secondary"),
                  fontSize: "inherit",
                  fontWeight: 600,
                  lineHeight: "1.5rem",
                }}
              >
                {t("hero.description_2", { ns: "numeri" })}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: dashboardColors.get("secondary"),
                  fontSize: "inherit",
                  fontWeight: 400,
                  lineHeight: "1.5rem",
                }}
              >
                {t("hero.description_3", { ns: "numeri" })}
              </Typography>
            </Typography>
            <LastUpdate>{t("hero.last_update", { ns: "numeri" })}</LastUpdate>
          </Stack>
          <Box flex={"0 0 32%"}>
            <AlertWrapper buttonText={t("hero.website", { ns: "numeri" })}>
              {t("hero.alert")}
            </AlertWrapper>
          </Box>
        </Stack>
        <Box component="main" paddingTop={6}>
          <SectionLayout
            title={t("sent_notifications.title")}
            text={t("sent_notifications.description")}
          >
            <TabsNumeri
              tabs={tabs.map((tab) => tab.label)}
              onTabChange={handleTabChange}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, md: 6 }}
            >
              <Box sx={{ flex: "0 0 30.602%", display: "flex" }}>
                <KpiCard>
                  <Stack direction={"column"} spacing={2}>
                    <Icons.ForwardToInboxIcon />
                    <FormatKpi>
                      <KpiSignal
                        spec={toVegaLiteSpec(notificationsTotalSpec)}
                        yearSignal={selYear}
                      />
                    </FormatKpi>
                    <CardTitle>
                      {selYear === null
                        ? t("sent_notifications.total.title_2", {
                            ns: "numeri",
                          })
                        : t("sent_notifications.total.title", { ns: "numeri" })}
                    </CardTitle>
                    <CardText>
                      {selYear === null
                        ? t("sent_notifications.total.description_2", {
                            ns: "numeri",
                          })
                        : t("sent_notifications.total.description", {
                            ns: "numeri",
                          })}
                    </CardText>
                  </Stack>
                </KpiCard>
              </Box>
              <Box sx={{ flex: "1 1 0" }}>
                <KpiCard>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 8, sm: 2 }}
                  >
                    <Stack
                      sx={{ flex: "0 0 50%" }}
                      direction={"column"}
                      spacing={4}
                    >
                      <Stack direction={"column"} spacing={1}>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          width={"100%"}
                          alignItems={"center"}
                        >
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="18"
                              fill="url(#pattern_2)"
                            />
                          </svg>
                          <FormatKpi>
                            <KpiSignal
                              spec={toVegaLiteSpec(notificationsDigitalSpec)}
                              yearSignal={selYear}
                            />
                          </FormatKpi>
                        </Stack>
                        <CardTitle>
                          {t("sent_notifications.digital.title", {
                            ns: "numeri",
                          })}
                        </CardTitle>
                        <CardText>
                          {t("sent_notifications.digital.description", {
                            ns: "numeri",
                          })}
                        </CardText>
                      </Stack>
                      <Stack direction={"column"} spacing={1}>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="18"
                              fill="url(#pattern_1)"
                            />
                          </svg>
                          <FormatKpi>
                            <KpiSignal
                              spec={toVegaLiteSpec(notificationsAnalogSpec)}
                              yearSignal={selYear}
                            />
                          </FormatKpi>
                        </Stack>
                        <CardTitle>
                          {t("sent_notifications.analog.title")}
                        </CardTitle>
                        <CardText>
                          {t("sent_notifications.analog.description", {
                            ns: "numeri",
                          })}
                        </CardText>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={{ flex: "1 1 0" }}
                      direction={"column"}
                      spacing={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <PieChartWrapper
                        spec={toVegaLiteSpec(pieChartDigitalSpec)}
                        yearSignal={selYear}
                      />
                    </Stack>
                  </Stack>
                </KpiCard>
              </Box>
            </Stack>
            <NotificationsTrend selYear={selYear} />
          </SectionLayout>
          <SectionLayout
            title={t("entities.title")}
            text={t("entities.description")}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, md: 6 }}
            >
              <Stack flex={"0 0 30.602%"} direction={"column"} spacing={6}>
                <KpiCard>
                  <Stack direction={"column"} spacing={1}>
                    <Icons.AccountBalanceIcon />
                    <CardTitle>
                      {t("entities.active.total.title", { ns: "numeri" })}
                    </CardTitle>
                    <CardText>
                      {t("entities.active.total.description", {
                        ns: "numeri",
                      })}
                    </CardText>
                    <FormatKpi>
                      <KpiWrapper spec={toVegaLiteSpec(entitiesActiveSpec)} />
                    </FormatKpi>
                    <KpiEntitiesPerc
                      spec={toVegaLiteSpec(entitiesActivePercSpec)}
                    >
                      {t("entities.active.total.description_1", {
                        ns: "numeri",
                      })}
                    </KpiEntitiesPerc>
                  </Stack>
                </KpiCard>
              </Stack>
              <Box flex={"1 1 0"}>
                <KpiCard>
                  <Maps />
                </KpiCard>
              </Box>
            </Stack>
          </SectionLayout>
          <SectionLayout
            title={t("notification_types.title", { ns: "numeri" })}
            text={t("notification_types.description", { ns: "numeri" })}
          >
            <NotificationsTypes />
          </SectionLayout>
        </Box>
      </Box>
    </>
  );
};

export default SendInNumbers;
