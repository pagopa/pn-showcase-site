import { Box, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import downloadSpec from "../assets/data/download.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import CumulativeChart from "./CumulativeChart";

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
    useState(optionsTotalDigitalAnalog[0].id);

  const handleOptionCumulativeDaily = (id: number) => {
    setCurOptionCumulativeDaily(id);
  };

  const handleOptionsTotalDigitalAnalog = (id: number) => {
    setCurOptionTotalDigitalAnalog(id);
  };
  const getLabel = (id: number) => {
    const result = optionsTotalDigitalAnalog.find((f) => f.id === id);
    return result ? result.label : "total";
  };
  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="body2"
        component="h3"
        sx={{ fontWeight: "600", mb: 1 }}
      >
        Andamento delle notifiche
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" color="textSecondary">
          Andamento
        </Typography>

        <Select
          value={curOptionCumulativeDaily}
          size="small"
          sx={{ fontSize: 14 }}
          onChange={(e: any) => handleOptionCumulativeDaily(+e.target.value)}
        >
          {optionsCumulativeDaily.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="textSecondary">
          {" "}
          delle notifiche
        </Typography>
        <Select
          size={"small"}
          sx={{ fontSize: 14 }}
          value={curOptionTotalDigitalAnalog}
          onChange={(e: any) =>
            handleOptionsTotalDigitalAnalog(+e.target.value)
          }
        >
          {optionsTotalDigitalAnalog.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {optionsTotalDigitalAnalogToItalian(option.label)}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Box style={{ height: "22rem" }}>
        <CumulativeChart
          spec={toVegaLiteSpec(downloadSpec)}
          cumulativeSignal={curOptionCumulativeDaily === 1 ? true : false}
          filterSignal={getLabel(curOptionTotalDigitalAnalog)}
          yearSignal={selYear}
        />
      </Box>
    </Paper>
    // <Card
    //   elevation={8}
    //   sx={{
    //     p: 3,
    //     borderRadius: 2,
    //   }}
    // >
    //   <CardHeader
    //     title="Andamento delle notifiche"

    //     subheader={
    //       <Stack direction="row" spacing={2} alignItems="center">
    //         <Typography>Andamento</Typography>

    //         <Select
    //           value={curOptionCumulativeDaily}
    //           size="small"
    //           onChange={(e: any) =>
    //             handleOptionCumulativeDaily(+e.target.value)
    //           }
    //         >
    //           {optionsCumulativeDaily.map((option) => (
    //             <MenuItem key={option.id} value={option.id}>
    //               {option.label}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //         <Typography> delle notifiche</Typography>
    //         <Select
    //           size={"small"}
    //           value={curOptionTotalDigitalAnalog}
    //           onChange={(e: any) =>
    //             handleOptionsTotalDigitalAnalog(+e.target.value)
    //           }
    //         >
    //           {optionsTotalDigitalAnalog.map((option) => (
    //             <MenuItem key={option.id} value={option.id}>
    //               {optionsTotalDigitalAnalogToItalian(option.label)}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </Stack>
    //     }
    //   ></CardHeader>
    //   <CardContent style={{ height: "22rem" }}>
    //     <CumulativeChart
    //       spec={toVegaLiteSpec(downloadSpec)}
    //       cumulativeSignal={curOptionCumulativeDaily === 1 ? true : false}
    //       filterSignal={getLabel(curOptionTotalDigitalAnalog)}
    //       yearSignal={selYear}
    //     />
    //   </CardContent>
    // </Card>
  );
};
export default NotificationsTrend;
