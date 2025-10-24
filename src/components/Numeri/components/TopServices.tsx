import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import ChartServices from "./ChartServices";

import { Box, Stack, Typography } from "@mui/material";
import actsSpec from "../assets/data/acts.vl.json";
import topAreasSpec from "../assets/data/top-areas.vl.json";

import KpiAuthority from "./KpiAuthority";
import KpiCard from "./KpiCard";
import { useTranslation } from "../../../hook/useTranslation";

const TopServices = (): JSX.Element => {
  const { t } = useTranslation(["numeri"]);
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
      mt={3}
    >
      <Box mb={3} sx={{ flex: "0 0 25%" }}>
        <KpiCard
          label={t("authorities_and_types.notification_types.total.title", {
            ns: "numeri",
          })}
          subLabel={t(
            "authorities_and_types.notification_types.total.description",
            {
              ns: "numeri",
            }
          )}
        >
          <KpiAuthority spec={toVegaLiteSpec(actsSpec)} />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label={t(
            "authorities_and_types.notification_types.main_scopes.title",
            {
              ns: "numeri",
            }
          )}
          subLabel={t(
            "authorities_and_types.notification_types.main_scopes.description",
            {
              ns: "numeri",
            }
          )}
          borderLeft=""
        >
          <ChartServices spec={toVegaLiteSpec(topAreasSpec)} />
          <Box mt={2}>
            <Typography variant="caption" color="textSecondary">
              {t("authorities_and_types.notification_types.main_scopes.notes", {
                ns: "numeri",
              })}
            </Typography>
          </Box>
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default TopServices;
