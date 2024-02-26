"use client";
import actsSpec from "../assets/data/acts.vl.json";
import servicesSpec from "../assets/data/services.vl.json";
import DataCard from "./DataCard";
import KpiAuthority from "./KpiAuthority";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const KpiAuthoritiesServices = (): JSX.Element => {


  return (
    <article>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Box style={{ flex: '1 0 0' }} mb={3}>
          <DataCard label="Enti attivi" notes="Enti che hanno inviato almeno una notifica">
            <KpiAuthority
              spec={toVegaLiteSpec(servicesSpec)}
            />
          </DataCard>
        </Box>

        <Box style={{ flex: '1 0 0' }} mb={3}>
          <DataCard label="Tipologie di atto">
            <KpiAuthority
              spec={toVegaLiteSpec(actsSpec)}
            />
          </DataCard>
        </Box>
      </Stack>
    </article>
  );
};

export default KpiAuthoritiesServices;
