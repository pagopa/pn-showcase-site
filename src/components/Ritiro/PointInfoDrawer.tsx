import {
  AccessTime,
  Close,
  PhoneOutlined,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import React from "react";
import { OpeningDays, RaddOperator } from "src/model";
import { useTranslation } from "../../hook/useTranslation";

type Props = {
  isOpen: boolean;
  point: RaddOperator | null;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
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

const PointInfoDrawer: React.FC<Props> = ({ isOpen, point, toggleDrawer }) => {
  const { t } = useTranslation(["pickup", "common"]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? "auto" : "400px";
  const fullAddress = `${point?.address}, ${point?.cap} ${point?.city} ${point?.province}`;

  const handleCloseDrawer = () => toggleDrawer(false, null);

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      fullAddress
    )}`;
    window.open(url, "_blank");
  };

  const formatHours = (openingHours?: string) => {
    if (!openingHours) return null;

    return openingHours.replace("_", " / ");
  };

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "left"}
      open={isOpen}
      onClose={handleCloseDrawer}
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          px: 3,
          py: 2,
        },
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton aria-label="close" onClick={handleCloseDrawer}>
          <Close fontSize="medium" sx={{ color: "action.active" }} />
        </IconButton>
      </Box>

      <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
        {point?.denomination}
      </Typography>

      <List sx={{ mt: 2 }}>
        <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
          <Storefront color="primary" sx={{ mr: 2 }} />
          <Typography>
            {point?.address}, {point?.city}
          </Typography>
        </ListItem>

        <Divider component="li" />

        <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
          <PhoneOutlined color="primary" sx={{ mr: 2 }} />
          <Typography color="textSecondary">{point?.contacts}</Typography>
        </ListItem>

        <Divider component="li" />

        <ListItem alignItems="center" sx={{ px: 0, py: 2 }}>
          <AccessTime color="primary" sx={{ mr: 2 }} />
          <Grid container display="flex" flexDirection="column" width="100%">
            {OPENING_DAYS.map((day) => (
              <Box key={day} display="flex" width="100%">
                <Grid item xs={4}>
                  <Typography color="textSecondary">
                    {t(`days.${day}`)}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary">
                    {formatHours(point?.[day]) || "-"}
                  </Typography>
                </Grid>
              </Box>
            ))}
          </Grid>
        </ListItem>
      </List>

      <Stack direction={isMobile ? "column" : "row"} spacing={1}>
        {/* <ShareButton point={point} fullAddress={fullAddress} /> */}
        <Button variant="outlined" fullWidth onClick={handleOpenGoogleMaps}>
          {t("get-directions")}
        </Button>
      </Stack>
    </Drawer>
  );
};

export default PointInfoDrawer;
