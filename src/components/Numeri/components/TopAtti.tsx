import { Stack, Typography } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import { useTranslation } from "../../../hook/useTranslation";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import topAttiSpec from "../assets/data/top-atti.vl.json";
import { dashboardColors } from "../shared/colors";
import TopAttiChart from "./TopAttiChart";

function translateTooltip(spec: TopLevelSpec) {
  if (!("layer" in spec)) {
    return spec;
  }
  if (!Array.isArray(spec.layer) || spec.layer.length < 3) {
    return spec;
  }

  const tooltipLayer = spec.layer[1];
  if (!tooltipLayer?.encoding?.tooltip) {
    return spec;
  }

  const tooltips = tooltipLayer.encoding.tooltip;
  if (!Array.isArray(tooltips)) {
    return spec;
  }

  return {
    ...spec,
    layer: [
      ...spec.layer,
      {
        ...tooltipLayer,
        encoding: {
          ...tooltipLayer.encoding,
          tooltip: tooltips,
        },
      },
    ],
  } as TopLevelSpec;
}

type Props = {
  selYear?: number | null;
};

const TopAtti = ({ selYear }: Props) => {
  const { t } = useTranslation(["numeri"]);

  return (
    <Stack direction="column" spacing={2}>
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
            }}
          >
            {t("atti.note_2", { ns: "numeri" })}
          </Typography>
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
            }}
          >
            {t("atti.note_1", { ns: "numeri" })}
          </Typography>

          <TopAttiChart
            spec={translateTooltip(toVegaLiteSpec(topAttiSpec))}
            yearSignal={selYear}
          />
    </Stack>
  );
};

export default TopAtti;
