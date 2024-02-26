import { expressionFunction, formatLocale, timeFormatLocale } from "vega";
import { EmbedOptions } from "vega-embed";

// BUG: https://github.com/vega/vega-embed/issues/473
// vega.expressionInterpreter = expressionInterpreter;

// import itLocale from "d3-format/locale/it-IT";
// import itTimeLocale from "d3-time-format/locale/it-IT";

import italiaTheme from "../assets/data/italia-theme.json";

import { cacheLoader } from "./vega-cache-loader";

// // Set default locale
// formatLocale({ ...itLocale, nan: "–" });
// timeFormatLocale(itTimeLocale);

// Add custom expressions
// REF: https://github.com/vega/vega/issues/3207
expressionFunction("entries", Object.entries);

const chartConfig: EmbedOptions = {
  actions: false,
  config: {
    ...italiaTheme,
    title: {
      ...italiaTheme.title,
      fontWeight: 600,
      anchor: "start",
    },
    header: {
      ...italiaTheme.header,
      title: null,
      labelOrient: "top",
      labelAnchor: "start",
      labelPadding: 5,
    },
    axis: {
      ...italiaTheme.axis,
      title: null,
      tickCount: 4,
    },
    legend: {
      ...italiaTheme.legend,
      title: null,
      orient: "top",
      labelLimit: 0,
      layout: {
        right: { anchor: "middle" },
        top: { anchor: "middle" },
      } as any,
      // https://stackoverflow.com/questions/62420339/how-to-bottom-middle-align-a-legend-in-vega-lite
    },
  },
  loader: cacheLoader,
  renderer: "svg",
  ast: true,
};

export default chartConfig;
