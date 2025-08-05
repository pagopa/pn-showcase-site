import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { TopLevelSpec } from "vega-lite";
import { useTranslation } from "../../../hook/useTranslation";
import downloadSpec from "../assets/data/download.vl.json";
import { dashboardColors } from "../shared/colors";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import CardText from "./CardText";
import CardTitle from "./CardTitle";
import KpiCard from "./KpiCard";
import NotificationsTrendChart from "./NotificationsTrendChart";

type Props = {
  selYear: number | null;
};

const optionsCumulativeMonthly = ["aggregate", "monthly"] as const;
type OptionsCumulativeMonthly = (typeof optionsCumulativeMonthly)[number];

const optionsTotalDigitalAnalog = ["total", "digital", "analog"] as const;
type OptionsTotalDigitalAnalog = (typeof optionsTotalDigitalAnalog)[number];

const NotificationsTrend = ({ selYear }: Props) => {
  const { t } = useTranslation(["numeri"]);

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

  function translateTooltip(spec: TopLevelSpec) {
    if (!("layer" in spec)) {
      return spec;
    }

    if (!Array.isArray(spec.layer)) {
      return spec;
    }

    return {
      ...spec,
      layer: spec.layer.map((layer) => {
        if (
          !layer?.encoding?.tooltip ||
          !Array.isArray(layer.encoding.tooltip)
        ) {
          return layer;
        }

        const tooltips = layer.encoding.tooltip;
        if (tooltips.length < 3) {
          return layer;
        }

        const translatedTooltip = [
          {
            ...tooltips[0],
            title: t("sent_notifications.trend.tooltip.month"),
          },
          {
            ...tooltips[1],
            title: t("sent_notifications.trend.tooltip.aggregate"),
          },
          {
            ...tooltips[2],
            title: t("sent_notifications.trend.tooltip.monthly"),
          },
        ];

        return {
          ...layer,
          encoding: {
            ...layer.encoding,
            tooltip: translatedTooltip,
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
            <CardText>
              {t("sent_notifications.trend.description_1", { ns: "numeri" })}
            </CardText>

            <Select
              value={curOptionCumulativeMonthly}
              size="small"
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
                    "&.Mui-selected": { color: dashboardColors.get("blue-io") },
                  }}
                >
                  {t(`sent_notifications.trend.${option}`, {
                    ns: "numeri",
                  })}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Typography variant="caption" color="textSecondary">
              {" "}
              {t("sent_notifications.trend.description_2", { ns: "numeri" })}
            </Typography>
            <Select
              size={"small"}
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
                    "&.Mui-selected": { color: dashboardColors.get("blue-io") },
                  }}
                >
                  {t(`sent_notifications.${option}.name`, {
                    ns: "numeri",
                  })}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>

        <Box sx={{ height: "22rem" }}>
          <NotificationsTrendChart
            spec={translateTooltip(toVegaLiteSpec(downloadSpec))}
            cumulativeSignal={
              curOptionCumulativeMonthly === "aggregate" ? true : false
            }
            filterSignal={curOptionTotalDigitalAnalog}
            yearSignal={selYear}
          />
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
