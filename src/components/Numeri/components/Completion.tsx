"use client";

import DataCard from "./DataCard";
import ChartSignal from "./ChartSignal";

import completionAvgTimeSpec from "../assets/data/completion-avg-time.vl.json";
import completionByMethodSpec from "../assets/data/completion-by-method.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import { Grid, Typography } from "@mui/material";

type Props = {
  selYear: number | null;
};

const Completion = ({ selYear }: Props): JSX.Element => {
  return (
    <article>
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ my: 3 }}>
        <Grid item xs={12} md={6}>
          <DataCard label="Perfezionamento per modalità di invio">

            <Typography variant="body2" color="textSecondary">
              Dati in percentuale
            </Typography>
            <ChartSignal spec={toVegaLiteSpec(completionByMethodSpec)} yearSignal={selYear} />
          </DataCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DataCard label="Tempo medio di perfezionamento per modalità di invio">

            <Typography variant="body2" color="textSecondary">
              Dati in giorni
            </Typography>
            <ChartSignal spec={toVegaLiteSpec(completionAvgTimeSpec)} yearSignal={selYear} />
          </DataCard>
        </Grid>
      </Grid>
    </article>
  );
};

export default Completion;
