import { ArrowForward, Call, Place } from "@mui/icons-material";
import { Box, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useRef } from "react";
import { RaddOperator } from "../../model";

type Props = {
  rows: RaddOperator[];
  handleNavigate: (latitude: number, longitude: number) => void;
};

function OperatorsList({ rows, handleNavigate }: Readonly<Props>) {
  const listContainerRef = useRef<HTMLUListElement | null>(null);

  const onShowDetailsClick = (latitude?: number, longitude?: number) => {
    if (!latitude || !longitude) return;

    handleNavigate(latitude, longitude);
  };

  return (
    <Stack>
      <List ref={listContainerRef} sx={{ boxShadow: 2 }}>
        {rows.slice(0, 10).map((row, index: number) => (
          <ListItem key={`${row.denomination}-${index}`}>
            <Stack
              component={Paper}
              width="100%"
              sx={{ borderBottom: "solid 1px #E3E7EB", py: 2 }}
            >
              {row.distance && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Place />
                  <Typography variant="body2">
                    km {row.distance?.toFixed(1) || "-"}
                  </Typography>
                </Stack>
              )}

              <Box mb={1}>
                <Typography variant="body1" fontWeight={600}>
                  {row.denomination}
                </Typography>
                <Typography variant="body2" fontSize="14px">
                  {row.address}, {row.city} ({row.province})
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Call color="primary" />
                <Typography variant="body2" fontSize="14px">
                  {row.contacts}
                </Typography>
              </Stack>

              <ButtonNaked
                endIcon={<ArrowForward />}
                color="primary"
                sx={{ justifyContent: "flex-end" }}
                onClick={() => onShowDetailsClick(row.latitude, row.longitude)}
              >
                Mostra dettagli
              </ButtonNaked>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default OperatorsList;
