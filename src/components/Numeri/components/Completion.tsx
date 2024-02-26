import ChartSignal from "./ChartSignal";

import { Grid, Typography } from "@mui/material";
import completionAvgTimeSpec from "../assets/data/completion-avg-time.vl.json";
import completionByMethodSpec from "../assets/data/completion-by-method.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiCard from "./KpiCard";

type Props = {
  selYear: number | null;
};

const Completion = ({ selYear }: Props): JSX.Element => {
  return (
    <article>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ my: 3 }}
      >
        <Grid item xs={12} md={6}>
          <KpiCard label="Perfezionamento per modalità di invio" borderLeft="">
            <Typography variant="caption" color="textSecondary">
              Percentuale di notifiche{" "}
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ textDecoration: "underline" }}
              >
                perfezionate
              </Typography>
              &nbsp;per via digitale e per via analogica
            </Typography>
            <ChartSignal
              spec={toVegaLiteSpec(completionByMethodSpec)}
              yearSignal={selYear}
            />
          </KpiCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <KpiCard
            label="Tempo medio di perfezionamento per modalità di invio"
            subLabel="Giorni entro cui si perfezionano in media le notifiche inviate per via digitale e per via analogica"
            borderLeft=""
          >
            <ChartSignal
              spec={toVegaLiteSpec(completionAvgTimeSpec)}
              yearSignal={selYear}
            />
          </KpiCard>
        </Grid>
      </Grid>
    </article>
  );
};

export default Completion;
