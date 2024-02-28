import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import topAuthoritiesSpec from "../assets/data/top-authorities.vl.json";

import servicesSpec from "../assets/data/services.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import ChartServices from "./ChartServices";
import KpiAuthority from "./KpiAuthority";
import KpiCard from "./KpiCard";

const KpiAuthoritiesServices = (): JSX.Element => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Box mb={3} sx={{ flex: "0 0 25%" }}>
        <KpiCard
          label="Totale enti attivi"
          subLabel="Enti che hanno inviato almeno una notifica"
        >
          <KpiAuthority spec={toVegaLiteSpec(servicesSpec)} />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Principali categorie di enti attivi"
          subLabel="Categorie di enti ordinate per numero di enti attivi"
          borderLeft=""
        >
          <ChartServices spec={toVegaLiteSpec(topAuthoritiesSpec)} />
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default KpiAuthoritiesServices;
