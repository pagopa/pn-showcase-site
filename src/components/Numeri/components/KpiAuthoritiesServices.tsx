import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import topAuthoritiesSpec from "../assets/data/top-authorities.vl.json";

import servicesSpec from "../assets/data/services.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import ChartServices from "./ChartServices";
import KpiAuthority from "./KpiAuthority";
import KpiCard from "./KpiCard";
import { useTranslation } from "src/hook/useTranslation";

const KpiAuthoritiesServices = (): JSX.Element => {
  const { t } = useTranslation(["numeri"]);
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Box mb={3} sx={{ flex: "0 0 25%" }}>
        <KpiCard
          label={t("authorities_and_types.authorities.total.title", {
            ns: "numeri",
          })}
          subLabel={t("authorities_and_types.authorities.total.description", {
            ns: "numeri",
          })}
        >
          <KpiAuthority spec={toVegaLiteSpec(servicesSpec)} />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label={t("authorities_and_types.authorities.main_cat.title", {
            ns: "numeri",
          })}
          subLabel={t(
            "authorities_and_types.authorities.main_cat.description",
            {
              ns: "numeri",
            }
          )}
          borderLeft=""
        >
          <ChartServices spec={toVegaLiteSpec(topAuthoritiesSpec)} />
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default KpiAuthoritiesServices;
