import { TopLevelSpec } from "vega-lite";

type ToVegaLiteSpec = (data: unknown) => TopLevelSpec;

export const toVegaLiteSpec: ToVegaLiteSpec = (data) =>
  JSON.parse(JSON.stringify(data));
