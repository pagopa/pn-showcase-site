import { MenuItem, Select, Stack } from "@mui/material";
import { useState } from "react";
import { TopLevelSpec } from "vega-lite";
import mapJsonAbsoluteSpec from "../assets/data/italy-regions-circles.vl.json";
import mapJsonPercentageSpec from "../assets/data/italy-regions-circles-perc.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import { dashboardColors } from "../shared/colors";
import CardText from "./CardText";
import CardTitle from "./CardTitle";
import MapChart from "./MapChart";
import { useTranslation } from "src/hook/useTranslation";

const absoluteSpec = toVegaLiteSpec(mapJsonAbsoluteSpec);
const percentageSpec = toVegaLiteSpec(mapJsonPercentageSpec);

const mapSelection = ["absolute", "percentage"] as const;
type MapSelection = (typeof mapSelection)[number];

export default function Maps() {
  const { t } = useTranslation(["numeri"]);
  const [curMapOption, setMapOption] = useState<MapSelection>("absolute");
  const handleOptionChange = (option: MapSelection) => {
    setMapOption(option);
  };

  const optionsMap = new Map([
    [
      "absolute",
      t("entities.active.geographic_distribution.absolute.name", {
        ns: "numeri",
      }),
    ],
    [
      "percentage",
      t("entities.active.geographic_distribution.percentage.name", {
        ns: "numeri",
      }),
    ],
  ]);

  const options = Array.from(optionsMap.entries()).map(([tag, label]) => ({
    tag,
    label,
  }));

  function translateMapTooltip(spec: TopLevelSpec) {
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
        return { ...tooltip, title: t("entities.active.tooltip.region") };
      }
      if (tooltip.field === "num_comuni_attivi") {
        return {
          ...tooltip,
          title: t("entities.active.tooltip.municipalities"),
        };
      }
      if (tooltip.field === "perc_comuni_attivi") {
        return { ...tooltip, title: t("entities.active.tooltip.percentage") };
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
  }

  function translatePercentageMapTooltip(spec: TopLevelSpec) {
    if (
      !("encoding" in spec) ||
      !spec.encoding?.tooltip ||
      !Array.isArray(spec.encoding.tooltip)
    ) {
      return spec;
    }

    const translatedTooltips = spec.encoding.tooltip.map((tooltip: any) => {
      if (tooltip.field === "regione") {
        return { ...tooltip, title: t("entities.active.tooltip.region") };
      }
      if (tooltip.field === "num_comuni_attivi") {
        return {
          ...tooltip,
          title: t("entities.active.tooltip.municipalities"),
        };
      }
      if (tooltip.field === "perc_comuni_attivi") {
        return { ...tooltip, title: t("entities.active.tooltip.percentage") };
      }
      return tooltip;
    });

    return {
      ...spec,
      encoding: {
        ...spec.encoding,
        tooltip: translatedTooltips,
      },
    } as TopLevelSpec;
  }
  return (
    <Stack direction={"column"} spacing={2}>
      <CardTitle>
        {t("entities.active.geographic_distribution.title")}
      </CardTitle>
      <CardText>
        {t("entities.active.geographic_distribution.description")}
      </CardText>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <CardText>
          {t("entities.active.geographic_distribution.description_1")}
        </CardText>
        <Select
          MenuProps={{
            autoFocus: false,
            disableAutoFocusItem: true,
            disableEnforceFocus: true,
            disableAutoFocus: true,
          }}
          value={curMapOption}
          sx={{
            fontSize: 14,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: dashboardColors.get("blue-io"),
            },
          }}
          size="small"
          onChange={(e: any) => handleOptionChange(e.target.value)}
        >
          {options.map(({ tag, label }) => (
            <MenuItem
              sx={{
                "&.Mui-selected": { color: dashboardColors.get("blue-io") },
              }}
              key={tag}
              value={tag}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      {curMapOption === "absolute" ? (
        <>
          <CardText>
            {t("entities.active.geographic_distribution.absolute.description")}
          </CardText>
          <MapChart spec={translateMapTooltip(absoluteSpec)} />
        </>
      ) : (
        <>
          <CardText>
            {t(
              "entities.active.geographic_distribution.percentage.description"
            )}
          </CardText>
          <MapChart spec={translatePercentageMapTooltip(percentageSpec)} />
        </>
      )}
    </Stack>
  );
}
