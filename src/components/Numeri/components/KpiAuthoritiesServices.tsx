"use client";
import actsSpec from "../assets/data/acts.vl.json";
import servicesSpec from "../assets/data/services.vl.json";
import CardWrapper from "./CardWrapper";
import KpiAuthority from "./KpiAuthority";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import Stack from "@mui/material/Stack";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const KpiAuthoritiesServices = (): JSX.Element => {


  return (
    <article>
      <Stack direction="row" spacing={3}>
        <Box style={{ flex: '1 0 0' }} mb={3}>
          <CardWrapper >
            <Typography variant="h6">
              Enti attivi
              <Tooltip title="Enti che hanno inviato almeno una notifica" placement="right-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <KpiAuthority
              spec={toVegaLiteSpec(servicesSpec)}
            />
          </CardWrapper>
        </Box>

        <Box style={{ flex: '1 0 0' }} mb={3}>
          <CardWrapper>
            <Typography variant="h6">Tipologie di atto</Typography>
            <KpiAuthority
              spec={toVegaLiteSpec(actsSpec)}
            />
          </CardWrapper>
        </Box>
      </Stack>
    </article>
  );
};

export default KpiAuthoritiesServices;
