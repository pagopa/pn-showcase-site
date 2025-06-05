import { Place } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useRef, useState } from "react";
import { RaddOperator } from "../../model";
import { useTranslation } from "../../hook/useTranslation";
import { Refresh } from "@mui/icons-material";

const PAGE_SIZE = 5;

type Props = {
  rows: RaddOperator[];
};

function PickupPointsList({ rows }: Readonly<Props>) {
  const [numberOfRows, setNumberOfRows] = useState(PAGE_SIZE);
  const { t } = useTranslation(["pickup"]);

  const listContainerRef = useRef<HTMLUListElement | null>(null);

  const onShowDetailsClick = (point: RaddOperator) => {
    console.log(point);
  };

  return (
    <>
      <List
        ref={listContainerRef}
        sx={{ maxHeight: "800px", overflowY: "auto", p: 0, mt: 2, pr: 1 }}
        aria-live="polite"
      >
        {rows.slice(0, numberOfRows).map((row, index: number) => (
          <ListItem
            key={`${row.denomination}-${index}`}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
              mb: 2,
              p: 3,
            }}
          >
            <Stack
              component={Paper}
              width="100%"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box mb={1}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                  >
                    {row.denomination}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize="14px"
                  >
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
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
