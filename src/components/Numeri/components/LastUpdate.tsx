import { Stack, Typography } from "@mui/material";
import lastUpdateSpec from "../assets/data/last-update.vl.json";
import { dashboardColors } from "../shared/colors";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiWrapperDate from "./KpiWrapperDate";

const LastUpdate = ({ children }: { children: React.ReactNode }) => (
  <Stack direction="row" alignItems="center" spacing={0}>
    <Typography
      sx={{ color: dashboardColors.get("secondary"), fontSize: "0.875rem" }}
    >
      {children} -&nbsp;
    </Typography>
    <Typography
      sx={{ color: dashboardColors.get("secondary"), fontSize: "0.875rem" }}
    >
      <KpiWrapperDate spec={toVegaLiteSpec(lastUpdateSpec)} />
    </Typography>
  </Stack>
);

export default LastUpdate;
