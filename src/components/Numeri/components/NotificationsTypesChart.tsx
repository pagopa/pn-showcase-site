import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
  categorySignal: string | null;
};

const NotificationsTypesChart = ({ spec, categorySignal }: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    embed(chartContent.current, spec, chartConfig)
      .then(setChart)
      .catch(console.error);
  }, [spec]);

  useEffect(() => {
    if (chart === null) {
      return;
    }
    chart.view
      .signal("category", categorySignal)
      .runAsync()
      .catch(console.error);
  }, [chart, categorySignal]);

  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
      ref={chartContent}
      id="chart-content"
    ></Box>
  );
};

export default NotificationsTypesChart;
