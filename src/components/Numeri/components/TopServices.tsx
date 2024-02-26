"use client";

import ChartServices from "./ChartServices";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

import topAreasSpec from "../assets/data/top-areas.vl.json";
import topAuthoritiesSpec from "../assets/data/top-authorities.vl.json";
import { Box, Card, CardContent, CardHeader, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';


const TopServices = (): JSX.Element => {


  return (
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2, md: 4 }} mt={3}>
        <Box style={{ flex: '1 0 0' }} mb={3}>
          <Card elevation={8}
            sx={{
              p: 3,
              borderRadius: 2,
            }}>
            <CardHeader title="Principali enti attivi" subheader={
              <Typography variant="body1">
                Ordinati per numero di notifiche depositate da sempre
                <Tooltip title="Enti che hanno inviato almeno una notifica" placement="right-end">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            }></CardHeader>
            <CardContent>
              <ChartServices spec={toVegaLiteSpec(topAuthoritiesSpec)} />
            </CardContent>

          </Card>
        </Box>
        <Box style={{ flex: '1 0 0' }} mb={3}>
          <Card elevation={8}
            sx={{
              p: 3,
              borderRadius: 2,
            }}>
            <CardHeader title="Principali ambiti" subheader={
              <Typography variant="body1">
                Ordinati per numero di notifiche depositate da sempre{" "}
                <Tooltip title="Enti che hanno inviato almeno una notifica" placement="right-end">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            }></CardHeader>
            <ChartServices spec={toVegaLiteSpec(topAreasSpec)} />
            <CardContent></CardContent>
          </Card>

        </Box>
      </Stack>
  );
};

export default TopServices;
