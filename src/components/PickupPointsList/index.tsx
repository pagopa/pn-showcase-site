import { ChevronLeft, ChevronRight, Place } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { sortPointsByDistance } from "@utils/map";
import { useEffect, useMemo, useRef, useState } from "react";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useIsMobile } from "src/hook/useIsMobile";
import { useTranslation } from "../../hook/useTranslation";
import { Coordinates, RaddOperator } from "../../model";
import Skeletons from "./Skeletons";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [customSortTarget, setCustomSortTarget] = useState<Coordinates | null>(
    null
  );

  const totalPages = Math.ceil(points.length / PAGE_SIZE);

  const { userPosition } = useCurrentPosition();
  const isMobile = useIsMobile();

  const onSelectPoint = (point: RaddOperator) => {
    setSelectedPoint(point);
    if (isMobile) {
      toggleDrawer(true, point);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      listContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      listContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShowDetails = (e: React.MouseEvent, point: RaddOperator) => {
    e.stopPropagation();
    toggleDrawer(true, point);
  };

  const sortedItems = useMemo(() => {
    return sortPointsByDistance(points, userPosition, customSortTarget);
  }, [points, userPosition, customSortTarget]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, currentPage]);

  const isPointVisibleInCurrentPage = (point: RaddOperator): boolean => {
    return visibleItems.some((item) => item.id === point.id);
  };

  useEffect(() => {
    if (!selectedPoint) {
      setCustomSortTarget(null);
      return;
    }

    if (!isPointVisibleInCurrentPage(selectedPoint)) {
      setCustomSortTarget({
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude,
      });
      setCurrentPage(1);
    }
  }, [selectedPoint]);

  useEffect(() => {
    if (searchCoordinates) {
      setCustomSortTarget(searchCoordinates);
      setCurrentPage(1);
    }
  }, [searchCoordinates]);

  useEffect(() => {
    setCurrentPage(1);
  }, [points]);

  if (!points || points.length === 0) {
    return <Skeletons />;
  }

  return (
    <>
      <List
        ref={listContainerRef}
        sx={{
          p: 0,
          mt: 2,
          pr: 1,
        }}
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

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            px: 1,
          }}
        >
          <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      )}
    </>
  );
}

export default PickupPointsList;
