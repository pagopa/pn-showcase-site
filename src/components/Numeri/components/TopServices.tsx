"use client";

import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import ChartServices from "./ChartServices";

import { Box, Stack } from "@mui/material";
import topAreasSpec from "../assets/data/top-areas.vl.json";
import topAuthoritiesSpec from "../assets/data/top-authorities.vl.json";
import KpiCard from "./KpiCard";

const TopServices = (): JSX.Element => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
      mt={3}
    >
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Principali categorie di enti attivi"
          subLabel="Enti ordinati per numero di notifiche depositate a partire dall'adozione di SEND"
          borderLeft=""
        >
          <ChartServices spec={toVegaLiteSpec(topAuthoritiesSpec)} />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Principali ambiti"
          subLabel="Servizi ordinati per numero di notifiche depositate a partire dall'adozione di SEND"
          borderLeft=""
        >
          <ChartServices spec={toVegaLiteSpec(topAreasSpec)} />
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default TopServices;
