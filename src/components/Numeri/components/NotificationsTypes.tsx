import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { TopLevelSpec } from "vega-lite";
import { useTranslation } from "../../../hook/useTranslation";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import topAreasSpec from "../assets/data/top-areas.vl.json";
import { dashboardColors } from "../shared/colors";
import CardText from "./CardText";
import KpiCard from "./KpiCard";

import NotificationsTypesChart from "./NotificationsTypesChart";

const categoriesMap = new Map([
  ["tutte", null],
  ["comuni", "Comuni"],
  ["riscossori", "Riscossori e altro"],
  ["altri_enti", "Altri enti territoriali"],
  ["province", "Province"],
  ["regioni", "Regioni"],
  ["comunali", "Enti comunali"],
  ["ordini", "Ordini, collegi e consigli professionali"],
  ["amministrazioni", "Pubbliche amministrazioni centrali"],
  ["universita", "Università"],
  ["consorzi", "Consorzi universitari"],
]);

type OptionsCategories = {
  tag: string;
  label: string | null;
};
const options: Array<OptionsCategories> = Array.from(
  categoriesMap.entries()
).map(([tag, label]) => ({ tag, label }));

const NotificationsTypes = () => {
  const { t } = useTranslation(["numeri"]);

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

    const translatedTooltips = tooltips.map((tooltip) => {
      if (tooltip.field === "ambito") {
        return { ...tooltip, title: t("notification_types.tooltip.category") };
      }
      if (tooltip.field === "num_iun") {
        return {
          ...tooltip,
          title: t("notification_types.tooltip.notifications"),
        };
      }
      return tooltip;
    });

    return {
      ...spec,
      layer: [
        ...spec.layer,
        {
          ...tooltipLayer,
          encoding: {
            ...tooltipLayer.encoding,
            tooltip: translatedTooltips,
          },
        },
      ],
    } as TopLevelSpec;
  }

  const [curOption, setCurOption] = useState<string>(options[0].tag);

  const handleOptions = (id: string) => {
    setCurOption(id);
  };
  return (
    <Box sx={{ height: "49rem" }}>
      <KpiCard>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <CardText>
              {t("notification_types.main_scopes.title", { ns: "numeri" })}
            </CardText>

            <Select
              size={"small"}
              sx={{
                fontSize: 14,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: dashboardColors.get("blue-io"),
                },
              }}
              value={curOption}
              onChange={(e: any) => handleOptions(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.tag}
                  value={option.tag}
                  sx={{
                    "&.Mui-selected": { color: dashboardColors.get("blue-io") },
                  }}
                >
                  {t(`notification_types.${option.tag}.name`, { ns: "numeri" })}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <NotificationsTypesChart
            spec={translateTooltip(toVegaLiteSpec(topAreasSpec))}
            categorySignal={categoriesMap.get(curOption) ?? null}
          />
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
            }}
          >
            {t("notification_types.main_scopes.notes", { ns: "numeri" })}
          </Typography>
        </Stack>
      </KpiCard>
    </Box>
  );
};
export default NotificationsTypes;
