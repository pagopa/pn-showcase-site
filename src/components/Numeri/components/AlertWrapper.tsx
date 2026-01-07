import { Alert } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { dashboardColors } from "../shared/colors";
import AlertButton from "./AlertButton";

export default function AlertWrapper({
  children,
  buttonText,
}: {
  children: React.ReactNode;
  buttonText: string;
}) {
  return (
    <Alert
      iconMapping={{
        info: (
          <InfoIcon
            sx={{
              color: dashboardColors.get("icon"),
              backgroundColor: dashboardColors.get("alert"),
              borderRadius: "50%",
            }}
          />
        ),
      }}
      action={<AlertButton>{buttonText}</AlertButton>}
      severity="info"
      variant="standard"
      sx={{
        backgroundColor: dashboardColors.get("alert"),
        border: `1px solid ${dashboardColors.get("alert-border")}`,
      }}
    >
      {children}
    </Alert>
  );
}
