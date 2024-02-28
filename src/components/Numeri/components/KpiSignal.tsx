import { useEffect, useState } from "react";
import {
  SceneText,
  Scene as VegaScene,
  SceneGroup as VegaSceneGroup,
  Spec as VegaSpec,
  View,
  parse,
} from "vega";
import { expressionInterpreter } from "vega-interpreter";

import { Typography } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import { VegaSceneRoot, searchTree, toVegaSpec } from "../shared/chart-utils";
import { cacheLoader } from "../shared/vega-cache-loader";

type Props = {
  spec: TopLevelSpec | VegaSpec;
  yearSignal: number | null;
  className?: string;
};
const isSceneText = (
  item: VegaScene | VegaSceneGroup | SceneText
): item is SceneText => "text" in item;

const KpiSignal = ({ spec, yearSignal, ...restProps }: Props): JSX.Element => {
  const [text, setText] = useState("#");
  const [view, setView] = useState<View | null>(null);
  const [scenegraph, setScenegraph] = useState<VegaSceneRoot | null>(null);

  useEffect(() => {
    const getText = (): string => {
      if (scenegraph === null) return "";
      const scene = searchTree(scenegraph.root, "role", "mark");
      if (scene === null) return "";
      const marks = scene.items;
      return isSceneText(marks[0]) ? marks[0].text : "";
    };

    setText(getText());
  }, [scenegraph]);

  useEffect(() => {
    const vgSpec = toVegaSpec(spec);
    new View(parse(vgSpec, undefined, { ast: true }), {
      expr: expressionInterpreter,
      renderer: "none",
      loader: cacheLoader,
    })
      .runAsync()
      .then((viewRes) => setView(viewRes));
  }, [spec]);

  useEffect(() => {
    if (view === null) return;
    view
      .signal("year", yearSignal)
      .runAsync()
      .then((viewP) =>
        setScenegraph({ ...viewP.scenegraph() } as unknown as VegaSceneRoot)
      ); // Force text
  }, [view, yearSignal]);

  return (
    <Typography variant="h4" sx={{ mt: 3 }} {...restProps}>
      {text}
    </Typography>
  );
};

export default KpiSignal;
