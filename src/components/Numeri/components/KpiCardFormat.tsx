import { Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

const KpiCardFormat = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component={"h3"}
    sx={{
      fontSize: "3rem",
      fontWeight: 700,
      color: dashboardColors.get("blue-io"),
      lineHeight: 0.875,
    }}
  >
    {children}
  </Typography>
);

export default KpiCardFormat;
