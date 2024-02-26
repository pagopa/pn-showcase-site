"use client";
import { useEffect, useRef } from "react";
import embed from "vega-embed";
import { TopLevelSpec } from "vega-lite";
import chartConfig from "../shared/chart-config";
import Box from "@mui/material/Box";

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
    <Box sx={{ height: '100%', width: '100%' }} ref={chartContent} id="chart-content"></Box>
  );
};

export default ChartServices;
