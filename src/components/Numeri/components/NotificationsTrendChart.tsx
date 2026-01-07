import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import embed, { Result } from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
  cumulativeSignal: boolean;
  filterSignal: string;
  yearSignal: number | null;
};
const NotificationsTrendChart = ({
  spec,
  cumulativeSignal,
  filterSignal,
  yearSignal,
}: Props) => {
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
      .signal("is_cumulative", cumulativeSignal)
      .runAsync()
      .catch(console.error);
  }, [chart, cumulativeSignal]);

  useEffect(() => {
    if (chart === null) {
      return;
    }
    chart.view
      .signal("notification_type", filterSignal)
      .runAsync()
      .catch(console.error);
  }, [chart, filterSignal]);

  useEffect(() => {
    if (chart === null) {
      return;
    }
    chart.view.signal("year", yearSignal).runAsync().catch(console.error);
  }, [chart, yearSignal]);

  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
      ref={chartContent}
      id="chart-content"
    ></Box>
  );
};
export default NotificationsTrendChart;
