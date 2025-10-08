import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import embed from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";
import { removeGraphicsSymbolRole } from "../shared/removeGraphicsSymbolRole";

type Props = {
  spec: TopLevelSpec;
};

const MapChart = ({ spec }: Props) => {
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    const options = {
      ...chartConfig,
    };
    embed(chartContent.current, spec, options)
      .then((chart) => {
        chart.view
          .resize()
          .runAsync()
          .then(() => {
            setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, [spec]);

  return (
    <Box
      sx={{
        height: { xs: "25rem", sm: "37rem" },
        width: "100%",
        pt: { xs: "1rem", sm: "2rem" },
      }}
      ref={chartContent}
    ></Box>
  );
};
export default MapChart;
