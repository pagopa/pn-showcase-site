import { useState } from "react";
import CumulativeChart from "./CumulativeChart";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import downloadSpec from "../assets/data/download.vl.json";
import { Card, CardContent, CardHeader, MenuItem, Select, Stack, Typography } from "@mui/material";

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
    <Card>
      <CardHeader title="Andamento delle notifiche" subheader={
        <Stack direction="row"><Typography>Andamento</Typography>

          <Select
            className="form-select fw-semibold d-inline mx-2 border border-dark "
            style={{
              width: "auto",
            }}
            onChange={(e:any) => handleOptionCumulativeDaily(+e.target.value)}
          >
            {optionsCumulativeDaily.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Typography> delle notifiche</Typography>
          <Select
            className="form-select fw-semibold d-inline mx-2 border border-dark "
            style={{
              width: "auto",
            }}
            onChange={(e:any) => handleOptionsTotalDigitalAnalog(+e.target.value)}
          >
            {optionsTotalDigitalAnalog.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {optionsTotalDigitalAnalogToItalian(option.label)}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      }>

      </CardHeader>
      <CardContent style={{ height: "22rem" }}>
        <CumulativeChart
          spec={toVegaLiteSpec(downloadSpec)}
          cumulativeSignal={curOptionCumulativeDaily === 1 ? true : false}
          filterSignal={curOptionTotalDigitalAnalog}
          yearSignal={selYear}
        />
      </CardContent>
    </Card>
  );
};
export default NotificationsTrend;
