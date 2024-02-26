"use client";
import { Box, Stack } from "@mui/material";
import notificationsAnalogSpec from "../assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../assets/data/notifications-total.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiCard from "./KpiCard";
import KpiSignal from "./KpiSignal";

type Props = {
  selYear: number | null;
};

const KpiNotifications = ({ selYear }: Props): JSX.Element => {
  // const isAllYears = selYear === null;
  // const yearLabel = isAllYears ? "dal 2023" : `nel ${selYear}`;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
    >
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Totale notifiche"
          subLabel="Notifiche inviate tramite SEND"
        >
          <KpiSignal
            spec={toVegaLiteSpec(notificationsTotalSpec)}
            yearSignal={selYear}
          />
        </KpiCard>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Totale notifiche digitali"
          subLabel="Enti che hanno inviato almeno una notifica"
        >
          <KpiSignal
            spec={toVegaLiteSpec(notificationsDigitalSpec)}
            yearSignal={selYear}
          />
        </KpiCard>
      </Box>

      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label="Totale notifiche analogiche"
          subLabel="            Notifiche inviate ai destinatari tramite raccomandata cartacea"
        >
          <KpiSignal
            spec={toVegaLiteSpec(notificationsAnalogSpec)}
            yearSignal={selYear}
          />
        </KpiCard>
      </Box>
    </Stack>
  );
};

export default KpiNotifications;
