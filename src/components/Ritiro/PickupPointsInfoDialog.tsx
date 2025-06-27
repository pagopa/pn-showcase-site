import { Close, OpenInNew, Phone } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CopyToClipboardButton } from "@pagopa/mui-italia";
import Link from "next/link";
import React from "react";
import { OpeningDays, RaddOperator } from "src/model";
import { useTranslation } from "../../hook/useTranslation";

type Props = {
  isOpen: boolean;
  point: RaddOperator | null;
  toggleDialog: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

const OPENING_DAYS: (keyof OpeningDays)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const PickupPointsInfoDialog: React.FC<Props> = ({
  isOpen,
  point,
  toggleDialog,
}) => {
  const { t } = useTranslation(["pickup"]);

  const hasAlmostOneOpeningDay = OPENING_DAYS.some(
    (day) => point && point[day]
  );

  const handleCloseDialog = () => toggleDialog(false, null);

  const handleOpenGoogleMaps = () => {
    if (!point) return;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      point?.normalizedAddress
    )}`;
    window.open(url, "_blank");
  };

  const handleCopyInformations = () => {
    const parts = [point?.denomination, point?.normalizedAddress];

    if (hasAlmostOneOpeningDay) {
      parts.push(`${t("drawer.opening-hours")} :`);
      parts.push(
        OPENING_DAYS.map(
          (day) => `${t(`days.${day}`)}: ${formatHours(point?.[day]) || "-"}`
        ).join("\n")
      );
    }

    parts.push(`${t("drawer.reservation-call")} ${point?.contacts}`);

    const formattedText = parts.filter(Boolean).join("\n");
    navigator.clipboard.writeText(formattedText);
  };

  const formatHours = (openingHours?: string) => {
    if (!openingHours) return null;

    return openingHours.replaceAll("_", " / ");
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog}>
      {point && (
        <Box sx={{ p: 2 }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ p: 0 }}
            >
              <Close fontSize="small" sx={{ color: "action.active" }} />
            </IconButton>
          </Box>

          <Typography variant="h6" fontWeight={700} sx={{ my: 2 }}>
            {point.denomination}
          </Typography>

          <Alert severity="info">
            <Typography variant="body2" fontWeight={600}>
              {t("drawer.book-alert-title")}
            </Typography>
            <Typography variant="body2">
              {t("drawer.book-alert-description")}
            </Typography>
          </Alert>

          <Stack sx={{ mt: 2 }} spacing={2} divider={<Divider />}>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="textSecondary"
              >
                {t("drawer.address")}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="primary"
                  textOverflow="ellipsis"
                >
                  {point.normalizedAddress}
                </Typography>
                <CopyToClipboardButton
                  value={point.normalizedAddress}
                  tooltipTitle={t("drawer.address-copied")}
                  sx={{ m: 0, p: 0 }}
                />
              </Stack>
            </Stack>

            {hasAlmostOneOpeningDay && (
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="textSecondary"
                >
                  {t("drawer.opening-hours")}
                </Typography>
                <Grid container>
                  {OPENING_DAYS.map((day) => (
                    <>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {t(`drawer.days.${day}`)}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          {formatHours(point[day]) || "-"}
                        </Typography>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Stack>
            )}

            <Stack spacing={1}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="textSecondary"
              >
                {t("drawer.phone-number")}
              </Typography>
              <Link
                href={`tel:${point?.contacts}`}
                style={{ textDecoration: "none" }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" fontWeight={700} color="primary">
                    {point.contacts}
                  </Typography>
                  <Phone color="primary" />
                </Stack>
              </Link>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
            <Button
              variant="contained"
              endIcon={<OpenInNew fontSize="small" />}
              fullWidth
              onClick={handleOpenGoogleMaps}
            >
              {t("drawer.get-directions")}
            </Button>
            <Button variant="text" fullWidth onClick={handleCopyInformations}>
              {t("drawer.copy-informations")}
            </Button>
          </Stack>
        </Box>
      )}
    </Dialog>
  );
};

export default PickupPointsInfoDialog;
