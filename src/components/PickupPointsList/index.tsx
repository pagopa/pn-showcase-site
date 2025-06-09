import { Place, Refresh } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { sortPointsByDistance } from "@utils/map";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "src/hook/useIsMobile";
import { useTranslation } from "../../hook/useTranslation";
import { Coordinates, RaddOperator } from "../../model";

const PAGE_SIZE = 5;

type Props = {
  points: RaddOperator[];
  selectedPoint: RaddOperator | null;
  userPosition: Coordinates | null;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
  setSelectedPoint: (point: RaddOperator | null) => void;
  setPoints: (points: RaddOperator[]) => void;
};

function PickupPointsList({
  points,
  selectedPoint,
  userPosition,
  toggleDrawer,
  setSelectedPoint,
  setPoints,
}: Readonly<Props>) {
  const { t } = useTranslation(["pickup"]);
  const listContainerRef = useRef<HTMLUListElement | null>(null);
  const [numberOfRows, setNumberOfRows] = useState(PAGE_SIZE);
  const isMobile = useIsMobile();

  const itemToShow = points.slice(0, numberOfRows);

  const onSelectPoint = (point: RaddOperator) => {
    setSelectedPoint(point);
    if (isMobile) {
      toggleDrawer(true, point);
    }
  };

  const scrollToItem = (selectedPoint: RaddOperator) => {
    const listItems = listContainerRef.current?.querySelectorAll("li");
    const selectedIndex = itemToShow.findIndex(
      (item) => item.id === selectedPoint.id
    );
    if (listItems && selectedIndex !== -1) {
      const selectedItem = listItems[selectedIndex];
      selectedItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (!selectedPoint) return;
    if (
      points
        .slice(0, numberOfRows)
        .findIndex((item) => item.id === selectedPoint.id) === -1
    ) {
      const targetPosition = {
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      };

      setPoints(sortPointsByDistance(points, userPosition, targetPosition));
    } else {
      scrollToItem(selectedPoint);
    }
  }, [selectedPoint]);

  return (
    <>
      <List
        ref={listContainerRef}
        sx={{
          maxHeight: "800px",
          overflowY: { xs: "none", lg: "auto" },
          p: 0,
          mt: 2,
          pr: 1,
        }}
        aria-live="polite"
      >
        {itemToShow.map((row, index: number) => {
          const isItemSelected = selectedPoint?.address === row.address;

          return (
            <ListItem
              key={`${row.denomination}-${index}`}
              onClick={() => onSelectPoint(row)}
              sx={{
                border: isItemSelected ? "2px solid" : "1px solid",
                borderColor: isItemSelected ? "#2185E9" : "divider",
                borderRadius: "8px",
                my: 2,
                p: 0,
              }}
            >
              <Stack
                component={Paper}
                width="100%"
                sx={{
                  p: 3,
                  borderRadius: "8px",
                  backgroundColor: isItemSelected ? "#0073E614" : "transparent",
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
                      {row.normalizedAddress}
                    </Typography>
                  </Box>

                  {userPosition && (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Place
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
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
                  onClick={() => toggleDrawer(true, row)}
                >
                  {t("show-details")}
                </ButtonNaked>
              </Stack>
            </ListItem>
          );
        })}

        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ButtonNaked
            color="primary"
            onClick={() => {
              setNumberOfRows((prev) => prev + PAGE_SIZE);
            }}
            startIcon={<Refresh />}
          >
            {t("show-more")}
          </ButtonNaked>
        </Box>
      </List>
    </>
  );
}

export default PickupPointsList;
