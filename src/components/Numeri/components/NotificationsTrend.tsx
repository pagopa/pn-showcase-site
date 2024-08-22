import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import downloadSpec from "../assets/data/download.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import CumulativeChart from "./CumulativeChart";
import KpiCard from "./KpiCard";
import { useTranslation } from "src/hook/useTranslation";

type Props = {
  selYear: number | null;
};

type LabelsCumulativeDaily = "aggregate" | "monthly";
type LabelsTotalDigitalAnalog = "total" | "digital" | "analog";

type OptionsCumulativeDaily = {
  id: number;
  label: LabelsCumulativeDaily;
};
type OptionsTotalDigitalAnalog = {
  id: number;
  label: LabelsTotalDigitalAnalog;
};

const optionsCumulativeDaily: OptionsCumulativeDaily[] = [
  { id: 1, label: "aggregate" },
  { id: 2, label: "monthly" },
];

const optionsTotalDigitalAnalog: OptionsTotalDigitalAnalog[] = [
  { id: 1, label: "total" },
  { id: 2, label: "digital" },
  { id: 3, label: "analog" },
];

const NotificationsTrend = ({ selYear }: Props): JSX.Element => {
  const { t } = useTranslation(["numeri"]);

  const [curOptionCumulativeDaily, setCurOptionCumulativeDaily] = useState(
    optionsCumulativeDaily[0].id
  );
  const [curOptionTotalDigitalAnalog, setCurOptionTotalDigitalAnalog] =
    useState(optionsTotalDigitalAnalog[0].id);

  const handleOptionCumulativeDaily = (id: number) => {
    setCurOptionCumulativeDaily(id);
  };

  const handleOptionsTotalDigitalAnalog = (id: number) => {
    setCurOptionTotalDigitalAnalog(id);
  };
  const getLabel = (id: number) => {
    const result = optionsTotalDigitalAnalog.find((f) => f.id === id);
    return result ? result.label : "total";
  };
  return (
    <KpiCard
      label={t("sent_notifications.trend.title", { ns: "numeri" })}
      borderLeft=""
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" color="textSecondary">
          {t("sent_notifications.trend.description_1", { ns: "numeri" })}
        </Typography>

        <Select
          value={curOptionCumulativeDaily}
          size="small"
          sx={{ fontSize: 14 }}
          onChange={(e: any) => handleOptionCumulativeDaily(+e.target.value)}
        >
          {optionsCumulativeDaily.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {t(`sent_notifications.trend.${option.label}`, { ns: "numeri" })}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="textSecondary">
          {" "}
          {t("sent_notifications.trend.description_2", { ns: "numeri" })}
        </Typography>
        <Select
          size={"small"}
          sx={{ fontSize: 14 }}
          value={curOptionTotalDigitalAnalog}
          onChange={(e: any) =>
            handleOptionsTotalDigitalAnalog(+e.target.value)
          }
        >
          {optionsTotalDigitalAnalog.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {t(`sent_notifications.${option.label}.name`, { ns: "numeri" })}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Box style={{ height: "22rem" }}>
        <CumulativeChart
          spec={toVegaLiteSpec(downloadSpec)}
          cumulativeSignal={curOptionCumulativeDaily === 1 ? true : false}
          filterSignal={getLabel(curOptionTotalDigitalAnalog)}
          yearSignal={selYear}
        />
      </Box>
    </KpiCard>
  );
};
export default NotificationsTrend;
