import { Typography } from "@mui/material";
import lastUpdateSpec from "../assets/data/last-update.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import KpiWrapper from "./KpiWrapper";


const DashboardIntro = () => {


  return (
    <aside>
      <Typography variant="body2" align="right" >
        Ultimo aggiornamento:
        <KpiWrapper spec={toVegaLiteSpec(lastUpdateSpec)} />
      </Typography>
    </aside >
  );
};

export default DashboardIntro;
