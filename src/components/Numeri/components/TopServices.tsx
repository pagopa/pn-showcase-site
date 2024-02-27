"use client";

import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import ChartServices from "./ChartServices";

import { Box, Stack } from "@mui/material";
import topAreasSpec from "../assets/data/top-areas.vl.json";
import actsSpec from "../assets/data/acts.vl.json";

import KpiCard from "./KpiCard";
import KpiAuthority from "./KpiAuthority";

const TopServices = (): JSX.Element => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
      mt={3}
    >
      <Box mb={3}>
        <KpiCard
          label="Tipologie di notifiche inviate"
          subLabel="La tipologia rappresenta l'ambito di appartenenza della notifica (es. multe, tributi, anagrafe etc.)"
        >
          <KpiAuthority spec={toVegaLiteSpec(actsSpec)} />
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
