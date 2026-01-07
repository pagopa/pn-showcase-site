import { Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function FormatKpi({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        color: dashboardColors.get("blue-io"),
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: "2.625rem",
      }}
    >
      {children}
    </Typography>
  );
}
