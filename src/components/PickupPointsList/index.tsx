import { useEffect, useMemo, useRef, useState } from "react";
import { Place, Refresh } from "@mui/icons-material";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { MIButton } from "@pagopa/mui-italia";
import { useTranslation } from "../../hook/useTranslation";
import { Coordinates, RaddOperator } from "../../model";
import Skeletons from "./Skeletons";
import { sortPointsByDistance } from "@utils/map";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useIsMobile } from "src/hook/useIsMobile";

const PAGE_SIZE = 5;

type Props = Readonly<{
  points: Array<RaddOperator>;
  selectedPoint: RaddOperator | null;
  searchCoordinates: Coordinates | null;
  toggleDialog: (open: boolean, pickupPoint: RaddOperator | null) => void;
  setSelectedPoint: (point: RaddOperator | null) => void;
  isVisible: boolean;
}>;

function PickupPointsList({
  points,
  selectedPoint,
  searchCoordinates,
  toggleDialog,
  setSelectedPoint,
  isVisible,
}: Props) {
  const { t } = useTranslation(["pickup"]);
  const listContainerRef = useRef<HTMLUListElement | null>(null);
  const [numberOfRows, setNumberOfRows] = useState(PAGE_SIZE);
  const [customSortTarget, setCustomSortTarget] = useState<Coordinates | null>(
    null,
  );

  const { userPosition } = useCurrentPosition();
  const isMobile = useIsMobile();

  const onSelectPoint = (point: RaddOperator) => {
    setSelectedPoint(point);
    if (isMobile) {
      toggleDialog(true, point);
    }
  };

  const handleShowMore = () => {
    setNumberOfRows((prev) => prev + PAGE_SIZE);
  };

  const handleShowDetails = (e: React.MouseEvent, point: RaddOperator) => {
    e.stopPropagation();
    toggleDialog(true, point);
  };

  const sortedItems = useMemo(
    () =>
      sortPointsByDistance(
        points,
        userPosition,
        customSortTarget,
        searchCoordinates,
      ),
    [points, userPosition, customSortTarget, searchCoordinates],
  );

  const visibleItems = useMemo(
    () => sortedItems.slice(0, numberOfRows),
    [sortedItems, numberOfRows],
  );

  const scrollToItem = (targetPoint: RaddOperator) => {
    const listItems = listContainerRef.current?.querySelectorAll("li");
    const targetIndex = visibleItems.findIndex(
      (item) => item.locationId === targetPoint.locationId,
    );

    if (listItems && targetIndex !== -1) {
      const targetItem = listItems[targetIndex];
      targetItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      listContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isPointVisibleInCurrentList = (point: RaddOperator): boolean =>
    visibleItems.some((item) => item.locationId === point.locationId);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    if (!selectedPoint) {
      setCustomSortTarget(searchCoordinates || null);
      return;
    }

    if (!isPointVisibleInCurrentList(selectedPoint)) {
      setCustomSortTarget({
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      });
    }

    scrollToItem(selectedPoint);
  }, [selectedPoint, searchCoordinates, isVisible]);

  if (!points || points.length === 0) {
    return <Skeletons />;
  }

  return (
    <>
      <List
        ref={listContainerRef}
        sx={{
          maxHeight: { xs: "480px", lg: "750px" },
          overflowY: "auto",
          p: 0,
          mt: 3,
          pr: 1,
        }}
      >
        {visibleItems.map((point, index) => {
          const isSelected = selectedPoint?.locationId === point.locationId;

          return (
            <ListItem
              key={`${point.denomination}-${point.locationId}-${index}`}
              onClick={() => onSelectPoint(point)}
              alignItems="flex-start"
              sx={(theme) => ({
                border: isSelected ? "2px solid" : "1px solid",
                borderColor: isSelected ? theme.colors.blue[500] : "divider",
                borderRadius: "8px",
                p: 3,
                mb: 2,
                cursor: "pointer",
                backgroundColor: isSelected
                  ? theme.colors.blue[50]
                  : "transparent",
                "&:hover": {
                  backgroundColor: theme.colors.blue[50],
                },
              })}
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
                      {point.address}
                    </Typography>
                    <MIButton
                      variant="text"
                      sx={{
                        mt: 1,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={(e) => handleShowDetails(e, point)}
                    >
                      {t("show-details")}
                    </MIButton>
                  </>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />

              {(userPosition || searchCoordinates) && (
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
                    {`${
                      point.distance?.toFixed(1).replace(".", ",") || "-"
                    } km`}
                  </Typography>
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>

      {visibleItems.length < sortedItems.length && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <MIButton
            variant="text"
            onClick={handleShowMore}
            startIcon={<Refresh />}
          >
            {t("show-more")}
          </MIButton>
        </Box>
      )}
    </>
  );
}

export default PickupPointsList;
