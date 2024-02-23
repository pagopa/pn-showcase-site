import { Typography } from "@mui/material";
import lastUpdateSpec from "../assets/data/last-update.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiWrapper from "./KpiWrapper";


const DashboardIntro = () => {


  return (
      <Typography variant="body2" align="right">
        Ultimo aggiornamento:
        <KpiWrapper spec={toVegaLiteSpec(lastUpdateSpec)} />
      </Typography>
  );
};

export default DashboardIntro;
