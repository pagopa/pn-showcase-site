"use client";
import { useEffect, useRef } from "react";
import embed from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";

type Props = {
  spec: TopLevelSpec;
};

const ChartServices = ({ spec }: Props): JSX.Element => {
  const chartContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContent.current) return;
    embed(chartContent.current, spec, chartConfig);
  }, [spec]);

  return (
    <div className="w-100 h-100" ref={chartContent} id="chart-content"></div>
  );
};

export default ChartServices;
