"use client";
import DataCard from "./DataCard";
import KpiSignal from "./KpiSignal";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import notificationsAnalogSpec from "../assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../assets/data/notifications-total.vl.json";
import { Box, Stack } from "@mui/material";


type Props = {
  selYear: number | null;
};

const KpiNotifications = ({ selYear }: Props): JSX.Element => {
  const isAllYears = selYear === null;
  const yearLabel = isAllYears ? "dal 2023" : `nel ${selYear}`;

  return (
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2, md: 4 }}>
        <Box style={{ flex: '1 0 0' }} mb={3}>
          <DataCard label={`Totale notifiche ${yearLabel}`} notes="Somma delle notifiche che hanno intrapreso workflow analogico o digitale per raggiungere un destinatario">
            <KpiSignal
              spec={toVegaLiteSpec(notificationsTotalSpec)}
              yearSignal={selYear}
            />
          </DataCard>
        </Box>

        <Box style={{ flex: '1 0 0' }} mb={3}>
          <DataCard label="Totale notifiche analogiche">
            <KpiSignal
              spec={toVegaLiteSpec(notificationsAnalogSpec)}
              yearSignal={selYear}
            />
          </DataCard>
        </Box>

        <Box style={{ flex: '1 0 0' }} mb={3}>
          <DataCard label="Totale notifiche digitali">
            <KpiSignal
              spec={toVegaLiteSpec(notificationsDigitalSpec)}
              yearSignal={selYear}
            />
          </DataCard>
        </Box>
      </Stack>
  );
};

export default KpiNotifications;
