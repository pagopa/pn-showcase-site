import { Place } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useRef } from "react";
import { RaddOperator } from "../../model";
import { useTranslation } from "../../hook/useTranslation";

type Props = {
  rows: RaddOperator[];
};

function PickupPointsList({ rows }: Readonly<Props>) {
  const { t } = useTranslation(["pickup"]);

  const listContainerRef = useRef<HTMLUListElement | null>(null);

  const onShowDetailsClick = (point: RaddOperator) => {
    console.log(point);
  };

  return (
    <List
      ref={listContainerRef}
      sx={{ maxHeight: "800px", overflowY: "auto" }}
      aria-live="polite"
    >
      {rows.slice(0, 5).map((row, index: number) => (
        <ListItem
          key={`${row.denomination}-${index}`}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            my: 2,
            p: 3,
          }}
        >
          <Stack component={Paper} width="100%">
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
              {t("show-details")}
            </ButtonNaked>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export default PickupPointsList;
