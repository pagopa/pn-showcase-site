import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TopLevelSpec } from "vega-lite";
import { useTranslation } from "../../../hook/useTranslation";
import { dashboardColors } from "../shared/colors";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import barChartSpec from "../assets/data/bar_chart.vl.json";
import barChartYearlySpec from "../assets/data/bar_chart_yearly.vl.json";
import lineChartSpec from "../assets/data/line_chart.vl.json";
import lineChartYearlySpec from "../assets/data/line_chart_yearly.vl.json";
import CardText from "./CardText";
import CardTitle from "./CardTitle";
import KpiCard from "./KpiCard";
import NotificationsTrendLineChart from "./NotificationsTrendLineChart";
import NotificationsTrendBarChart from "./NotificationsTrendBarChart";
import { swapComponent } from "./swapComponent";

import LangContext from "src/context/lang-context";

type Props = {
  selYear: number | null;
};

const optionsCumulativeMonthly = ["aggregate", "monthly"] as const;
type OptionsCumulativeMonthly = (typeof optionsCumulativeMonthly)[number];

const optionsTotalDigitalAnalog = ["total", "digital", "analog"] as const;
type OptionsTotalDigitalAnalog = (typeof optionsTotalDigitalAnalog)[number];

const NotificationsTrend = ({ selYear }: Props) => {
  const { t } = useTranslation(["numeri"]);
  const { lang } = useContext(LangContext);
  const isSwapped = lang === "en" || lang === "de";

  const [curOptionCumulativeMonthly, setCurOptionCumulativeMonthly] =
    useState<OptionsCumulativeMonthly>(optionsCumulativeMonthly[0]);

  const [curOptionTotalDigitalAnalog, setCurOptionTotalDigitalAnalog] =
    useState<OptionsTotalDigitalAnalog>(optionsTotalDigitalAnalog[0]);

  const handleOptionCumulativeMonthly = (option: OptionsCumulativeMonthly) => {
    setCurOptionCumulativeMonthly(option);
  };

  const handleOptionsTotalDigitalAnalog = (
    option: OptionsTotalDigitalAnalog
  ) => {
    setCurOptionTotalDigitalAnalog(option);
  };
  const lowerCaseFirstLetter = (bool: boolean) => (val: string) => {
    if (bool) {
      return String(val).charAt(0).toLowerCase() + String(val).slice(1);
    } else {
      return val;
    }
  };
  const handleFirstLetter = (bool: boolean) => (val: string) => {
    if (bool) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    } else {
      return String(val).charAt(0).toLowerCase() + String(val).slice(1);
    }
  };

  function translateTooltip(spec: TopLevelSpec) {
    if (!("layer" in spec) || !Array.isArray(spec.layer)) {
      return spec;
    }

    const titleMap: Record<string, string> = {
      "Mese": t("sent_notifications.trend.tooltip.month", { ns: "numeri" }),
      "Notifiche cumulate": t("sent_notifications.trend.tooltip.aggregate", { ns: "numeri" }),
      "Notifiche mensili": t("sent_notifications.trend.tooltip.monthly", { ns: "numeri" }),
      "Anno": t("sent_notifications.trend.tooltip.year", { ns: "numeri" }),
      "Notifiche annuali": t("sent_notifications.trend.tooltip.yearly", { ns: "numeri" }),
    };

    return {
      ...spec,
      layer: spec.layer.map((layer) => {
        if (
          !layer?.encoding?.tooltip ||
          !Array.isArray(layer.encoding.tooltip)
        ) {
          return layer;
        }

        return {
          ...layer,
          encoding: {
            ...layer.encoding,
            tooltip: (layer.encoding.tooltip as Array<any>).map((tip) => ({
              ...tip,
              title: titleMap[tip.title] ?? tip.title,
            })),
          },
        };
      }),
    } as TopLevelSpec;
  }

  return (
    <KpiCard>
      <Stack direction="column" spacing={2}>
        <CardTitle>
          {t("sent_notifications.trend.title", { ns: "numeri" })}
        </CardTitle>
        <CardText>
          {t("sent_notifications.trend.description", { ns: "numeri" })}
        </CardText>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-start"
        >
          <Stack direction="row" spacing={1} alignItems={"center"}>
            {swapComponent(isSwapped)(
              <CardText>
                {lowerCaseFirstLetter(isSwapped)(
                  t("sent_notifications.trend.description_1", { ns: "numeri" })
                )}
              </CardText>,
              <Select
                value={curOptionCumulativeMonthly}
                size="small"
                MenuProps={{
                  autoFocus: false,
                  disableAutoFocusItem: true,
                  disableEnforceFocus: true,
                  disableAutoFocus: true,
                }}
                sx={{
                  fontSize: 14,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: dashboardColors.get("blue-io"),
                  },
                }}
                onChange={(e: any) =>
                  handleOptionCumulativeMonthly(e.target.value)
                }
              >
                {optionsCumulativeMonthly.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      "&.Mui-selected": {
                        color: dashboardColors.get("blue-io"),
                      },
                    }}
                  >
                    {handleFirstLetter(isSwapped)(
                      option === "monthly" && selYear === null
                        ? t("sent_notifications.trend.yearly", { ns: "numeri" })
                        : t(`sent_notifications.trend.${option}`, { ns: "numeri" })
                    )}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={isSwapped ? 1 : 0.5}
            alignItems={"center"}
          >
            <CardText>
              {t("sent_notifications.trend.description_2", {
                ns: "numeri",
              })}
            </CardText>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              {swapComponent(isSwapped)(
                <CardText>
                  {t("sent_notifications.trend.description_3", {
                    ns: "numeri",
                  })}
                </CardText>,
                <Select
                  size={"small"}
                  MenuProps={{
                    autoFocus: false,
                    disableAutoFocusItem: true,
                    disableEnforceFocus: true,
                    disableAutoFocus: true,
                  }}
                  sx={{
                    fontSize: 14,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: dashboardColors.get("blue-io"),
                    },
                  }}
                  value={curOptionTotalDigitalAnalog}
                  onChange={(e: any) =>
                    handleOptionsTotalDigitalAnalog(e.target.value)
                  }
                >
                  {optionsTotalDigitalAnalog.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        "&.Mui-selected": {
                          color: dashboardColors.get("blue-io"),
                        },
                      }}
                    >
                      {t(`sent_notifications.trend.${option}`, {
                        ns: "numeri",
                      })}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ height: "22rem" }}>
          {curOptionCumulativeMonthly === "aggregate" ? (
            <NotificationsTrendLineChart
              filterSignal={curOptionTotalDigitalAnalog}
              yearSignal={selYear}
              spec={translateTooltip(toVegaLiteSpec(selYear === null ? lineChartYearlySpec : lineChartSpec))}
            />
          ) : (
            <NotificationsTrendBarChart
              filterSignal={curOptionTotalDigitalAnalog}
              yearSignal={selYear}
              spec={translateTooltip(toVegaLiteSpec(selYear === null ? barChartYearlySpec : barChartSpec))}
            />
          )}
        </Box>
        {curOptionCumulativeMonthly === "aggregate" && (
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              pt: 3,
            }}
          >
            {t("sent_notifications.trend.note", { ns: "numeri" })}
          </Typography>
        )}
      </Stack>
    </KpiCard>
  );
};
export default NotificationsTrend;
