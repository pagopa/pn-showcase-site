import { useState } from "react";

import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";

type Props = {
  /** whether the sneakbar should be open or not */
  open: boolean;
  /** alert severity (success, info, warning, error) */
  alertSeverity?: AlertColor;
  /** title to be shown */
  title?: React.ReactNode;
  /** message to be shown */
  message: React.ReactNode;
  /** onClose action */
  onClose?: () => void;
  /** Alert variant */
  variant?: "outlined" | "standard" | "filled";
  /** Position of snackbar (vertical and horizontal) */
  snackBarPosition?: SnackbarOrigin;
};

const SnackBar: React.FC<Props> = ({
  title,
  message,
  open,
  alertSeverity,
  onClose,
  variant = "outlined",
  snackBarPosition = { vertical: "bottom", horizontal: "right" },
}) => {
  const closeSnackBar = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={snackBarPosition}
      onClose={closeSnackBar}
      autoHideDuration={5000}
    >
      <Alert
        severity={alertSeverity}
        sx={{
          width: { xs: "calc(100vw - 10%)", md: "100%" },
          "& .MuiAlert-message": {
            width: "100%",
          },
        }}
        variant={variant}
      >
        {title && <AlertTitle id="alert-api-status">{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
