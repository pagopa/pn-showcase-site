import { useEffect, useState } from "react";
import {
  SceneText,
  Scene as VegaScene,
  SceneGroup as VegaSceneGroup,
} from "vega";
import { TopLevelSpec } from "vega-lite";
import { getMarks } from "../shared/chart-utils";

type Props = {
  spec: TopLevelSpec;
  className?: string;
};

const isSceneText = (
  item: VegaScene | VegaSceneGroup | SceneText
): item is SceneText => "text" in item;

const KpiWrapper = ({ spec, ...restProps }: Props): JSX.Element => {
  const [text, setText] = useState("#");

  useEffect(() => {
    getMarks(spec).then((marks) => {
      if (!marks[0]) return;
      if (isSceneText(marks[0])) {
        setText(marks[0].text);
      }
    });
  });

  return (
    <p color="#fff" {...restProps}>
      {text}
    </p>
  );
};

export default KpiWrapper;
