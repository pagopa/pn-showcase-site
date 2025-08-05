import { Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function CardText({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        color: dashboardColors.get("grey-650"),
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: "1.125rem",
      }}
    >
      {children}
    </Typography>
  );
}
