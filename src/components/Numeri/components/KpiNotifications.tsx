"use client";
import { Box, Paper, Stack, Typography } from "@mui/material";
import notificationAnalogSpec from "../assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../assets/data/notifications-total.vl.json";
import pieChartAnalogSpec from "../assets/data/pie-chart-analog.vl.json";
import pieChartDigitalSpec from "../assets/data/pie-chart-digital.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiCard from "./KpiCard";
import KpiSignal from "./KpiSignal";
import PieChart from "./PieChart";

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
        <Paper
          elevation={8}
          sx={{
            p: 3,
            borderRadius: 2,
            borderLeft: "8px solid #0073E6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "600", mb: 1 }}
              >
                Totale notifiche digitali
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Notifiche inviate ai destinatari tramite canali digitali
              </Typography>

              <KpiSignal
                spec={toVegaLiteSpec(notificationsDigitalSpec)}
                yearSignal={selYear}
              />
            </Box>
            <Box>
              <PieChart
                spec={toVegaLiteSpec(pieChartDigitalSpec)}
                yearSignal={selYear}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <Paper
          elevation={8}
          sx={{
            p: 3,
            borderRadius: 2,
            borderLeft: "8px solid #0073E6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                component="h3"
                sx={{ fontWeight: "600", mb: 1 }}
              >
                Totale notifiche analogiche
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Notifiche inviate ai destinatari tramite raccomandata cartacea
              </Typography>

              <KpiSignal
                spec={toVegaLiteSpec(notificationAnalogSpec)}
                yearSignal={selYear}
              />
            </Box>
            <Box>
              <PieChart
                spec={toVegaLiteSpec(pieChartAnalogSpec)}
                yearSignal={selYear}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Stack>

    // <Box style={{ flex: "1 0 0" }} mb={3}>
    //   <KpiCard
    //     label="Totale notifiche analogiche"
    //     subLabel="Notifiche inviate ai destinatari tramite raccomandata cartacea"
    //   >
    //     <KpiSignal
    //       spec={toVegaLiteSpec(notificationsAnalogSpec)}
    //       yearSignal={selYear}
    //     />
    //   </KpiCard>
    // </Box>
  );
};

export default KpiNotifications;
