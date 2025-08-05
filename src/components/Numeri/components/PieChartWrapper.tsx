import { TopLevelSpec } from "vega-lite";
import PieChart from "./PieChart";
import { useTranslation } from "src/hook/useTranslation";

type Props = {
  spec: TopLevelSpec;
  yearSignal: number | null;
};

export default function PieChartWrapper({ spec, yearSignal }: Props) {
  const { t } = useTranslation(["numeri"]);

  function translateTooltip(spec: TopLevelSpec) {
    if (
      "encoding" in spec &&
      spec.encoding &&
      "tooltip" in spec.encoding &&
      spec.encoding.tooltip &&
      Array.isArray(spec.encoding.tooltip)
    ) {
      const tooltip = [];
      tooltip[0] = {
        ...spec.encoding.tooltip[0],
        title: t("sent_notifications.pieChart.tooltip.type"),
      };
      tooltip[1] = {
        ...spec.encoding.tooltip[1],

        title: t("sent_notifications.pieChart.tooltip.number"),
      };
      return {
        ...spec,
        encoding: {
          ...spec.encoding,
          tooltip,
        },
      } as TopLevelSpec;
    }
    return spec;
  }
  return <PieChart spec={translateTooltip(spec)} yearSignal={yearSignal} />;
}
