import { Place, Refresh } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { sortPointsByDistance } from "@utils/map";
import { useEffect, useMemo, useRef, useState } from "react";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useIsMobile } from "src/hook/useIsMobile";
import { useTranslation } from "../../hook/useTranslation";
import { Coordinates, RaddOperator } from "../../model";

const PAGE_SIZE = 5;

type Props = {
  points: RaddOperator[];
  selectedPoint: RaddOperator | null;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
  setSelectedPoint: (point: RaddOperator | null) => void;
};

function PickupPointsList({
  points,
  selectedPoint,
  toggleDrawer,
  setSelectedPoint,
}: Props) {
  const { t } = useTranslation(["pickup"]);
  const listContainerRef = useRef<HTMLUListElement | null>(null);
  const [numberOfRows, setNumberOfRows] = useState(PAGE_SIZE);
  const [customSortTarget, setCustomSortTarget] = useState<Coordinates | null>(
    null
  );

  const { userPosition } = useCurrentPosition();
  const isMobile = useIsMobile();

  const onSelectPoint = (point: RaddOperator) => {
    setSelectedPoint(point);
    if (isMobile) {
      toggleDrawer(true, point);
    }
  };

  const handleShowMore = () => {
    setNumberOfRows((prev) => prev + PAGE_SIZE);
  };

  const handleShowDetails = (e: React.MouseEvent, point: RaddOperator) => {
    e.stopPropagation();
    toggleDrawer(true, point);
  };

  const sortedItems = useMemo(() => {
    return sortPointsByDistance(points, userPosition, customSortTarget);
  }, [points, userPosition, customSortTarget]);

  const visibleItems = useMemo(() => {
    return sortedItems.slice(0, numberOfRows);
  }, [sortedItems, numberOfRows]);

  const scrollToItem = (targetPoint: RaddOperator) => {
    const listItems = listContainerRef.current?.querySelectorAll("li");
    const targetIndex = visibleItems.findIndex(
      (item) => item.id === targetPoint.id
    );

    if (listItems && targetIndex !== -1) {
      const targetItem = listItems[targetIndex];
      targetItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const isPointVisibleInCurrentList = (point: RaddOperator): boolean => {
    return visibleItems.some((item) => item.id === point.id);
  };

  useEffect(() => {
    if (!selectedPoint) {
      setCustomSortTarget(null);
      return;
    }

    if (isPointVisibleInCurrentList(selectedPoint)) {
      // Point is visible so scroll to it
      scrollToItem(selectedPoint);
    } else {
      // Point is not visible sort by this point
      setCustomSortTarget({
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      });
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
        {visibleItems.map((point, index) => {
          const isSelected = selectedPoint?.id === point.id;

          return (
            <ListItem
              key={`${point.denomination}-${point.id}-${index}`}
              onClick={() => onSelectPoint(point)}
              sx={{
                border: isSelected ? "2px solid" : "1px solid",
                borderColor: isSelected ? "#2185E9" : "divider",
                borderRadius: "8px",
                my: 2,
                p: 0,
                cursor: "pointer",
              }}
            >
              <Stack
                component={Paper}
                width="100%"
                sx={{
                  p: 3,
                  borderRadius: "8px",
                  backgroundColor: isSelected ? "#0073E614" : "transparent",
                  "&:hover": {
                    backgroundColor: "#0073e61f",
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
                      {point.denomination}
                    </Typography>
                    <Typography variant="body2" fontSize="14px">
                      {point.normalizedAddress}
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
                        km {point.distance?.toFixed(1) || "-"}
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
                  onClick={(e: React.MouseEvent) => handleShowDetails(e, point)}
                >
                  {t("show-details")}
                </ButtonNaked>
              </Stack>
            </ListItem>
          );
        })}

        {visibleItems.length < sortedItems.length && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <ButtonNaked
              color="primary"
              onClick={handleShowMore}
              startIcon={<Refresh />}
            >
              {t("show-more")}
            </ButtonNaked>
          </Box>
        )}
      </List>
    </>
  );
}

export default PickupPointsList;
