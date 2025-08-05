import { Box } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import embed from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

import mapJsonSpec from "../assets/data/italy-regions-circles.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import { useTranslation } from "src/hook/useTranslation";

const spec = toVegaLiteSpec(mapJsonSpec);

const MapChart = () => {
  const chartContent = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(["numeri"]);
  const translationRef = useRef({
    region: t("entities.active.tooltip.region"),
    municipalities: t("entities.active.tooltip.municipalities"),
    percentage: t("entities.active.tooltip.percentage"),
  });

  useEffect(() => {
    translationRef.current = {
      region: t("entities.active.tooltip.region"),
      municipalities: t("entities.active.tooltip.municipalities"),
      percentage: t("entities.active.tooltip.percentage"),
    };
  }, [t]);

  const translateMapTooltip = useCallback((spec: TopLevelSpec) => {
    if (
      !("layer" in spec) ||
      !Array.isArray(spec.layer) ||
      spec.layer.length < 2
    ) {
      return spec;
    }

    const layer = spec.layer[1];
    if (!layer?.encoding?.tooltip) {
      return spec;
    }

    const tooltips = layer.encoding.tooltip;
    if (!Array.isArray(tooltips)) {
      return spec;
    }

    const translatedTooltips = tooltips.map((tooltip) => {
      if (tooltip.field === "regione") {
        return { ...tooltip, title: translationRef.current.region };
      }
      if (tooltip.field === "num_comuni_attivi") {
        return {
          ...tooltip,
          title: translationRef.current.municipalities,
        };
      }
      if (tooltip.field === "perc_comuni_attivi") {
        return { ...tooltip, title: translationRef.current.percentage };
      }
      return tooltip;
    });

    return {
      ...spec,
      layer: [
        spec.layer[0],
        {
          ...layer,
          encoding: {
            ...layer.encoding,
            tooltip: translatedTooltips,
          },
        },
      ],
    } as TopLevelSpec;
  }, []);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    const options = {
      ...chartConfig,
    };
    embed(chartContent.current, translateMapTooltip(spec), options)
      .then((chart) => {
        chart.view
          .resize()
          .runAsync()
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [translateMapTooltip]);

  return (
    <Box
      sx={{
        height: { xs: "25rem", sm: "37rem" },
        width: "100%",
        pt: { xs: "1rem", sm: "2rem" },
      }}
      ref={chartContent}
    ></Box>
  );
};
export default MapChart;
