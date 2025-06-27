import { WarningAmber } from "@mui/icons-material";
import { Stack, SxProps, Theme } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
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
}) => {
  return (
    <Stack
      direction="column"
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <WarningAmber sx={{ color: "text.secondary", mb: 1 }} />
      {children}
      {handleRetry && (
        <ButtonNaked
          color="primary"
          sx={{ fontWeight: 700, fontSize: "16px", mt: 1 }}
          onClick={handleRetry}
        >
          {retryLabel}
        </ButtonNaked>
      )}
    </Stack>
  );
};

export default ErrorBox;
