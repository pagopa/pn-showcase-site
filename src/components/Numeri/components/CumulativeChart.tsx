"use client";
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
const CumulativeChart = ({
  spec,
  cumulativeSignal,
  filterSignal,
  yearSignal,
}: Props) => {
  const [chart, setChart] = useState<Result | null>(null);
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, spec, chartConfig).then(setChart);
  }, [spec]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("is_cumulative", cumulativeSignal).runAsync();
  }, [chart, cumulativeSignal]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("notification_type", filterSignal).runAsync();
  }, [chart, filterSignal]);

  useEffect(() => {
    if (chart === null) return;
    chart.view.signal("year", yearSignal).runAsync();
  }, [chart, yearSignal]);

  return (
    <div className="w-100 h-100" ref={chartContent} id="chart-content"></div>
  );
};
export default CumulativeChart;
