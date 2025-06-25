import { Place, Refresh } from "@mui/icons-material";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
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
  searchCoordinates: Coordinates | null;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
  setSelectedPoint: (point: RaddOperator | null) => void;
};

function PickupPointsList({
  points,
  selectedPoint,
  searchCoordinates,
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
    } else {
      listContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
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

    if (!isPointVisibleInCurrentList(selectedPoint)) {
      setCustomSortTarget({
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      });
    }

    scrollToItem(selectedPoint);
  }, [selectedPoint]);

  useEffect(() => {
    if (searchCoordinates) {
      setCustomSortTarget(searchCoordinates);
    }
  }, [searchCoordinates]);

  return (
    <>
      <List
        ref={listContainerRef}
        sx={{
          maxHeight: { xs: "100%", lg: "800px" },
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
              alignItems="flex-start"
              sx={{
                border: isSelected ? "2px solid" : "1px solid",
                borderColor: isSelected ? "#2185E9" : "divider",
                borderRadius: "8px",
                my: 2,
                p: 3,
                cursor: "pointer",
                backgroundColor: isSelected ? "#0073E614" : "transparent",
                "&:hover": {
                  backgroundColor: "#0073e61f",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={600}>
                    {point.denomination}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" fontSize="14px" component="div">
                      {point.normalizedAddress}
                    </Typography>
                    <ButtonNaked
                      color="primary"
                      sx={{
                        justifyContent: "flex-start",
                        width: "fit-content",
                        alignItems: "center",
                        mt: 1,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={(e: React.MouseEvent) =>
                        handleShowDetails(e, point)
                      }
                    >
                      {t("show-details")}
                    </ButtonNaked>
                  </>
                }
              />

              {userPosition && (
                <Box
                  display="flex"
                  alignItems="flex-start"
                  gap={0.5}
                  flexShrink={0}
                >
                  <Place fontSize="small" sx={{ color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    whiteSpace="nowrap"
                  >
                    {`${point.distance?.toFixed(1) || "-"} km`}
                  </Typography>
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>

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
    </>
  );
}

export default PickupPointsList;
