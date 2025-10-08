import { SxProps, Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function CardText({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <Typography
      sx={{
        color: dashboardColors.get("grey-650"),
        fontWeight: 400,
        fontSize: "0.875rem",
        lineHeight: "1.125rem",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
