import { Button } from "@mui/material";
import { dashboardColors } from "../shared/colors";

export default function AlertButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      sx={{
        color: dashboardColors.get("icon"),
        whiteSpace: "nowrap",
      }}
      href="/"
      size="small"
    >
      {children}
    </Button>
  );
}
