import { Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function FormatEyelet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography
      sx={{
        textTransform: "uppercase",
        fontWeight: 700,
        color: dashboardColors.get("secondary"),
        fontSize: "0.875rem",
        letterSpacing: 1,
      }}
    >
      {children}
    </Typography>
  );
}
