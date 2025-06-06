import { Place, Refresh } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useRef, useState } from "react";
import { useTranslation } from "../../hook/useTranslation";
import { RaddOperator } from "../../model";

const PAGE_SIZE = 5;

type Props = {
  rows: RaddOperator[];
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
  setSelectedPoint: (point: RaddOperator | null) => void;
  selectedPoint: RaddOperator | null;
};

function PickupPointsList({
  rows,
  toggleDrawer,
  setSelectedPoint,
  selectedPoint,
}: Readonly<Props>) {
  const [numberOfRows, setNumberOfRows] = useState(PAGE_SIZE);
  const { t } = useTranslation(["pickup"]);

  const listContainerRef = useRef<HTMLUListElement | null>(null);

  const onShowDetailsClick = (point: RaddOperator) => {
    toggleDrawer(true, point);
  };

  const onSelectPoint = (point: RaddOperator) => {
    setSelectedPoint(point);
  };

  return (
    <>
      <List
        ref={listContainerRef}
        sx={{ maxHeight: "800px", overflowY: "auto", p: 0, mt: 2, pr: 1 }}
        aria-live="polite"
      >
        {rows.slice(0, numberOfRows).map((row, index: number) => {
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

                  {row.distance && (
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
                  onClick={() => onShowDetailsClick(row)}
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
