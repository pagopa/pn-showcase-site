"use client";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import topAuthoritiesSpec from "../assets/data/top-authorities.vl.json";

import servicesSpec from "../assets/data/services.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiAuthority from "./KpiAuthority";
import KpiCard from "./KpiCard";
import ChartServices from "./ChartServices";

const KpiAuthoritiesServices = (): JSX.Element => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Box mb={3}>
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
          subLabel="Enti ordinati per numero di notifiche depositate a partire dall'adozione di SEND"
          borderLeft=""
        >
          <ChartServices spec={toVegaLiteSpec(topAuthoritiesSpec)} />
        </KpiCard>
      </Box>
      
    </Stack>
  );
};

export default KpiAuthoritiesServices;
