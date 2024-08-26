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
import { useTranslation } from "../../../hook/useTranslation";

type Props = {
  selYear: number | null;
};

const KpiNotifications = ({ selYear }: Props): JSX.Element => {
  const { t } = useTranslation(["numeri"]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
      sx={{ mb: 3 }}
    >
      <Box style={{ flex: "1 0 0" }} mb={3}>
        <KpiCard
          label={t("sent_notifications.total.title", { ns: "numeri" })}
          subLabel={t("sent_notifications.total.description", {
            ns: "numeri",
          })}
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
                {t("sent_notifications.digital.title", { ns: "numeri" })}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {t("sent_notifications.digital.description", { ns: "numeri" })}
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
                {t("sent_notifications.analog.title", { ns: "numeri" })}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {t("sent_notifications.analog.description", { ns: "numeri" })}
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
  );
};

export default KpiNotifications;
