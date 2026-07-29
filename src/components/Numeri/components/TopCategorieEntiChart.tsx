import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";
import { removeGraphicsSymbolRole } from "../shared/removeGraphicsSymbolRole";

type Props = {
  spec: TopLevelSpec;
  yearSignal?: number | null;
};

const TopCategorieEntiChart = ({ spec, yearSignal }: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    embed(chartContent.current, spec, chartConfig)
      .then((result) => {
        setChart(result);
        setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
      })
      .catch(console.error);
  }, [spec]);

  useEffect(() => {
    if (chart === null || yearSignal === undefined) {
      return;
    }
    chart.view
      .signal("year", yearSignal)
      .resize()
      .runAsync()
      .then(() => {
        setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
      })
      .catch(console.error);
  }, [chart, yearSignal]);

  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
      ref={chartContent}
      id="chart-content-categorie-enti"
    ></Box>
  );
};

export default TopCategorieEntiChart;
