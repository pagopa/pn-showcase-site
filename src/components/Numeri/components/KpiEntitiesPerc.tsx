import { useEffect, useState } from "react";
import {
  SceneText,
  Scene as VegaScene,
  SceneGroup as VegaSceneGroup,
} from "vega";
import { TopLevelSpec } from "vega-lite";
import { Box, Stack, Typography } from "@mui/material";
import { getMarks } from "../shared/chart-utils";
import { dashboardColors } from "../shared/colors";

type Props = {
  spec: TopLevelSpec;
  children: React.ReactNode;
};

const isSceneText = (
  item: VegaScene | VegaSceneGroup | SceneText
): item is SceneText => "text" in item;

const KpiEntitiesPerc = ({ spec, children }: Props) => {
  const [text, setText] = useState("#");
  const parsedText = Number(text.replace(/%|#/g, ""));
  const isPositive = parsedText >= 0;
  function getParsedTextColor(num: number) {
    if (num > 0) {
      return {
        color: dashboardColors.get("success-850")!,
        bg: dashboardColors.get("success-100")!,
      };
    } else if (num < 0) {
      return {
        color: dashboardColors.get("error-850")!,
        bg: dashboardColors.get("error-100")!,
      };
    } else {
      return {
        color: dashboardColors.get("yellow-850")!,
        bg: dashboardColors.get("yellow-100")!,
      };
    }
  }

  useEffect(() => {
    getMarks(spec)
      .then((marks) => {
        if (!marks[0]) {
          return;
        }
        if (isSceneText(marks[0])) {
          setText(marks[0].text);
        }
      })
      .catch(console.error);
  });

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <Typography
        sx={{
          color: getParsedTextColor(parsedText).color,
          backgroundColor: getParsedTextColor(parsedText).bg,
          fontSize: "0.875rem",
          fontWeight: 600,
          lineHeight: 1.28574,
          padding: "0.25rem 0.5rem",
        }}
      >
        {isPositive ? "+" : ""}
        {text}
      </Typography>
      <Box
        sx={{
          color: dashboardColors.get("grey-650"),
          fontSize: "0.875rem",
          fontWeight: 400,
          lineHeight: 1.28574,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default KpiEntitiesPerc;
