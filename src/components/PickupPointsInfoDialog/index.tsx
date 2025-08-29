import { Close, OpenInNew } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { formatHours, OPENING_DAYS } from "@utils/openingHours";
import React from "react";
import { useIsMobile } from "src/hook/useIsMobile";
import { Coordinates, RaddOperator } from "src/model";
import { useTranslation } from "../../hook/useTranslation";
import Address from "./Address";
import Contacts from "./Contacts";
import OpeningHours from "./OpeningHours";

type Props = {
  isOpen: boolean;
  point: RaddOperator | null;
  searchCoordinates: Coordinates | null;
  toggleDialog: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

const PickupPointsInfoDialog: React.FC<Props> = ({
  isOpen,
  point,
  searchCoordinates,
  toggleDialog,
}) => {
  const { t } = useTranslation(["pickup"]);
  const isMobile = useIsMobile();

  const hasOpeningHours =
    OPENING_DAYS.some((day) => point && point[day]) || point?.rawOpeningHours;

  const handleCloseDialog = () => toggleDialog(false, null);

  const handleOpenGoogleMaps = () => {
    if (!point) return;

    const origin = searchCoordinates
      ? `${searchCoordinates.latitude},${searchCoordinates.longitude}`
      : "";

    const destination = encodeURIComponent(point.address);
    const originParam = origin ? `&origin=${encodeURIComponent(origin)}` : "";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}${originParam}`;

    window.open(url, "_blank");
  };

  const handleCopyInformation = async () => {
    if (!point) return;

    const sections = [];

    sections.push([point.denomination, point.address].join("\n"));

    if (hasOpeningHours) {
      const hoursHeader = `${t("drawer.opening-hours")}:`;
      const hoursContent =
        point.rawOpeningHours ||
        OPENING_DAYS.map(
          (day) =>
            `${t(`drawer.days.${day}`)}: ${formatHours(point[day]) || "-"}`
        ).join("\n");

      sections.push(`${hoursHeader}\n${hoursContent}`);
    }

    sections.push(
      `${t("drawer.reservation-call")} ${point.contacts
        .split("_")
        .join(` ${t("drawer.or")} `)}`
    );

    sections.push(
      [
        `${t("drawer.location-id")}: ${point.locationId}`,
        `${t("drawer.external-codes")}: ${point.external_codes}`,
      ].join("\n")
    );

    const formattedText = sections.join("\n\n");

    try {
      await navigator.clipboard.writeText(formattedText);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  if (!point) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: {
            xs: "auto",
            md: "600px",
          },
          maxHeight: { xs: "550px", md: "650px" },
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box display="flex" justifyContent="flex-end" pt={2} pr={2}>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{ p: 0 }}
        >
          <Close fontSize="small" sx={{ color: "action.active" }} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {point.denomination}
        </Typography>

        <Alert severity="info" sx={{ my: 2 }}>
          <Typography variant="body2" fontWeight={600}>
            {t(
              `drawer.${
                point.appointmentRequired ? "required-" : ""
              }book-alert-title`
            )}
          </Typography>
          <Typography variant="body2">
            {t("drawer.book-alert-description")}
          </Typography>
        </Alert>

        <Address address={point.address} />

        <Contacts point={point} />

        {hasOpeningHours && <OpeningHours point={point} />}
      </Box>

      <Paper elevation={8}>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="center"
          spacing={2}
          sx={{ p: 3 }}
        >
          <Button
            variant="outlined"
            fullWidth={isMobile}
            onClick={handleCopyInformation}
          >
            {t("drawer.copy-informations")}
          </Button>
          <Button
            variant="contained"
            endIcon={<OpenInNew fontSize="small" />}
            fullWidth={isMobile}
            onClick={handleOpenGoogleMaps}
          >
            {t("drawer.get-directions")}
          </Button>
        </Stack>
      </Paper>
    </Dialog>
  );
};

export default PickupPointsInfoDialog;
