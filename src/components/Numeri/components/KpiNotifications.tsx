"use client";
import CardWrapper from "./CardWrapper";
import KpiSignal from "./KpiSignal";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import notificationsAnalogSpec from "../assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../assets/data/notifications-total.vl.json";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';


type Props = {
  selYear: number | null;
};

const KpiNotifications = ({ selYear }: Props): JSX.Element => {
  const isAllYears = selYear === null;
  const yearLabel = isAllYears ? "dal 2023" : `nel ${selYear}`;

  return (
    <article>
      <Stack direction="row" spacing={3}>
        <Box style={{ flex: '1 0 0' }} mb={3}>
          <CardWrapper>
            <Typography variant="h6">
              Totale notifiche {yearLabel}{" "}
              <Tooltip title="Somma delle notifiche che hanno intrapreso workflow analogico o digitale per raggiungere un destinatario" placement="right-end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            {/* <h6>
              Totale notifiche {yearLabel}{" "}
              <a
                href="#"
                ref={refTooltip}
                className={!isAllYears ? "d-none" : ""}
                data-bs-toggle="tooltip"
                title="Somma delle notifiche che hanno intrapreso workflow analogico o digitale per raggiungere un destinatario"
              >
              </a>
            </h6> */}
            <KpiSignal
              spec={toVegaLiteSpec(notificationsTotalSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </Box>

        <Box style={{ flex: '1 0 0' }} mb={3}>
          <CardWrapper>
            <Typography variant="h6">Totale notifiche analogiche</Typography>
            <KpiSignal
              spec={toVegaLiteSpec(notificationsAnalogSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </Box>

        <Box style={{ flex: '1 0 0' }} mb={3}>
          <CardWrapper>
            <Typography variant="h6">Totale notifiche digitali</Typography>
            <KpiSignal
              spec={toVegaLiteSpec(notificationsDigitalSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </Box>
      </Stack>
    </article>
  );
};

export default KpiNotifications;
