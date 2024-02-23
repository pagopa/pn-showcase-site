import { useState } from "react";
import CardWrapper from "./CardWrapper";
import CumulativeChart from "./CumulativeChart";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import downloadSpec from "../assets/data/download.vl.json";

type Props = {
  selYear: number | null;
};

type LabelsCumulativeDaily = "cumulato" | "giornaliero";
type LabelsTotalDigitalAnalog = "total" | "digital" | "analog";
type LabelsTotalDigitalAnalogItalian =
  | "complessive"
  | "digitali"
  | "analogiche";

type OptionsCumulativeDaily = {
  id: number;
  label: LabelsCumulativeDaily;
};
type OptionsTotalDigitalAnalog = {
  id: number;
  label: LabelsTotalDigitalAnalog;
};

const optionsCumulativeDaily: OptionsCumulativeDaily[] = [
  { id: 1, label: "cumulato" },
  { id: 2, label: "giornaliero" },
];

const optionsTotalDigitalAnalog: OptionsTotalDigitalAnalog[] = [
  { id: 1, label: "total" },
  { id: 2, label: "digital" },
  { id: 3, label: "analog" },
];
type OptionsTotalDigitalAnalogToItalian = (
  label: LabelsTotalDigitalAnalog
) => LabelsTotalDigitalAnalogItalian;
const optionsTotalDigitalAnalogToItalian: OptionsTotalDigitalAnalogToItalian = (
  label
) => {
  switch (label) {
    case "total":
      return "complessive";
    case "digital":
      return "digitali";
    case "analog":
      return "analogiche";
    default:
      return "complessive";
  }
};

const NotificationsTrend = ({ selYear }: Props): JSX.Element => {
  const [curOptionCumulativeDaily, setCurOptionCumulativeDaily] = useState(
    optionsCumulativeDaily[0].id
  );
  const [curOptionTotalDigitalAnalog, setCurOptionTotalDigitalAnalog] =
    useState(optionsTotalDigitalAnalog[0].label);

  const handleOptionCumulativeDaily = (id: number) => {
    setCurOptionCumulativeDaily(id);
  };

  const handleOptionsTotalDigitalAnalog = (id: number) => {
    const result = optionsTotalDigitalAnalog.find((f) => f.id === id);
    setCurOptionTotalDigitalAnalog(result ? result.label : "total");
  };
  return (
    <CardWrapper>
      <h4>Andamento delle notifiche</h4>
      <p>
        Andamento
        <select
          className="form-select fw-semibold d-inline mx-2 border border-dark "
          style={{
            width: "auto",
          }}
          onChange={(e) => handleOptionCumulativeDaily(+e.target.value)}
        >
          {optionsCumulativeDaily.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        delle notifiche
        <select
          className="form-select fw-semibold d-inline mx-2 border border-dark "
          style={{
            width: "auto",
          }}
          onChange={(e) => handleOptionsTotalDigitalAnalog(+e.target.value)}
        >
          {optionsTotalDigitalAnalog.map((option) => (
            <option key={option.id} value={option.id}>
              {optionsTotalDigitalAnalogToItalian(option.label)}
            </option>
          ))}
        </select>
      </p>
      <div style={{ height: "22rem" }}>
        <CumulativeChart
          spec={toVegaLiteSpec(downloadSpec)}
          cumulativeSignal={curOptionCumulativeDaily === 1 ? true : false}
          filterSignal={curOptionTotalDigitalAnalog}
          yearSignal={selYear}
        />
      </div>
    </CardWrapper>
  );
};
export default NotificationsTrend;
