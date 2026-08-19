import { WarningAmber } from "@mui/icons-material";
import { Stack, SxProps, Theme } from "@mui/material";
import { MIButton } from "@pagopa/mui-italia";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  handleRetry?: () => void;
  retryLabel?: string;
  sx?: SxProps<Theme>;
};

const ErrorBox: React.FC<Props> = ({
  handleRetry,
  retryLabel,
  children,
  sx,
}) => (
  <Stack
    direction="column"
    sx={{
      height: "100%",
      width: "100%",
      position: "relative",
      backgroundColor: "#F5F5F5",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      ...sx,
    }}
  >
    <WarningAmber sx={{ color: "text.secondary", mb: 1 }} />
    {children}
    {handleRetry && (
      <MIButton
        variant="text"
        color="primary"
        sx={{ mt: 1 }}
        onClick={handleRetry}
      >
        {retryLabel}
      </MIButton>
    )}
  </Stack>
);

export default ErrorBox;
