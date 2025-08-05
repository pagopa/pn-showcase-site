import { Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function FormatTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography
      variant="h1"
      sx={{
        color: dashboardColors.get("primary"),
      }}
    >
      {children}
    </Typography>
  );
}
