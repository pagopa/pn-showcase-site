import { Place } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useRef } from "react";
import { RaddOperator } from "../../model";

type Props = {
  rows: RaddOperator[];
  handleNavigate: (latitude: number, longitude: number) => void;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

function PickupPointsList({
  rows,
  handleNavigate,
  toggleDrawer,
}: Readonly<Props>) {
  const listContainerRef = useRef<HTMLUListElement | null>(null);

  const onShowDetailsClick = (point: RaddOperator) => {
    const { latitude, longitude } = point;
    if (!latitude || !longitude) return;

    handleNavigate(latitude, longitude);
    toggleDrawer(true, point);
  };

  return (
    <List
      ref={listContainerRef}
      sx={{ maxHeight: "800px", overflowY: "auto" }}
      aria-live="polite"
    >
      {rows.slice(0, 5).map((row) => (
        <ListItem
          key={`pickup-point-${row.denomination}-${row.address}`}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            my: 2,
            p: 0,
          }}
          onClick={() => onShowDetailsClick(row)}
        >
          <Stack
            component={Paper}
            width="100%"
            sx={{
              p: 3,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#0073e61f",
                cursor: "pointer",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {row.denomination}
                </Typography>
                <Typography variant="body2" fontSize="14px">
                  {row.address}, {row.city} ({row.province})
                </Typography>
              </Box>

              {row.distance && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Place fontSize="small" sx={{ color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    km {row.distance?.toFixed(1) || "-"}
                  </Typography>
                </Stack>
              )}
            </Box>

            <ButtonNaked
              color="primary"
              sx={{
                justifyContent: "flex-start",
                width: "fit-content",
                alignItems: "center",
              }}
              onClick={() => onShowDetailsClick(row)}
            >
              Mostra dettagli
            </ButtonNaked>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export default PickupPointsList;
