import { Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h3"
      sx={{
        color: dashboardColors.get("grey-700"),
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: "1.5rem",
      }}
    >
      {children}
    </Typography>
  );
}
