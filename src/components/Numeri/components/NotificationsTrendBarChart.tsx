import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";
import { removeGraphicsSymbolRole } from "../shared/removeGraphicsSymbolRole";

type Props = {
  filterSignal: string;
  yearSignal: number | null;
  spec: TopLevelSpec;
};

const NotificationsTrendBarChart = ({
  filterSignal,
  yearSignal,
  spec,
}: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) {
      return;
    }
    embed(chartContent.current, spec as TopLevelSpec, chartConfig)
      .then((result) => {
        setChart(result);
        setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
      })
      .catch(console.error);
  }, [spec]);

  useEffect(() => {
    if (chart === null || !chartContent.current) {
      return;
    }
    chart.view
      .signal("notification_type", filterSignal)
      .runAsync()
      .then(() => {
        setTimeout(() => removeGraphicsSymbolRole(chartContent), 100);
      })
      .catch(console.error);
  }, [chart, filterSignal]);

  useEffect(() => {
    if (chart === null || !chartContent.current) {
      return;
    }
    chart.view
      .signal("year", yearSignal)
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
      id="chart-content"
    ></Box>
  );
};

export default NotificationsTrendBarChart;
