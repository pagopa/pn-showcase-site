import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TopLevelSpec } from "vega-lite";
import { useTranslation } from "../../../hook/useTranslation";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import topAreasSpec from "../assets/data/top-areas.vl.json";
import { dashboardColors } from "../shared/colors";
import { url } from "../shared/constants";
import type { SectionTwoData } from "../shared/jsonTypes";
import CardText from "./CardText";
import KpiCard from "./KpiCard";
import NotificationsTypesChart from "./NotificationsTypesChart";

function generateTag(str: string | null): string {
  if (str === null) {
    return "tutte";
  }
  return str.toLowerCase().replace(/ /g, "_");
}

const NotificationsTypes = () => {
  const { t } = useTranslation(["numeri"]);
  const [categories, setCategories] = useState<Record<
    string,
    string | null
  > | null>(null);
  const [curOption, setCurOption] = useState<string>("tutte");

  const handleOptions = (id: string) => {
    setCurOption(id);
  };

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
        return {
          ...tooltip,
          title: t("notification_types.tooltip.category", { ns: "numeri" }),
        };
      }
      if (tooltip.field === "num_iun") {
        return {
          ...tooltip,
          title: t("notification_types.tooltip.notifications", {
            ns: "numeri",
          }),
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const jsonData: SectionTwoData = await response.json();
        const cat = jsonData.top10_ambiti.reduce(
          (acc: Record<string, string | null>, item) => {
            if (!(generateTag(item.categoria_ente) in acc)) {
              acc[generateTag(item.categoria_ente)] = item.categoria_ente;
            }
            return acc;
          },
          {}
        );
        setCategories(cat);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchData();
  }, []);

  if (!categories) {
    return null;
  }
  const optionCategories = Object.entries(categories).map(([tag, label]) => ({
    tag,
    label,
  }));

  return (
    <Box sx={{ height: "49rem" }}>
      <KpiCard>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <CardText>
              {t("notification_types.main_scopes.title", { ns: "numeri" })}
            </CardText>

            <Select
              MenuProps={{
                autoFocus: false,
                disableAutoFocusItem: true,
                disableEnforceFocus: true,
                disableAutoFocus: true,
              }}
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
              {optionCategories.map((option) => (
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
            categorySignal={categories[curOption] ?? null}
          />
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
            }}
          >
            {t("notification_types.main_scopes.note_1", { ns: "numeri" })}
          </Typography>
          <Typography
            sx={{
              color: dashboardColors.get("grey-650"),
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
            }}
          >
            {t("notification_types.main_scopes.note_2", { ns: "numeri" })}
          </Typography>
        </Stack>
      </KpiCard>
    </Box>
  );
};
export default NotificationsTypes;
