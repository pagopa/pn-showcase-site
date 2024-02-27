"use client";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import actsSpec from "../assets/data/acts.vl.json";
import servicesSpec from "../assets/data/services.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiAuthority from "./KpiAuthority";
import KpiCard from "./KpiCard";

const KpiAuthoritiesServices = (): JSX.Element => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Totale enti attivi"
          subLabel="Enti che hanno inviato almeno una notifica"
        >
          <KpiAuthority spec={toVegaLiteSpec(servicesSpec)} />
        </KpiCard>
      </Box>

      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Tipologie di notifiche inviate"
          subLabel="La tipologia rappresenta l'ambito di appartenenza della notifica (es. multe, tributi, anagrafe etc.)"
        >
          <KpiAuthority spec={toVegaLiteSpec(actsSpec)} />
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default KpiAuthoritiesServices;
